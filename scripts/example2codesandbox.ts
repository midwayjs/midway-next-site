import globby from 'globby'
import fse from 'fs-extra'
import { resolve, relative } from 'path'
import { Dictionary } from 'lodash'

const paths = {
  exampleDir: resolve(__dirname, '..', 'example'),
  codesandboxDir: resolve(__dirname, '..', 'src/components/Preview'),
}

type CodeSandboxProject = {
  files: Dictionary<{ content: string }>
}

async function example2CodeSandbox() {
  const projects: Dictionary<CodeSandboxProject> = {}

  for (let example of fse.readdirSync(paths.exampleDir)) {
    example = resolve(paths.exampleDir, example)

    const project: CodeSandboxProject = {
      files: {},
    }

    const files = globby.sync(example, { gitignore: true, ignore: ['**/node_modules/**'] })
    for (const file of files) {
      const content = await fse.readFile(file, 'utf-8')
      const filepath = relative(example, file)
      project.files[filepath] = { content }
    }

    projects[relative(paths.exampleDir, example)] = project
  }

  for (const [name, project] of Object.entries(projects)) {
    const code = JSON.stringify(project, null, 2)
    const json = resolve(paths.codesandboxDir, `${name}.json`)

    await fse.remove(json)
    await fse.ensureFile(json)
    await fse.writeFile(json, code)
  }
}

example2CodeSandbox()
