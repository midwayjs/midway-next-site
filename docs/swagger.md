---
title: Swagger
---

[Swagger](https://swagger.io/) 是一个规范和完整的框架，用于生成、描述、调用和可视化 RESTful 风格的 Web 服务。Swagger 让部署管理和使用功能强大的 API 从未如此简单。

Midway 通过组件化的形式来支持 swagger 能力。

## 一、例子

点此 [访问示例库](https://github.com/midwayjs/midway-examples/tree/master/v2/demo-swagger)

```bash
$ npm install
$ npm run dev
```

然后访问：[http://127.0.0.1:7001/swagger-ui/index.html](http://127.0.0.1:7001/swagger-ui/index.html)

## 二、使用方法

### 2.1 安装

安装依赖。

```bash
npm install @midwayjs/swagger --save
npm install swagger-ui-dist --save-dev
```

如果想要在服务器上输出 swagger API 页面，则需要将 `swagger-ui-dist` 安装到依赖中。

```bash
npm install swagger-ui-dist --save
```

### 2.2 配置

在 `configuration.ts` 中增加组件。

```typescript
import { Configuration } from '@midwayjs/decorator';
import * as swagger from '@midwayjs/swagger';

@Configuration({
  imports: [swagger],
})
export class ContainerConfiguration {}
```

可以配置启用的环境，比如下面的代码指的是“只在 local 环境下启用”。

```typescript
import { Configuration } from '@midwayjs/decorator';
import * as swagger from '@midwayjs/swagger';

@Configuration({
  imports: [
    {
      component: swagger,
      enabledEnvironment: ['local'],
    },
  ],
})
export class ContainerConfiguration {}
```

### 2.3 使用

直接启动即可，由于通过元数据进行了分析，默认情况下，可以**直接获取到当前的参数，类型，名称，依赖关系**等。

访问：[http://127.0.0.1:7001/swagger-ui/index.html](http://127.0.0.1:7001/swagger-ui/index.html) 拿到 swagger UI 界面。
访问：[http://127.0.0.1:7001/swagger-ui/json](http://127.0.0.1:7001/swagger-ui/json) 拿到 swagger json 结构。

## 三、示例

### 3.1 描述请求

通过 `summary` 和 `description` 方法，我们可以对整个接口进行描述。

```typescript
import { CreateApiDoc } from '@midwayjs/swagger'

@CreateApiDoc()
  .summary('get user')
  .description('This is a open api for get user')
  .build()

@Get('/:userId')
async getUser(@Param() userId: number, @Query() name?: string) {
  return {
    name: 'harry',
    age: 18
  };
}
```

<img src="https://cdn.nlark.com/yuque/0/2020/png/501408/1605013889037-58cb5bc5-cc37-43e6-8512-834d9c2e0ba9.png#height=150&id=jRI8p&margin=%5Bobject%20Object%5D&name=image.png&originHeight=300&originWidth=750&originalType=binary&size=18686&status=done&style=none&width=375" width="375" />

### 3.2 参数描述

通过 `param` 方法可以描述接口的参数，按顺序描述参数。如果有多个参数，则可以调用多次。以我们的示例为例，有两个参数， `userId` 和 `name` 。

`param` 方法的定义如下。

```typescript
param(description: Partial<APIParamFormat>): SwaggerAPI;
param(description: string, options?: Partial<APIParamFormat>): SwaggerAPI;
```

在最简单的情况下，我们可以直接写参数的描述，同时，会自动分析出参数的类型，比如路由中的参数、请求中的参数等。

```typescript
@CreateApiDoc()
	.param('user id')
	.param('user name')
  .build()

@Get('/:userId')
async getUser(@Param() userId: number, @Query() name?: string) {
  return {
    name: 'harry',
    age: 18
  };
}
```

<img src="https://cdn.nlark.com/yuque/0/2020/png/501408/1605016059585-e2bce9f0-bf62-4d25-b794-f54340b555ab.png#height=347&id=YwKAq&margin=%5Bobject%20Object%5D&name=image.png&originHeight=694&originWidth=1270&originalType=binary&size=51562&status=done&style=none&width=635" width="635" />

在更为复杂的情况下，参数可以更加精确的描述。

```typescript
export interface APIParamFormat {
  name: string; // 参数名
  description: string; // 参数描述
  required: boolean; // 参数是否必须
  deprecated: boolean; // 参数是否废弃
  allowEmptyValue: boolean; // 参数是否允许控制
  example: any; // 参数的示例
}
```

下面是参数的示例，有两种方式去具体描述参数。

```typescript
@CreateApiDoc()
.summary('get user')
.description('This is a open api for get user')
.param('user id', {
  required: true,
  example: '123456'
})
.param({
  description: 'This is a user name'
})
.build()
@Get('/:userId')
async getUser(@Param() userId: number, @Query() name?: string) {
  return {
    name: 'harry',
    age: 18
  };
}
```

<img src="https://cdn.nlark.com/yuque/0/2020/png/501408/1605016872114-640ff1e2-88d9-4c1e-969b-a1c8794180bd.png#height=340&id=UdmiX&margin=%5Bobject%20Object%5D&name=image.png&originHeight=680&originWidth=1112&originalType=binary&size=47848&status=done&style=none&width=556" width="556" />

### 3.3 返回值描述

一个接口会有多种返回值的可能性，可以调用多次 `respond` 方法来描述不同的返回结果。

响应的接口描述如下。

```typescript
respond(
  status: number,
  description?: string,
  respondType?: string,
  options?: Partial<APIResponseFormat>
): SwaggerAPI;

export interface APIResponseFormat {
  status: string;
  description: string;
  headers: any;
  example: any;
}
```

参数分为四个部分，除了状态码，其他都是可选参数，下面的示例展示了多种不同的返回描述。

```typescript
@CreateApiDoc()
.summary('get user')
.description('This is a open api for get user')
.respond(200)
.respond(302, 'redirect to another URL')
.respond(201, 'response a text data', 'text', {
  headers: {
    'x-schema': {
      description: 'set a schema header',
      type: 'string'
    }
  },
  example: 'this is a reponse data'
})
.respond(500, 'error in response', 'json', {
  example: {
    a: 1
  }
})
.build()
```

你可以直接设置一个状态码，也可以在设置状态码之后，紧跟着设置描述，以及返回的 header，数据类型和示例。

展示的效果为

<img src="https://cdn.nlark.com/yuque/0/2020/png/501408/1605023356892-77af3cf9-949d-49d5-adfe-8da98e888b60.png#height=829&id=nFEky&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1658&originWidth=2860&originalType=binary&size=194050&status=done&style=none&width=1430" width="1430" />

### 3.4 通用描述

可以通过在 `Controller` 装饰器和 `Get` 等路由装饰器上简单的增加描述信息。

#### 控制器分组和描述

```typescript
@Controller('/', { tagName: 'Custom Group', description: 'Home Router' })
export class HomeController {}
```

<img src="https://cdn.nlark.com/yuque/0/2020/png/501408/1605011893128-f72e4916-24c7-4c59-ba76-4cd3f17c7bc9.png#height=143&id=Fqp8z&margin=%5Bobject%20Object%5D&name=image.png&originHeight=286&originWidth=808&originalType=binary&size=16673&status=done&style=none&width=404" width="404" />

#### 路由描述

```typescript
@Get('/', {summary: 'Main Page', description: 'This is a home router'})
async home() {
  return 'Hello Midwayjs!';
}
```

<img src="https://cdn.nlark.com/yuque/0/2020/png/501408/1605011937991-8fb2136a-f091-4016-9745-8434d8130a6a.png#height=173&id=UdC82&margin=%5Bobject%20Object%5D&name=image.png&originHeight=346&originWidth=942&originalType=binary&size=19218&status=done&style=none&width=471" width="471" />

##

#### 增强的接口描述信息（进阶模式）

如果需要增加细节描述字段，则增加了 `@CreateApiDoc` 装饰器，用于定义描述，包括入参和出参。整个装饰器设计为链式调用，方便 IDE 获取到对应的方法和参数定义。

我们以一个接口为例。注意， `@CreateApiDoc`  装饰器最后需要跟一个 `build`  方法作为结尾。

**完整的示例**

```typescript
import { CreateApiDoc, CreateApiPropertyDoc } from '@midwayjs/swagger';

export class UserDTO {
  @CreateApiPropertyDoc('user name')
  @Rule(RuleType.string().required())
  name: string;

  @CreateApiPropertyDoc('user age')
  @Rule(RuleType.number())
  age: number;
}

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  ctx: IMidwayKoaContext;

  @Inject()
  userService: UserService;

  @(CreateApiDoc()
    .summary('get user')
    .description('This a a open api for get user')
    .param('user id', {
      required: true,
      example: 2,
    })
    .param('user name')
    .respond(200, 'success', 'text', {
      example: 'hello world',
    })
    .respond(500, 'throw error')
    .build())
  @Get('/:userId')
  async getUser(@Param() userId: number, @Query() name?: string) {
    return {
      name: 'harry',
      age: 18,
    };
  }
}
```

#### 更多配置

可以修改默认的 Swagger 版本，描述等。这些配置可以在用户配置，比如 `src/config/config.default.ts`  中配置。

```typescript
export const swagger = {
  title: 'midway-swagger',
  description: 'swagger-ui for midway api',
  version: '1.0.0',
  termsOfService: '',
  contact: {
    name: 'API Support',
    url: 'http://www.example.com/support',
    email: 'support@example.com',
  },
  license: {
    name: 'Apache 2.0',
    url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
  },
};
```

## 四、总结

最后大家如果遇到什么问题，或者希望追加什么功能，或者学习内部实现，可以关注我们的仓库地址：
(👇，点赞，分享...三连)
[https://github.com/midwayjs/midway](https://github.com/midwayjs/midway)
