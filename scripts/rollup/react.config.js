// react 包的打包工具

import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils.js';

// 引入 rollup-plugin-generate-package-json 插件 用于打包后自动生成 package.json 文件
import generatePackageJson from 'rollup-plugin-generate-package-json';
// 这里可以获取到 react 文件目录下的 package.json 文件
const { name, module } = getPackageJSON('react');
// react包的路径
const pkgPath = resolvePkgPath(name);
// react产物路径
const pkgDistPath = resolvePkgPath(name, true)


export default [
    // react
    {
        // 输入
        input: `${pkgPath}/${module}`,
        // 输出
        output: {
            file: `${pkgDistPath}/index.js`,
            name: 'index.js',
            // 模块类型 采用兼容 commonJS 和 ESM 的格式
            format: 'umd'
        },
        // 插件
        plugins: [...getBaseRollupPlugins(), generatePackageJson({
            // 输入文件
            inputFolder: pkgPath,
            // 输出文件
            outputFolder: pkgDistPath,
            // 自定义 package.json 字段
            baseContents: ({
                name,
                description,
                version
            }) => ({
                name,
                description,
                version,
                // 
                main: 'index.js'
            })
        })],
    },
    // jsx-runtime
    {
        input: `${pkgPath}/src/jsx.ts`,
        output: [
            // jsx-runtime
            {
                file: `${pkgDistPath}/jsx-runtime.js`,
                name: 'jsx-runtime.js',
                format: 'umd',
                
            },
            // jsx-dev-runtime
            {
                file: `${pkgDistPath}/jsx-dev-runtime.js`,
                name: 'jsx-dev-runtime.js',
                format: 'umd'
            }
        ],
        // 插件
        plugins: getBaseRollupPlugins(),
    }
]