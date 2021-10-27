---
title: midwayjs/cli
---

`@midwayjs/cli`  是新版本的 Midway 体系工具链，和 Serverless，以及原应用的工具链进行了整合。

## 基础入口

`@midwayjs/cli` 提供了两个入口命令。 `midway-bin`  和 `mw`  命令。

当 `@midwayjs/cli` 安装到全局时，一般使用 `mw`  命令，比如 `mw new xxx` 。当期安装到项目做 cli 工具时，我们一般使用 `midway-bin`  命令，但是请记住，这两个命令是相同的。

## 命令

### new 新建项目

新建项目

```bash
$ mw new [name]
	--template    	指定远端的符合 light-generator 标准的脚手架包
  --target        新建的项目目标位置
  --type          新的项目类型，默认为 web，可选的为faas等
  --npm           npm client，默认为自动识别添加registry
```

可用 `--template`  指定远端的符合 [light-generator](https://github.com/midwayjs/light-generator) 标准的脚手架包。
比如：

```bash
$ mw new hello_midway --template=@midwayjs-examples/applicaiton-koa
```

### dev 本地开发

以当前目录启动本地开发命令。

```bash
$ mw dev --ts
  --baseDir          应用目录，一般为 package.json 所在文件夹，默认为 process.cwd()
  --sourceDir        ts代码目录，默认会自动分析
  -p, --port         dev侦听的端口，默认为 7001
  --ts							 TS模式运行代码
  --fast             极速模式
  --framework        指定框架，默认会自动分析
  -f, --entryFile    指定使用入口文件来启动 bootstrap.js
  --watchFile        更多的文件或文件夹修改侦听
  --notWatch         代码变化时不自动重启
```

可以针对 HTTP 场景修改启动端口 。

```bash
$ midway-bin dev --ts --port=7002
```

### 本地单步 Debug 调试

建议使用 vscode 的 js debug terminal，在其中执行 dev 命令启动就可以打断点调试了。

<img src="https://cdn.nlark.com/yuque/0/2021/png/128621/1625237917317-8e7bf448-fded-4bc7-b743-6aade0ebcba2.png#clientId=u7c8a3183-c32b-4&from=paste&height=650&id=u75e3aec7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1300&originWidth=2868&originalType=binary&ratio=1&size=1140427&status=done&style=none&taskId=ubcffa6c8-02eb-4256-ba7e-7ab3128c1ee&width=1434" width="1434" />

### test 单元测试

以当前目录启动测试，默认使用 jest 工具，可以使用 --mocha 参数指定使用 mocha。

```bash
$ midway-bin test --ts
  -c, --cov    获取代码测试覆盖率
  -f, --file   指定测试文件，例如 ./test/index.test.ts
  --ts				 TS模式运行单测
  --forceExit  jest forceExit
  --runInBand  jest runInBand
  -w, --watch  watch模式
  --mocha			 使用 mocha 进行单测
```

使用 mocha 进行单测时，需要手动安装 `mocha` 和 `@types/mocha` 两个依赖到 `devDependencies` 中：`npm i mocha @types/mocha -D` 。
​

### cov 单测覆盖率

以当前目录启动测试，并输出覆盖率信息，默认使用 jest 工具，可以使用 --mocha 参数指定使用 mocha。

```bash
$ midway-bin cov --ts
```

使用 mocha 进行单测覆盖率时，除 `mocha` 和 `@types/mocha` 两个依赖外，还需要安装 `nyc` 到 `devDependencies` 中：`npm i nyc -D` 。
​

### check 问题检测

自动分析代码中存在的问题，并给出修复建议。

```bash
$ midway-bin check
```

目前已提供 28 项问题的校验。

### build 本地构建

使用 mwcc（tsc）进行 ts 代码编译，适用于非 Serverless 项目，Serverless 项目请使用 package。

```bash
$ midway-bin build -c
  -c, --clean    清理构建结果目录
  --srcDir       源代码目录，默认 src
  --outDir       构建输出目录，默认为 tsconfig 中的 outDir 或 dist
  --tsConfig     tsConfig json 字符串或文件位置
  --buildCache	 保留构建缓存
```

- `c`  `clean`  清理构建目录

### deploy 函数发布

适用于 Serverless 项目发布到 Aliyun FC、Tencent SCF、Aws Lambda 等运行时。

执行 deploy 命令会自动执行 package。

```bash
$ midway-bin deploy
  -y, --yes     		 发布的确认都是yes
  --resetConfig			 重置发布配置，AK/AK/Region等
  --serverlessDev    使用 Serverless Dev 进行aliyun fc函数发布，目前默认为 funcraft
  ...兼容package命令的所有参数
```

### package 函数打包

适用于 Serverless 项目构建

```bash
$ midway-bin package
  --npm     		 		 npm client，默认为自动识别添加registry
  --sourceDir				 源代码所在目录，默认会自动分析
  --buildDir				 构建结果目标目录
  --sharedTargetDir	 共享文件目标目录，默认为static，参考 --sharedDir 参数
  --sharedDir				 构建时会拷贝此目录到结果目录内的 $sharedTargetDir 目录
  --skipZip					 跳过zip打包
  --skipBuild				 跳过ts代码构建
  --tsConfig    		 tsConfig json 字符串或文件位置
```

## 实验性功能

在 `f.yml` 中通过 `experimentalFeatures` 配置开启实验性功能

### 1. ignoreTsError

在构建时忽略 ts error，不中断构建过程。

```
experimentalFeatures:
    ignoreTsError: true
```

### 2. removeUselessFiles

在构建时移除大量无效文件，例如 `LICENSE`、`*.ts.map`、`**/test/` 等文件，可以有效减少构建包尺寸。

```
experimentalFeatures:
    removeUselessFiles: true
```

##

## 扩展

### 1. 生命周期扩展

用户可以在 `package.json` 中添加 `midway-integration` 字段来根据各个命令的生命周期扩展 cli 的行为。
​

比如，在 package 命令 `installDevDep` 的后面添加自定义逻辑：
​

```bash
{
	"midway-integration": {
  	"lifecycle": {
    	"after:package:installDevDep": "npm run build"
    }
  }
}
```

其中 `lifecycle` 的格式为 `${ 'before' | 'after' | '' }:${ 命令 }:${ 命令生命周期 }` 。
​

package 命令的声明周期列表：

```bash
 'cleanup', // 清理构建目录
 'installDevDep', // 安装开发期依赖
 'copyFile', // 拷贝文件: package.include 和 shared content
 'compile', //
 'emit', // 编译函数  'package:after:tscompile'
 'analysisCode', // 分析代码
 'copyStaticFile', // 拷贝src中的静态文件到dist目录，例如 html 等
 'checkAggregation', // 检测高密度部署
 'generateSpec', // 生成对应平台的描述文件，例如 serverless.yml 等
 'generateEntry', // 生成对应平台的入口文件
 'installLayer', // 安装layer
 'installDep', // 安装依赖
 'package', // 函数打包
 'finalize', // 完成
```

###

### 2. 通过插件进行扩展

用户可以自己编写 cli 插件，通过插件来实现更为复杂的 cli 的行为，也可以添加自定义命令。
目前支持两种插件：

- npm 插件，插件是一个 npm 包
- local 插件，插件在本地位置
- ​

通过在 f.yml 文件中配置 `plugins` 字段使 cli 加载插件：

```yaml
plugins:
	- npm::test-plugin-model
  - local::./test/plugin
```

plugin 配置格式为： `${ 'npm' | 'local' }:${ provider || '' }:${ pluginName || path }`
​

插件的代码参考：

```typescript
// src/index.ts

import { BasePlugin } from '@midwayjs/command-core';

export class TestLalalaPlugin extends BasePlugin {
  commands = {
    lalala: {
      usage: '自定义命令',
      lifecycleEvents: [
        'a', // 自定义生命周期
        'b',
      ],
      // 暂无
      options: {
        name: {
          usage: '参数 name, 例如: mw lalala --name=123',
          shortcut: 'n', // 参数缩写
        },
      },
    },
  };

  hooks = {
    // 添加当前插件内的命令生命周期扩展
    // lalala 命令的 a 生命周期
    'lalala:a': async () => {
      // 输出
      this.core.cli.log('lalala command hook');

      // 获取用户输入的参数
      this.core.cli.log(this.core.options);

      // f.yml 内容
      this.core.cli.log(this.core.service);

      // 仅在 -V 参数下输出的内容
      this.core.debug('lalala');
    },

    // 添加其他插件内的命令生命周期扩展
    // 在 package 命令的  copyFile 生命周期 “之前” 执行
    'before:package:copyFile': async () => {
      console.log('package command hook');
    },
  };
}
```
