module.exports = {
  "基础": [
    {
      "type": "doc",
      "id": "introduction",
      "label": "介绍"
    },
    {
      "type": "doc",
      "id": "start_app",
      "label": "创建第一个应用"
    },
    {
      "type": "doc",
      "id": "controller",
      "label": "控制器（Controller）"
    },
    {
      "type": "doc",
      "id": "service",
      "label": "服务和注入"
    },
    {
      "type": "doc",
      "id": "req_res_app",
      "label": "请求、响应、应用"
    },
    {
      "type": "doc",
      "id": "web_middleware",
      "label": "Web 中间件"
    },
    {
      "type": "doc",
      "id": "deployment",
      "label": "启动和部署"
    }
  ],
  "Web": [
    {
      "type": "category",
      "label": "Web 技术",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "cookies",
          "label": "Cookies"
        },
        {
          "type": "doc",
          "id": "session",
          "label": "Session"
        },
        {
          "type": "doc",
          "id": "body-parser",
          "label": "BodyParser"
        },
        {
          "type": "doc",
          "id": "static_file",
          "label": "静态资源（Static File）"
        },
        {
          "type": "doc",
          "id": "cors",
          "label": "跨域 CORS"
        },
        {
          "type": "doc",
          "id": "file_upload",
          "label": "文件上传"
        },
        {
          "type": "doc",
          "id": "validate",
          "label": "参数校验和转换"
        }
      ]
    },
    {
      "type": "category",
      "label": "Web 框架",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "eggjs",
          "label": "EggJS"
        },
        {
          "type": "doc",
          "id": "koa",
          "label": "Koa"
        },
        {
          "type": "doc",
          "id": "express",
          "label": "Express"
        }
      ]
    },
    {
      "type": "category",
      "label": "WebSocket",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "socketio",
          "label": "SocketIO"
        },
        {
          "type": "doc",
          "id": "ws",
          "label": "WebSocket"
        }
      ]
    },
    {
      "type": "category",
      "label": "示例",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "link",
          "label": "官方示例库",
          "href": "https://github.com/midwayjs/midway-examples"
        },
        {
          "type": "category",
          "label": "社区示例",
          "collapsed": false,
          "collapsible": false,
          "items": [
            {
              "type": "link",
              "label": "一个社区的 Midway 最佳实践",
              "href": "https://github.com/fsd-nodejs/service-mw2"
            },
            {
              "type": "link",
              "label": "一个组件示例",
              "href": "https://github.com/czy88840616/midway-test-component/"
            },
            {
              "type": "link",
              "label": "一个基于 Midway 的后台管理系统",
              "href": "https://github.com/cool-team-official/cool-admin-midway"
            },
            {
              "type": "link",
              "label": "一个包含 nacos + crud 的示例",
              "href": "https://github.com/developeryvan/midwayjs-crud"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "迁移和升级",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "v1_upgrade_v2",
          "label": "从 Midway v1 升级到 v2"
        }
      ]
    }
  ],
  "函数式 & 一体化": [
    {
      "type": "doc",
      "id": "hooks_intro",
      "label": "介绍"
    },
    {
      "type": "category",
      "label": "函数式",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "hooks_api",
          "label": "接口开发 & 前端调用"
        },
        {
          "type": "doc",
          "id": "hooks_syntax",
          "label": "Hooks 语法"
        },
        {
          "type": "doc",
          "id": "hooks_builtin",
          "label": "内置 Hooks"
        },
        {
          "type": "doc",
          "id": "hooks_route",
          "label": "路由"
        },
        {
          "type": "doc",
          "id": "hooks_middleware",
          "label": "Web 中间件"
        },
        {
          "type": "doc",
          "id": "hooks_component",
          "label": "运行时配置 & Hooks 组件"
        },
        {
          "type": "doc",
          "id": "hooks_debug",
          "label": "本地调试"
        },
        {
          "type": "doc",
          "id": "hooks_bff",
          "label": "纯接口项目增加 Hooks 支持"
        }
      ]
    },
    {
      "type": "category",
      "label": "一体化",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "hooks_create",
          "label": "项目初始化"
        },
        {
          "type": "doc",
          "id": "hooks_custom_request",
          "label": "自定义前端 SDK"
        },
        {
          "type": "doc",
          "id": "oss_upload",
          "label": "OSS 文件上传"
        },
        {
          "type": "doc",
          "id": "hooks_miniprogram",
          "label": "小程序一体化"
        },
        {
          "type": "doc",
          "id": "application_integration",
          "label": "非 Serverless 环境使用一体化"
        }
      ]
    }
  ],
  "功能": [
    {
      "type": "category",
      "label": "基础能力",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "testing",
          "label": "测试"
        },
        {
          "type": "doc",
          "id": "container",
          "label": "依赖注入"
        },
        {
          "type": "doc",
          "id": "environment",
          "label": "运行环境"
        },
        {
          "type": "doc",
          "id": "env_config",
          "label": "多环境配置"
        },
        {
          "type": "doc",
          "id": "midway_component",
          "label": "使用组件"
        },
        {
          "type": "doc",
          "id": "lifecycle",
          "label": "生命周期"
        },
        {
          "type": "doc",
          "id": "logger",
          "label": "日志"
        },
        {
          "type": "doc",
          "id": "debugger",
          "label": "本地调试"
        },
        {
          "type": "doc",
          "id": "aspect",
          "label": "方法拦截器（切面）"
        },
        {
          "type": "doc",
          "id": "pipeline",
          "label": "代码流程控制"
        }
      ]
    },
    {
      "type": "category",
      "label": "组件",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "render",
          "label": "模板渲染"
        },
        {
          "type": "doc",
          "id": "orm",
          "label": "Database（TypeORM)"
        },
        {
          "type": "doc",
          "id": "sequelize",
          "label": "Sequelize"
        },
        {
          "type": "doc",
          "id": "mongo",
          "label": "MongoDB"
        },
        {
          "type": "doc",
          "id": "redis",
          "label": "Redis"
        },
        {
          "type": "doc",
          "id": "graphql",
          "label": "GraphQL"
        },
        {
          "type": "doc",
          "id": "axios",
          "label": "HTTP 请求（Axios）"
        },
        {
          "type": "doc",
          "id": "cache",
          "label": "缓存（Cache）"
        },
        {
          "type": "doc",
          "id": "task",
          "label": "任务调度（Task）"
        },
        {
          "type": "doc",
          "id": "swagger",
          "label": "Swagger"
        },
        {
          "type": "doc",
          "id": "oss",
          "label": "对象存储（OSS）"
        },
        {
          "type": "doc",
          "id": "cos",
          "label": "对象存储（COS）"
        },
        {
          "type": "doc",
          "id": "vkywr5",
          "label": "进程共享（ProcessAgent）"
        },
        {
          "type": "doc",
          "id": "tablestore",
          "label": "TableStore"
        }
      ]
    },
    {
      "type": "category",
      "label": "运维",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "pm2",
          "label": "使用 pm2"
        },
        {
          "type": "doc",
          "id": "cfork",
          "label": "使用 cfork"
        },
        {
          "type": "doc",
          "id": "alinode",
          "label": "接入 Alinode"
        },
        {
          "type": "doc",
          "id": "prometheus",
          "label": "接入 Prometheus"
        }
      ]
    },
    {
      "type": "category",
      "label": "自定义扩展",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "component_development",
          "label": "组件开发"
        },
        {
          "type": "doc",
          "id": "multi_framework_start",
          "label": "多框架研发"
        },
        {
          "type": "doc",
          "id": "framework_development",
          "label": "框架扩展"
        },
        {
          "type": "doc",
          "id": "context_definition",
          "label": "扩展上下文定义"
        },
        {
          "type": "doc",
          "id": "router_table",
          "label": "Web 路由表"
        },
        {
          "type": "doc",
          "id": "service_factory",
          "label": "服务工厂"
        },
        {
          "type": "doc",
          "id": "custom_eggjs",
          "label": "自定义 EggJS 框架接入"
        },
        {
          "type": "doc",
          "id": "decorator_api",
          "label": "高级装饰器 API"
        }
      ]
    },
    {
      "type": "category",
      "label": "工具",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "cli",
          "label": "@midwayjs/cli"
        },
        {
          "type": "doc",
          "id": "mwts",
          "label": "Lint 工具、规则和格式化"
        },
        {
          "type": "doc",
          "id": "luckyeye",
          "label": "检查工具"
        },
        {
          "type": "doc",
          "id": "typeorm_generator",
          "label": "TypeORM Model Generator"
        },
        {
          "type": "doc",
          "id": "egg-ts-helper",
          "label": "@midwayjs/egg-ts-helper"
        }
      ]
    }
  ],
  "微服务": [
    {
      "type": "doc",
      "id": "grpc",
      "label": "gRPC"
    },
    {
      "type": "doc",
      "id": "rabbitmq",
      "label": "RabbitMQ"
    },
    {
      "type": "doc",
      "id": "consul",
      "label": "Consul"
    }
  ],
  "Serverless": [
    {
      "type": "doc",
      "id": "serverless_introduction",
      "label": "介绍"
    },
    {
      "type": "category",
      "label": "基础",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "serverless_dev",
          "label": "开发函数"
        },
        {
          "type": "doc",
          "id": "serverless_testing",
          "label": "测试函数"
        },
        {
          "type": "doc",
          "id": "serverless_aggr",
          "label": "聚合部署"
        },
        {
          "type": "doc",
          "id": "serverless_context",
          "label": "函数上下文"
        },
        {
          "type": "doc",
          "id": "serverless_yml",
          "label": "f.yml 定义"
        },
        {
          "type": "doc",
          "id": "serverless_environment",
          "label": "部署环境"
        },
        {
          "type": "doc",
          "id": "serverless_error",
          "label": "默认错误行为"
        },
        {
          "type": "doc",
          "id": "serverless_to_app",
          "label": "Serverless 函数部署为应用"
        }
      ]
    },
    {
      "type": "category",
      "label": "平台能力：阿里云 FC",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "aliyun_trigger_event",
          "label": "事件触发器（Event）"
        },
        {
          "type": "doc",
          "id": "aliyun_trigger_http",
          "label": "HTTP 触发器"
        },
        {
          "type": "doc",
          "id": "aliyun_trigger_apigw",
          "label": "API 网关"
        },
        {
          "type": "doc",
          "id": "aliyun_trigger_timer",
          "label": "Timer 触发器（定时任务）"
        },
        {
          "type": "doc",
          "id": "aliyun_trigger_oss",
          "label": "OSS 触发器（对象存储）"
        },
        {
          "type": "doc",
          "id": "aliyun_trigger_mns",
          "label": "MNS 触发器（消息队列）"
        },
        {
          "type": "doc",
          "id": "deploy_to_aliyun",
          "label": "发布到阿里云 FC"
        },
        {
          "type": "doc",
          "id": "deploy_aliyun_faq",
          "label": "阿里云发布 FAQ"
        }
      ]
    },
    {
      "type": "category",
      "label": "平台能力：腾讯云 SCF",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "tencent_trigger_apigw",
          "label": "API 网关（HTTP）"
        },
        {
          "type": "doc",
          "id": "tencent_trigger_timer",
          "label": "Timer 触发器（定时任务）"
        },
        {
          "type": "doc",
          "id": "tencent_trigger_cos",
          "label": "COS 触发器（对象存储）"
        },
        {
          "type": "doc",
          "id": "tencent_trigger_cmq",
          "label": "CMQ 触发器（消息队列）"
        },
        {
          "type": "doc",
          "id": "deploy_to_tencent",
          "label": "发布到腾讯云 SCF"
        },
        {
          "type": "doc",
          "id": "deploy_tencent_faq",
          "label": "腾讯云发布 FAQ"
        }
      ]
    },
    {
      "type": "doc",
      "id": "app_deploy_serverless",
      "label": "应用部署 Serverless 环境"
    },
    {
      "type": "category",
      "label": "迁移和升级",
      "collapsed": false,
      "collapsible": false,
      "items": [
        {
          "type": "doc",
          "id": "serverless_v1_upgrade_serverless_v2",
          "label": "从 Serverless v1 迁移到 v2"
        }
      ]
    }
  ],
  "FAQ": [
    {
      "type": "doc",
      "id": "framework_problem",
      "label": "常见框架错误"
    },
    {
      "type": "doc",
      "id": "npm_problem",
      "label": "常见 npm 问题"
    },
    {
      "type": "doc",
      "id": "git_problem",
      "label": "常见 git 问题"
    },
    {
      "type": "doc",
      "id": "ts_problem",
      "label": "常见 TS 问题"
    },
    {
      "type": "doc",
      "id": "decorator_index",
      "label": "现有装饰器索引"
    },
    {
      "type": "doc",
      "id": "how_to_install_nodejs",
      "label": "如何安装 Node.js 环境"
    },
    {
      "type": "doc",
      "id": "migrate_faq",
      "label": "应用迁移 FAQ"
    },
    {
      "type": "doc",
      "id": "midway_slow_problem",
      "label": "关于 Midway 启动慢的问题"
    },
    {
      "type": "doc",
      "id": "serverless_post_difference",
      "label": "Serverless 触发器 POST 情况差异"
    },
    {
      "type": "doc",
      "id": "how_to_update_midway",
      "label": "如何更新 Midway"
    },
    {
      "type": "doc",
      "id": "release_schedule",
      "label": "Midway 维护计划"
    }
  ]
}