# 项目 ts-project

## 项目构建(ts项目自动编译)

-   创建项目根目录 ts-project
-   在根路径下，生成配置文件，命令$:tsc --init
-   打开 tsconfig.json,修改配置文件，包括 target、outDir、strict 等选项，按需要修改
-   新建 index.html 文件，引入 a.js(假设：创建的 ts 文件名为 a.ts,ts 文件不能直接引入到 index.html 文件中)
-   项目目录下，选中配置文件 tsconfig.json，终端-运行任务-tsc 监视：项目文件；或者使用命令$:tsc -p tsconfig.json --watch ;用以启动项目的自动编译

## 项目运行

-   运行 index.html,可以使用 live server 打开

## 目标

### 结合该项目，演练 ts 的工具类的书写

-   [参考文档 1](https://juejin.cn/post/7064807731177193480)
-   [参考文档 2](https://juejin.cn/post/7009046640308781063)
-   [参考文档 3](https://github.com/semlinker/awesome-typescript/issues/24)
