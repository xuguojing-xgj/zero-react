-   react (宿主环境无关的公用方法)
    -   package.josn 描述
    // "main": "index.js", main 对应的是common js 规范 我们这里使用的是 mono repo 支持原生的 es module 的 对应 module 字段
    // "scripts": {
    //     "test": "echo \"Error: no test specified\" && exit 1"
    // },

    -   shared
        -   package.json 描述
        // "main": "index.js", 不要入口文件 因为 shared 文件中的方法会在其他文件中被引用