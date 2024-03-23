import path from 'path';

// 处理文件的读写
import fs from 'fs';

// 将源码中的 ts 转义为 js
import ts from 'rollup-plugin-typescript2';
// 解析 commonjs 规范
import cjs from '@rollup/plugin-commonjs';

// 指定包路径
const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

console.log('pkgPath',pkgPath)

console.log('distPath', distPath)
// 解析 package.json 文件

// 路径(两种)

// 1. 源码路径
// 2. 打包后的文件路径

export function resolvePkgPath(pkgName, isDist) {
    if (isDist) {
        // 示例: dist/node_modules/react
        return `${distPath}/${pkgName}`
    }
    // 示例: package/react 
    return `${pkgPath}/${pkgName}`
}

// 获取包名
export function getPackageJSON(pkgName) {
    // ...包路径
    const path = `${resolvePkgPath(pkgName)}/package.json`;

    const str = fs.readFileSync(path, { encoding: 'utf-8' });

    return JSON.parse(str);
}

// 公用 plugins

export function getBaseRollupPlugins({ typescript = {} } = {}) {
    // 先解析 cjs 规范, 之后解析 ts 
    return [cjs(), ts(typescript)]
}
