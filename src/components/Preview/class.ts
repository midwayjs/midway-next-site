const home = `import {
  Controller, 
  Get,
  Provide,
  Inject
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

@Provide()
@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home() {
    return {
      message: 'Hello Midway.js',
      path: this.ctx.path
    };
  }
}`;

const user = `import { Controller, Get, Provide, Inject } from '@midwayjs/decorator';

@Provide()
export class UserService {
  getUser() {
    return {
      uid: 1,
      username: 'test',
    };
  }
}

@Provide()
@Controller('/')
export class HomeController {
  @Inject()
  userService: UserService;

  @Get('/user')
  async home() {
    return this.userService.getUser();
  }
}
`

const packageJSON = {
  name: "midway-controller-demo",
  dependencies: {
    "@midwayjs/core": "^2.3.0",
    "@midwayjs/decorator": "^2.3.0",
    "@midwayjs/koa": "^2.3.0"
  },
  devDependencies: {
    "@midwayjs/cli": "^1.0.0",
    "@types/node": "14",
    "cross-env": "^6.0.0",
    typescript: "^4.0.0"
  },
  scripts: {
    dev: "cross-env NODE_ENV=local midway-bin dev --ts"
  }
};

const sandboxConfigJSON = {
  infiniteLoopProtection: true,
  hardReloadOnChange: false,
  view: "browser",
  template: "node",
  container: {
    port: 7001,
    node: "14"
  }
};

const tsConfigJSON = {
  compileOnSave: true,
  compilerOptions: {
    target: "ES2018",
    module: "commonjs",
    moduleResolution: "node",
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    inlineSourceMap: true,
    noImplicitThis: true,
    noUnusedLocals: true,
    stripInternal: true,
    skipLibCheck: false,
    pretty: true,
    declaration: true,
    typeRoots: ["./typings", "./node_modules/@types"],
    outDir: "dist"
  },
  exclude: ["dist", "node_modules", "test"]
};

export default {
  files: {
    "package.json": {
      content: packageJSON
    },
    "src/home.ts": {
      content: home
    },
    "src/user.ts": {
      content: user
    },
    "sandbox.config.json": {
      content: sandboxConfigJSON
    },
    "tsconfig.json": {
      content: tsConfigJSON
    }
  }
}
