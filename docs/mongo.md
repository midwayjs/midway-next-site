---
title: MongoDB
---

我们选择了 [Typegoose](https://github.com/typegoose/typegoose) 作为基础的 MongoDB ORM 库。就如同他描述的那样 " Define Mongoose models using TypeScript classes"，和 TypeScript 结合的很不错。

简单的来说，Typegoose 使用 TypeScript 编写 Mongoose 模型的 “包装器”，它的大部分能力还是由 [mongoose](https://www.npmjs.com/package/mongoose) 库来提供的。

## 安装组件

安装 Typegoose 组件，提供访问 MongoDB 的能力。

**请务必注意，依赖需要确保版本相关后单独安装。**

```bash
npm i -s @midwayjs/typegoose @typegoose/typegoose   # install typegoose itself
npm i -s mongoose 																	# install peer-dependencie mongoose
```

Typegoose 和 mongoose 有特定版本的依赖关系，请查看下表或者 [官网](https://typegoose.github.io/typegoose/docs/guides/migration/migrate-9)。

| **版本**           | **依赖**          |
| ------------------ | ----------------- |
| Typegoose 9.0.0    | Mongoose >= 6.0.7 |
| Typegoose 8.0.0    | Node.js > 12.22   |
| Mongoose >= 5.13.3 |
| Typegoose 7.0.0    | Node.js > 10.15   |
| Mongoose >=5.9.10  |

而 mongoose 和你服务器使用的 MongoDB Server 的版本也有着一定的关系，如下，请务必注意。
​

- MongoDB Server 2.4.x: mongoose ^3.8 or 4.x
- MongoDB Server 2.6.x: mongoose ^3.8.8 or 4.x
- MongoDB Server 3.0.x: mongoose ^3.8.22, 4.x, or 5.x
- MongoDB Server 3.2.x: mongoose ^4.3.0 or 5.x
- MongoDB Server 3.4.x: mongoose ^4.7.3 or 5.x
- MongoDB Server 3.6.x: mongoose 5.x
- MongoDB Server 4.0.x: mongoose ^5.2.0
- MongoDB Server 4.2.x: mongoose ^5.7.0
- MongoDB Server 4.4.x: mongoose ^5.10.0
- MongoDB Server 5.x: mongoose ^6.0.0

你也可以直接 `package.json`  增加依赖，比如，下面是 Typegoose 8.0.0 的依赖，对应 mongoose 5.13.3。

```json
  "dependencies": {
    "@midwayjs/typegoose": "^2.0.0",
    "@typegoose/typegoose": "^8.1.0",
    "mongoose": "~5.13.3"
  },
```

安装后需要手动在 `src/configuration.ts` 配置，代码如下。

```typescript
// configuration.ts
import { Configuration } from '@midwayjs/decorator';
import * as typegoose from '@midwayjs/typegoose';

@Configuration({
  imports: [
    typegoose, // 加载 typegoose 组件
  ],
  importConfigs: [
    join(__dirname, './config'), // 加载配置文件（eggjs 下不需要）
  ],
})
export class ContainerConfiguration {}
```

## 使用

:::info
在该组件中，midway 只是做了简单的配置规则化，并将其注入到初始化流程中。
:::

### 1、配置连接信息

在 `src/config/config.default.ts`  中加入默认的配置。

```typescript
import * as typegoose from '@midwayjs/typegoose';

export const mongoose: typegoose.DefaultConfig = {
  uri: 'mongodb+srv://cluster0.hy9wo.mongodb.net/',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: '***********',
    user: '***********',
    pass: '***********',
  },
};
```

### 2、简单的目录结构

我们以一个简单的项目举例，其他结构请自行参考。

```
MyProject
├── src              							// TS 根目录
│   ├── config
│   │   └── config.default.ts 		// 应用配置文件
│   ├── entity       							// 实体（数据库 Model) 目录
│   │   └── user.ts  					  	// 实体文件
│   ├── configuration.ts     			// Midway 配置文件
│   └── service      							// 其他的服务目录
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

在这里，我们的数据库实体主要放在 `entity` 目录（非强制），这只是一个简单的约定。

### 3、创建实体文件

```typescript
import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
  @prop()
  public name?: string;

  @prop({ type: () => [String] })
  public jobs?: string[];
}
```

等价于使用 mongoose 的下列代码

```typescript
const userSchema = new mongoose.Schema({
  name: String,
  jobs: [{ type: String }],
});

const User = mongoose.model('User', userSchema);
```

:::info
所以说，typegoose 只是简化了 model 的创建过程。
:::

### 4、引用实体，调用数据库

示例代码如下：

```typescript
import { getModelForClass } from '@typegoose/typegoose';
import { User } from './entity/user';

@Provide()
export class TestService {
  async getTest() {
    // get model
    const UserModel = getModelForClass(User);

    // create data
    const { _id: id } = await UserModel.create({ name: 'JohnDoe', jobs: ['Cleaner'] } as User); // an "as" assertion, to have types for all properties

    // find data
    const user = await UserModel.findById(id).exec();
    console.log(user);
  }
}
```

如果 Model 复用，也可以是在初始化中保存。

```typescript
import { getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { User } from './entity/user';

@Provide()
export class TestService {
  userModel: ReturnModelType<typeof User>;

  @Init()
  async init() {
    // get model
    this.userModel = getModelForClass(User);
  }

  async getTest() {
    // create data
    const { _id: id } = await this.userModel.create({ name: 'JohnDoe', jobs: ['Cleaner'] } as User); // an "as" assertion, to have types for all properties

    // find data
    const user = await this.userModel.findById(id).exec();
    console.log(user);
  }
}
```

## 常见问题

### 1、多库的情况

typegoose 默认不支持多库，而是通过复用现有的 mongoose 连接来做的。（由于装饰器在 require 期间就被执行了，无法读取配置，只能写死，我们依旧在跟进这个问题，现在不是特别好用）

```typescript
import { modelOptions, mongoose, prop } from '@typegoose/typegoose';

@modelOptions({
  existingConnection: mongoose.createConnection('mongodb+srv://cluster0.hy9wo.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
})
export class User {
  @prop() public name?: string;
  @prop({ type: () => [String] }) public jobs?: string[];
}
```
