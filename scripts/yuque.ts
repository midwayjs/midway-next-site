import SDK from '@yuque/sdk';
import { ensureDir, ensureFile, remove, writeFile, writeFileSync } from 'fs-extra';
import { groupBy } from 'lodash';
import { resolve } from 'path';
import axios from 'axios';
import { NavbarItem } from '@docusaurus/theme-common';
import { TOCItem, YuqueSDK } from './typings';
import pLimit from 'p-limit';
import pRetry from 'p-retry';
import assert from 'assert';

type InitOption = { token: string; repo: string; docDir: string; configDir: string; endpoint: string };

class Yuque {
  private sdk: YuqueSDK;
  private readonly repo: string;
  private readonly docDir: string;
  private readonly configDir: string;

  constructor({ token, repo, docDir, configDir, endpoint }: InitOption) {
    assert.ok(typeof token === 'string');
    assert.ok(typeof repo === 'string');

    const options: any = { token };
    if (endpoint) {
      options.endpoint = endpoint;
    }

    this.sdk = new SDK(options);
    this.repo = repo;
    this.docDir = docDir;
    this.configDir = configDir;
  }

  get configPaths() {
    return {
      navbar: resolve(this.configDir, 'navbar.js'),
      sidebar: resolve(this.configDir, 'sidebar.js'),
    };
  }

  async sync() {
    const tocList = await pRetry(() => this.sdk.repos.getTOC({ namespace: this.repo }), { retries: 3 });

    await this.generateConfig(tocList);

    if (!process.env.SKIP_DOWNLOAD) {
      await this.download(tocList);
    }
  }

  private async download(tocList: TOCItem[]) {
    await ensureDir(this.docDir);

    const limit = pLimit(2);
    const list = tocList.filter((toc) => !(toc.type === 'TITLE' || toc.type === 'LINK' || toc.slug === '#'));

    const tasks = list.map((toc, index) =>
      limit(async () => {
        await this.downloadMarkdown(this.repo, toc);
        console.log(`[${index + 1}/${list.length}]`, toc.title, toc.url);
      })
    );

    await Promise.all(tasks);
  }

  private async downloadMarkdown(repo: string, toc: TOCItem) {
    const file = `https://www.yuque.com/${repo}/${toc.url}/markdown?plain=true&linebreak=false&anchor=false`;
    try {
      let { data } = await pRetry(
        () =>
          axios.get<string>(file, {
            timeout: 5000,
          }),
        { retries: 3 }
      );

      data = data
        .replace(/:::warning/g, ':::caution')
        .replace(new RegExp('https://www.yuque.com/midwayjs/midway_v2/', 'g'), '/docs/');

      const content = `
---
title: ${this.formatTitle(toc.title)}
---

  ${data}
  `.trim();

      const md = resolve(this.docDir, `${toc.url}.md`);
      await remove(md);
      await writeFile(md, content, { encoding: 'utf-8' });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async generateConfig(tocList: TOCItem[]) {
    const listGroup = groupBy(tocList, 'parent_uuid');
    const topLevel = listGroup[''];

    const sidebar = {};
    for (const toc of topLevel) {
      if (toc.type === 'TITLE') {
        sidebar[toc.title] = [
          {
            type: 'category',
            label: toc.title,
            items: this.getChildrenFromListGroup(listGroup, toc.uuid),
          },
        ];
      }
    }

    await this.generateNavbar(sidebar);

    Object.keys(sidebar).forEach((key) => {
      sidebar[key] = sidebar[key][0].items;
    });
    await this.writeConfig(this.configPaths.sidebar, sidebar);
  }

  private async generateNavbar(sidebar: any) {
    const dropdownList = ['Web', '函数式 & 一体化', '功能', '微服务'];
    const navbar: NavbarItem[] = [];

    for (const key of Object.keys(sidebar)) {
      const sidebarItem = sidebar[key][0];

      if (dropdownList.includes(sidebarItem.label)) {
        const items = sidebarItem.items.map((item) => {
          if (item.type === 'category') {
            const firstChild = this.getFirstChildren(item);

            switch (firstChild.type) {
              case 'doc':
                return {
                  type: 'doc',
                  docId: firstChild.id,
                  label: item.label,
                } as NavbarItem;
              case 'link':
                return {
                  label: item.label,
                  href: firstChild.href,
                } as NavbarItem;
            }
          } else {
            return {
              type: 'doc',
              docId: item.id,
              label: item.label,
            } as NavbarItem;
          }
        });
        navbar.push({
          type: 'dropdown',
          label: sidebarItem.label,
          position: 'right',
          items,
        });
      } else {
        navbar.push({
          type: 'doc',
          docId: this.getFirstChildren(sidebarItem).id,
          label: sidebarItem.label,
          position: 'right',
        } as any);
      }
    }
    await this.writeConfig(this.configPaths.navbar, navbar);
  }

  private getFirstChildren(sidebarItem: any) {
    let current = sidebarItem;

    while (current && current?.type === 'category') {
      current = current.items[0];
    }

    return current;
  }

  private getChildrenFromListGroup(group: Record<string, TOCItem[]>, parentUUID: string) {
    const children = group[parentUUID] || [];
    const list = [];

    for (const child of children) {
      switch (child.type) {
        case 'TITLE':
          list.push({
            type: 'category',
            label: child.title,
            collapsed: false,
            collapsible: false,
            items: this.getChildrenFromListGroup(group, child.uuid),
          });
          break;
        case 'LINK':
          list.push({
            type: 'link',
            label: child.title,
            href: child.url,
          });
          break;
        default:
          list.push({
            type: 'doc',
            id: child.url,
            label: child.title,
          });
          break;
      }
    }

    return list;
  }

  private async writeConfig(target: string, content: any) {
    await ensureFile(target);
    writeFileSync(target, `module.exports = ${JSON.stringify(content, null, 2)}`, 'utf-8');
  }

  private formatTitle(title: string) {
    return title.startsWith('@') ? title.slice(1) : title;
  }
}

const yuque = new Yuque({
  token: process.env.TOKEN,
  repo: process.env.REPO,
  docDir: process.env.DOCS_DIR || resolve(__dirname, '..', 'docs'),
  configDir: process.env.CONFIG_DIR || resolve(__dirname, '..', 'config'),
  endpoint: process.env.YUQUE_ENDPOINT,
});

yuque
  .sync()
  .then(() => {
    console.log('Sync completed');
  })
  .catch((err) => {
    console.log('Error', err);
  });
