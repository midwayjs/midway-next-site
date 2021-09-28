---
title: 常见 TS 问题
---

## 依赖包定义错误

如果依赖包和项目本身的 TS 版本不一致，在编译时会出现错误。

可以在 `tsconfig.json`  关闭依赖包的检查。

```typescript
{
  "compilerOptions": {
    "skipLibCheck": true
  },
}
```

## TS2564 初始化未赋值错误

错误如下：

```yaml
error TS2564: Property 'name' has no initializer and is not definitely assigned in the constructor.
```

原因为开启了 TS 的初始化属性检查，如果没有初始化赋值就会报错。

修复方法：

第一种：移除 tsconfig.json 的检查规则

```json
{
  "strictPropertyInitialization": false // 或者移除
}
```

第二种：属性加感叹号

```typescript
export class HomeController {
  @Inject()
  userService!: UserService;
}
```
