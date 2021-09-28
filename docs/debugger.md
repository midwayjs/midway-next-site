---
title: 本地调试
---

## 在 VSCode 中调试

### 方法一：使用 Auto Attach

VSCode 已经通过 auto attach 能力比较容易的支持了调试（不需要配置），打开方式如下。

:::info

- 1、**必须在 VSCode 中启动**才能 auto attach（按 command+shift+P，打 auto attach 开启自动附加进程）

![image.png](https://cdn.nlark.com/yuque/0/2020/png/501408/1587030210005-3110674f-aec7-47a3-b1c4-2dceceaccbe0.png#align=left&display=inline&height=219&margin=%5Bobject%20Object%5D&name=image.png&originHeight=438&originWidth=2446&size=111294&status=done&style=none&width=1223)
:::

打开之后，VSCode 会有下面的提示。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/501408/1600960974458-3d965f74-d0cc-4be8-9228-5d1514f3ced1.png#align=left&display=inline&height=32&margin=%5Bobject%20Object%5D&name=image.png&originHeight=64&originWidth=1368&size=15786&status=done&style=none&width=684)
对你想要开启调试的命令增加 `--debug`  选项即可。比如：

```json
{
  "scripts": {
    "dev": "cross-env ets && cross-env NODE_ENV=local midway-bin dev --ts --debug"
  }
}
```

这样在 `dev`  时将会自动进行调试。

### 方法二：使用 JavaScript Debug Teminal

在 VSCode 的终端下拉出，隐藏着一个 `JavaScript Debug Terminal` ，点击它，创建出来的终端将自带调试能力。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/501408/1600961364664-67885e44-3308-4c98-95ff-1af398dba9ae.png#align=left&display=inline&height=182&margin=%5Bobject%20Object%5D&name=image.png&originHeight=364&originWidth=1030&size=141353&status=done&style=none&width=515)
输入任意的命令都将自动开启 Debug，比如输入 `npm run dev`  后。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/501408/1600961451349-29b4b0a7-5863-4ff3-a66c-db58eb1cc199.png#align=left&display=inline&height=522&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1044&originWidth=2746&size=212246&status=done&style=none&width=1373)

### 方法三：配置调试文件

创建一个 vscode 的启动文件。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/501408/1612503130603-a83b5e41-e6b9-49e6-be5a-4bfb993b48b7.png#align=left&display=inline&height=344&margin=%5Bobject%20Object%5D&name=image.png&originHeight=344&originWidth=645&size=28531&status=done&style=none&width=645)
随便选一个，会创建 `.vscode/launch.json` 文件，
![image.png](https://cdn.nlark.com/yuque/0/2021/png/501408/1612503193927-26976931-b53a-4144-bd57-c4d178d2d8ec.png#align=left&display=inline&height=231&margin=%5Bobject%20Object%5D&name=image.png&originHeight=231&originWidth=655&size=21494&status=done&style=none&width=655)

将下面内容复制进去。

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Midway Local",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "npm",
      "windows": {
        "runtimeExecutable": "npm.cmd"
      },
      "runtimeArgs": ["run", "dev"],
      "env": {
        "NODE_ENV": "local"
      },
      "console": "integratedTerminal",
      "protocol": "auto",
      "restart": true,
      "port": 7001,
      "autoAttachChildProcesses": true
    }
  ]
}
```

启动断点即可。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/501408/1612503389173-0f8e3219-0fe7-43d7-89c2-f0283bc249a9.png#align=left&display=inline&height=1020&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1020&originWidth=1470&size=199463&status=done&style=none&width=1470)

## 在 WebStorm/Idea 中调试

开始配置 IDE。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/501408/1587031125652-b33f5a18-8ae1-405f-b1a9-bd6ea923e099.png#align=left&display=inline&height=346&margin=%5Bobject%20Object%5D&name=image.png&originHeight=692&originWidth=1110&size=83457&status=done&style=none&width=555)
配置 npm 命令。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/501408/1608369067606-9bd2faf2-757c-44e6-8ce1-c2d32508aedf.png#align=left&display=inline&height=473&margin=%5Bobject%20Object%5D&name=image.png&originHeight=946&originWidth=620&size=146092&status=done&style=none&width=310)
选择你的 `package.json`  后，下拉选择 `Scrips` ，其中是你 `package.json`  中配置好的 `scripts`  中的命令，选择你要的命令，比如 `dev`  或者 `test`  等即可 。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/501408/1608369181502-5d1fabff-595a-4dd2-90a4-69e4d5963062.png#align=left&display=inline&height=533&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1066&originWidth=1572&size=189712&status=done&style=none&width=786)

在代码上断点后执行调试即可。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/501408/1587031866061-68fa841d-6030-45b3-ab74-adfa4264df74.png#align=left&display=inline&height=454&margin=%5Bobject%20Object%5D&name=image.png&originHeight=907&originWidth=1327&size=193255&status=done&style=none&width=663.5)
