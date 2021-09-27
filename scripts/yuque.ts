import SDK from '@yuque/sdk'
import { ensureDir, ensureFile, remove, writeFile, writeFileSync } from 'fs-extra'
import { groupBy, Dictionary } from 'lodash'
import { resolve } from 'path'
import axios from 'axios'
import { PropSidebarItem } from '@docusaurus/plugin-content-docs-types'
import { TOCItem, YuqueSDK } from './typings'
import pLimit from 'p-limit'
import assert from 'assert'

class Yuque {
  private sdk: YuqueSDK
  private repo: string
  private docDir: string
  private configDir: string

  constructor(token: string, repo: string, docDir: string, configDir: string) {
    assert.ok(typeof token === 'string')
    assert.ok(typeof repo === 'string')

    this.sdk = new SDK({ token })
    this.repo = repo
    this.docDir = docDir
    this.configDir = configDir
  }

  get configPaths() {
    return {
      navbar: resolve(this.configDir, 'navbar.js'),
      sidebar: resolve(this.configDir, 'sidebar.js'),
    }
  }

  async sync() {
    const tocList = await this.sdk.repos.getTOC({ namespace: this.repo })

    await this.generateConfig(tocList)
    await this.download(tocList)
  }

  private async download(tocList: TOCItem[]) {
    await remove(this.docDir)
    await ensureDir(this.docDir)

    const limit = pLimit(3)

    const list = tocList.filter((toc) => !(toc.type === 'TITLE' || toc.type === 'LINK' || toc.slug === '#'))

    const tasks = list.map((toc, index) =>
      limit(async () => {
        await this.downloadMarkdown(this.repo, toc)
        console.log(`[${index + 1}/${list.length}]`, toc.title)
      })
    )

    await Promise.all(tasks)
  }

  private async downloadMarkdown(repo: string, toc: TOCItem) {
    const file = `https://www.yuque.com/${repo}/${toc.url}/markdown?plain=true&linebreak=false&anchor=false`
    try {
      const { data } = await axios.get(file, {
        timeout: 5000,
      })
      const content = `
---
title: ${this.formatTitle(toc.title)}
---

  ${data}
  `.trim()

      await writeFile(resolve(this.docDir, `${toc.url}.md`), content, { encoding: 'utf-8' })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  private async generateConfig(tocList: TOCItem[]) {
    const listGroup = groupBy(tocList, 'parent_uuid')
    const topLevel = listGroup['']

    const sidebar = {}
    for (const toc of topLevel) {
      if (toc.type === 'TITLE') {
        sidebar[toc.title] = [
          {
            type: 'category',
            label: toc.title,
            items: this.getChildrenFromListGroup(listGroup, toc.uuid),
          },
        ]
      }
    }

    const navbar = Object.values(sidebar).map((side: any) => ({
      type: 'doc',
      docId: this.getFirstChildren(side[0]),
      position: 'right',
      label: side[0].label,
    }))
    await this.writeConfig(this.configPaths.navbar, navbar)

    Object.keys(sidebar).forEach((key) => {
      sidebar[key] = sidebar[key][0].items
    })
    await this.writeConfig(this.configPaths.sidebar, sidebar)
  }

  private getFirstChildren(sidebarItem: Partial<PropSidebarItem>) {
    let current = sidebarItem

    while (current && current?.type === 'category') {
      current = current.items[0]
    }

    return current
  }

  private getChildrenFromListGroup(group: Dictionary<TOCItem[]>, parentUUID: string) {
    const children = group[parentUUID] || []
    const list = []

    for (const child of children) {
      switch (child.type) {
        case 'TITLE':
          list.push({
            type: 'category',
            label: child.title,
            collapsed: false,
            collapsible: false,
            items: this.getChildrenFromListGroup(group, child.uuid),
          })
          break
        case 'LINK':
          list.push({
            type: 'link',
            label: child.title,
            href: child.url,
          })
          break
        default:
          list.push(child.url)
          break
      }
    }

    return list
  }

  private async writeConfig(target: string, content: any) {
    await ensureFile(target)
    writeFileSync(target, `module.exports = ${JSON.stringify(content, null, 2)}`, 'utf-8')
  }

  private formatTitle(title: string) {
    return title.startsWith('@') ? title.slice(1) : title
  }
}

const yuque = new Yuque(
  process.env.TOKEN,
  process.env.REPO,
  process.env.DOCS_DIR || resolve(__dirname, '..', 'docs'),
  process.env.CONFIG_DIR || resolve(__dirname, '..', 'config')
)

yuque
  .sync()
  .then(() => {
    console.log('Sync completed')
  })
  .catch((err) => {
    console.log('Error', err)
  })
