module.exports = {
  "基础": [
    "introduction"
  ],
  "Web": [
    {
      "type": "category",
      "label": "概述",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "start_app",
        "controller",
        "service",
        "req_res_app",
        "web_middleware",
        "deployment"
      ]
    },
    {
      "type": "category",
      "label": "Web 技术",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "cookies",
        "session",
        "body-parser",
        "static_file",
        "cors",
        "file_upload",
        "validate"
      ]
    },
    {
      "type": "category",
      "label": "Web 框架",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "eggjs",
        "koa",
        "express"
      ]
    },
    {
      "type": "category",
      "label": "WebSocket",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "socketio",
        "ws"
      ]
    },
    {
      "type": "category",
      "label": "运维",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "pm2",
        "cfork",
        "alinode",
        "prometheus"
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
        "v1_upgrade_v2"
      ]
    }
  ],
  "函数式 & 一体化": [
    "hooks_intro",
    {
      "type": "category",
      "label": "函数式",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "hooks_api",
        "hooks_syntax",
        "hooks_builtin",
        "hooks_route",
        "hooks_middleware",
        "hooks_component",
        "hooks_debug",
        "hooks_bff"
      ]
    },
    {
      "type": "category",
      "label": "一体化",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "hooks_create",
        "hooks_custom_request",
        "oss_upload",
        "hooks_miniprogram",
        "application_integration"
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
        "testing",
        "container",
        "environment",
        "env_config",
        "midway_component",
        "lifecycle",
        "logger",
        "debugger",
        "aspect",
        "pipeline"
      ]
    },
    {
      "type": "category",
      "label": "组件",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "orm",
        "sequelize",
        "mongo",
        "redis",
        "graphql",
        "axios",
        "cache",
        "task",
        "swagger",
        "oss",
        "cos",
        "vkywr5",
        "tablestore"
      ]
    },
    {
      "type": "category",
      "label": "工具",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "cli",
        "mwts",
        "luckyeye",
        "typeorm_generator",
        "egg-ts-helper"
      ]
    },
    {
      "type": "category",
      "label": "自定义扩展",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "component_development",
        "multi_framework_start",
        "framework_development",
        "context_definition",
        "router_table",
        "service_factory",
        "custom_eggjs",
        "decorator_api"
      ]
    }
  ],
  "微服务": [
    "grpc",
    "rabbitmq",
    "consul"
  ],
  "Serverless": [
    "serverless_introduction",
    "serverless_dev",
    "serverless_testing",
    "serverless_aggr",
    "serverless_context",
    "serverless_yml",
    "serverless_environment",
    "serverless_error",
    "serverless_to_app",
    {
      "type": "category",
      "label": "平台能力：阿里云 FC",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "aliyun_trigger_event",
        "aliyun_trigger_http",
        "aliyun_trigger_apigw",
        "aliyun_trigger_timer",
        "aliyun_trigger_oss",
        "aliyun_trigger_mns",
        "deploy_to_aliyun",
        "deploy_aliyun_faq"
      ]
    },
    {
      "type": "category",
      "label": "平台能力：腾讯云 SCF",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "tencent_trigger_apigw",
        "tencent_trigger_timer",
        "tencent_trigger_cos",
        "tencent_trigger_cmq",
        "deploy_to_tencent",
        "deploy_tencent_faq"
      ]
    },
    "app_deploy_serverless",
    {
      "type": "category",
      "label": "迁移和升级",
      "collapsed": false,
      "collapsible": false,
      "items": [
        "serverless_v1_upgrade_serverless_v2"
      ]
    }
  ],
  "FAQ": [
    "framework_problem",
    "npm_problem",
    "git_problem",
    "ts_problem",
    "decorator_index",
    "how_to_install_nodejs",
    "migrate_faq",
    "midway_slow_problem",
    "serverless_post_difference",
    "how_to_update_midway",
    "release_schedule"
  ]
}