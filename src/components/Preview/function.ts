const sandboxConfigJSON = {
  infiniteLoopProtection: true,
  hardReloadOnChange: false,
  view: 'browser',
  template: 'node',
  container: {
    port: 3000,
    node: '14',
  },
}

export default {
  files: {
    'sandbox.config.json': {
      content: sandboxConfigJSON,
    },
    'bootstrap.js': {
      content:
        "const { Framework } = require('@midwayjs/koa');\nconst { Bootstrap } = require('@midwayjs/bootstrap');\n\nconst web = new Framework().configure({\n  port: 7001,\n});\n\nBootstrap.load(web)\n  .run()\n  .then(() => {\n    console.log('Your application is running at http://localhost:7001');\n  });\n",
    },
    'index.html': {
      content:
        '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="icon" type="image/svg+xml" href="src/favicon.svg" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite App</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>\n',
    },
    'midway.config.ts': {
      content:
        "import { defineConfig } from '@midwayjs/hooks';\n\nexport default defineConfig({\n  source: './src/apis',\n  routes: [\n    {\n      baseDir: 'lambda',\n      basePath: '/api',\n    },\n  ],\n});\n",
    },
    'package.json': {
      content:
        '{\n  "name": "hooks-react",\n  "version": "2.3.0",\n  "private": true,\n  "scripts": {\n    "start": "node bootstrap",\n    "dev": "vite",\n    "build": "npm run build:client && npm run build:server",\n    "build:client": "tsc && vite build",\n    "build:server": "mw build",\n    "serve": "vite preview",\n    "test": "jest"\n  },\n  "dependencies": {\n    "@midwayjs/hooks": "^2.3.0",\n    "@midwayjs/koa": "^2.11.4",\n    "koa-bodyparser": "^4.3.0",\n    "react": "^17.0.0",\n    "react-dom": "^17.0.0"\n  },\n  "devDependencies": {\n    "@midwayjs/cli": "^1.2.74",\n    "@midwayjs/cli-plugin-build": "^1.2.74",\n    "@midwayjs/hooks-testing-library": "^2.3.0",\n    "@midwayjs/vite-plugin-hooks": "^2.3.0",\n    "@types/jest": "^26.0.23",\n    "@types/koa-bodyparser": "^4.3.1",\n    "@types/react": "^17.0.13",\n    "@types/react-dom": "^17.0.8",\n    "@vitejs/plugin-react-refresh": "^1.3.5",\n    "jest": "^26.6.3",\n    "typescript": "^4.3.5",\n    "vite": "^2.4.1"\n  },\n  "jest": {\n    "preset": "@midwayjs/hooks"\n  }\n}\n',
    },
    'readme.md': {
      content:
        '## Getting Started\n\nDocs：[Midway Hooks - Getting Started](https://www.yuque.com/midwayjs/midway_v2/hooks_intro?translate=en)\n\n### Directory Structure\n\n```\n.\n├── bootstrap.js //\n├── jest.config.js // Unit test file\n├── midway.config.ts // config file for setup directory and middleware\n├── src\n│   ├── apis // Backend directory\n│   │   ├── configuration.ts // Midway Hooks configuration\n│   │   └── lambda // Api directory(Can be modified in midway.config.ts)\n│   │       ├── index.test.ts // Api test file\n│   │       └── index.ts // Api file\n│   └── main.ts // Frontend framework file\n├── tsconfig.json\n└── vite.config.ts\n```\n\n### Commands\n\n#### Start Dev Server\n\n```bash\n$ npm run dev\n```\n\n#### Build\n\n```bash\n$ npm run build\n```\n\n### Running in production mode\n\n```bash\n$ node bootstrap.js\n```\n',
    },
    'tsconfig.json': {
      content:
        '{\n  "compilerOptions": {\n    "target": "ESNext",\n    "lib": ["DOM", "DOM.Iterable", "ESNext"],\n    "allowJs": false,\n    "esModuleInterop": true,\n    "allowSyntheticDefaultImports": true,\n    "strict": false,\n    "skipLibCheck": true,\n    "forceConsistentCasingInFileNames": true,\n    "module": "ESNext",\n    "moduleResolution": "Node",\n    "resolveJsonModule": true,\n    "noEmit": true,\n    "jsx": "react",\n    "experimentalDecorators": true,\n    "emitDecoratorMetadata": true,\n    "types": ["vite/client", "jest"]\n  },\n  "include": ["./src"],\n  "ts-node": {\n    "compilerOptions": {\n      "module": "commonjs"\n    }\n  }\n}\n',
    },
    'vite.config.ts': {
      content:
        "import { defineConfig } from 'vite';\nimport hooks from '@midwayjs/vite-plugin-hooks';\nimport reactRefresh from '@vitejs/plugin-react-refresh';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [hooks(), reactRefresh()],\n});\n",
    },
    'src/App.css': {
      content:
        '.App {\n  text-align: center;\n}\n\n.App-logo {\n  height: 40vmin;\n  pointer-events: none;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  .App-logo {\n    animation: App-logo-spin infinite 20s linear;\n  }\n}\n\n.App-header {\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n}\n\n.App-link {\n  color: #61dafb;\n}\n\n@keyframes App-logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\nbutton {\n  font-size: calc(10px + 2vmin);\n}\n',
    },
    'src/App.tsx': {
      content:
        'import React, { useState, useEffect } from \'react\';\nimport \'./App.css\';\nimport hello, { post } from \'./apis/lambda\';\nimport logo from \'./logo.svg\';\n\nfunction App() {\n  const [message, setMessage] = useState(\'\');\n\n  useEffect(() => {\n    hello().then((response) => setMessage(response.message));\n  }, []);\n\n  const handleClick = async () => {\n    const message = window.prompt(\'Type message!\');\n    const response = await post(message);\n    alert(JSON.stringify(response, null, 2));\n  };\n\n  return (\n    <div className="App">\n      <header className="App-header">\n        <img src={logo} className="App-logo" alt="logo" />\n        <p>Message from ./apis/lambda: {message}</p>\n        <p>\n          <button onClick={handleClick}>Send message to backend</button>\n        </p>\n        <p>\n          <a\n            className="App-link"\n            href="https://www.yuque.com/midwayjs/faas/hooks"\n            target="_blank"\n            rel="noopener noreferrer"\n          >\n            Learn Midway Hooks\n          </a>\n          {\' | \'}\n          <a\n            className="App-link"\n            href="https://reactjs.org"\n            target="_blank"\n            rel="noopener noreferrer"\n          >\n            React Docs\n          </a>\n          {\' | \'}\n          <a\n            className="App-link"\n            href="https://vitejs.dev/guide/features.html"\n            target="_blank"\n            rel="noopener noreferrer"\n          >\n            Vite Docs\n          </a>\n        </p>\n      </header>\n    </div>\n  );\n}\n\nexport default App;\n',
    },
    'src/favicon.svg': {
      content:
        '<svg width="410" height="404" viewBox="0 0 410 404" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z" fill="url(#paint0_linear)"/>\n<path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z" fill="url(#paint1_linear)"/>\n<defs>\n<linearGradient id="paint0_linear" x1="6.00017" y1="32.9999" x2="235" y2="344" gradientUnits="userSpaceOnUse">\n<stop stop-color="#41D1FF"/>\n<stop offset="1" stop-color="#BD34FE"/>\n</linearGradient>\n<linearGradient id="paint1_linear" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse">\n<stop stop-color="#FFEA83"/>\n<stop offset="0.0833333" stop-color="#FFDD35"/>\n<stop offset="1" stop-color="#FFA800"/>\n</linearGradient>\n</defs>\n</svg>\n',
    },
    'src/index.css': {
      content:
        "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n",
    },
    'src/logo.svg': {
      content:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">\n    <g fill="#61DAFB">\n        <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/>\n        <circle cx="420.9" cy="296.5" r="45.7"/>\n        <path d="M520.5 78.1z"/>\n    </g>\n</svg>\n',
    },
    'src/main.tsx': {
      content:
        "import React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\nimport './index.css';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById('root')\n);\n",
    },
    'src/apis/configuration.ts': {
      content:
        "import bodyParser from 'koa-bodyparser';\nimport { hooks, createConfiguration } from '@midwayjs/hooks';\n\nexport default createConfiguration({\n  imports: [\n    hooks({\n      middleware: [bodyParser()],\n    }),\n  ],\n});\n",
    },
    'src/apis/lambda/index.test.ts': {
      content:
        'import { createApp, HooksApplication } from \'@midwayjs/hooks-testing-library\';\nimport api, { post } from \'.\';\n\ndescribe(\'test new features\', () => {\n  let app: HooksApplication;\n  beforeAll(async () => {\n    app = await createApp();\n  });\n\n  afterAll(async () => {\n    await app.close();\n  });\n\n  it(\'runFunction\', async () => {\n    expect(await app.runFunction(api)).toMatchInlineSnapshot(`\n      Object {\n        "message": "Hello World",\n        "method": "GET",\n      }\n    `);\n    expect(await app.runFunction(post, \'Jake\')).toMatchInlineSnapshot(`\n      Object {\n        "method": "POST",\n        "name": "Jake",\n      }\n    `);\n  });\n\n  it(\'request\', async () => {\n    const response = await app.request(api).expect(200);\n    expect(response.body).toMatchInlineSnapshot(`\n      Object {\n        "message": "Hello World",\n        "method": "GET",\n      }\n    `);\n  });\n});\n',
    },
    'src/apis/lambda/index.ts': {
      content:
        "import { useContext } from '@midwayjs/hooks';\nimport { Context } from '@midwayjs/koa';\n\nfunction useKoaContext() {\n  return useContext<Context>();\n}\n\nexport default async () => {\n  return {\n    message: 'Hello World',\n    method: useKoaContext().method,\n  };\n};\n\nexport const post = async (name: string) => {\n  return { method: 'POST', name };\n};\n",
    },
  },
}
