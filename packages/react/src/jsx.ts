// jsx 或者 React.createElement
// 执行的返回结果被称为 reactElement 的数组结构

import { REACT_ELEMENT_TYPE } from 'shared/ReactSmybols';
import { Type, Key, Ref, Props, ReactElementType, ElementType } from 'shared/ReactTypes';
// 定义 reactElement 构造函数
const reactElement = function (type: Type, key: Key, ref: Ref, props: Props): ReactElementType {
    // 定义一个reactElement
    const element = {
        // 内部使用的字段
        // 区分这种数据结构是否为 reactElement
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref,
        props,
        // 区分我们使用的 reactElement 和真实的 reactElement
        __mark: 'isReactElement'
    };

    return element;
};

// 实现 jsx 方法

// 参数: type: 元素类型 (div) config: props配置 {} (id 类名)   maybeChildren?: 子元素
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
    // 在 config 中 需要注意 key 和 ref 参数 
    let key: Key = null; // 默认为 null; 
    const props: Props = {};
    let ref: Ref = null; // 默认为 null;

    // 遍历 config 
    // 把每个 prop 赋值给 props
    for (const prop in config) {
        const val = config[prop];
        // 单独处理 key 
        if (prop === 'key') {
            if (val !== undefined) {
                key = '' + val;
            }
            // if 为 true 时,结束当前迭代
            continue;
        }
        // ref
        if (prop === 'ref') {
            if (val !== undefined) {
                ref = val;
            }
            continue;
        }
        // 判断是不是 config 自己的 prototype 而不是原型上的 prototype
        // hasOwnProperty 表示对象自有属性中(而不是继承属性)是否具有指定属性, 返回 true 或 false
        if ({}.hasOwnProperty.call(config, prop)) {
            // 如果是 config 自己的 prototype 就赋值给 props
            props[prop] = val;
        }
    }

    // 处理 maybeChildren
    const maybeChildrenLength = maybeChildren.length;

    // 如果有 children
    if (maybeChildrenLength) {
        // 长度为 1 或者大于 1 
        if (maybeChildrenLength === 1) {
            // 等于 1 时
            props.children = maybeChildren[0];
        } else {
            // 大于 1 时
            props.children = maybeChildren;
        }
    }
    // 返回一个新的 reactELement
    return reactElement(type, key, ref, props);
}

// 最后导出一个 jsxDEV 
// 开发环境和生产环境 jsx 以及 jsxDEV 是两个不同的实现
// 这是因为在开发环境可以多做一些额外的检查
export const jsxDEV = (type: ElementType, config: any) => {
    // 在 config 中 需要注意 key 和 ref 参数 
    let key: Key = null; // 默认为 null; 
    const props: Props = {};
    let ref: Ref = null; // 默认为 null;

    // 遍历 config 
    // 把每个 prop 赋值给 props
    for (const prop in config) {
        const val = config[prop];
        // 单独处理 key 
        if (prop === 'key') {
            if (val !== undefined) {
                key = '' + val;
            }
            // if 为 true 时,结束当前迭代
            continue;
        }
        // ref
        if (prop === 'ref') {
            if (val !== undefined) {
                ref = val;
            }
            continue;
        }
        // 判断是不是 config 自己的 prototype 而不是原型上的 prototype
        // hasOwnProperty 表示对象自有属性中(而不是继承属性)是否具有指定属性, 返回 true 或 false
        if ({}.hasOwnProperty.call(config, prop)) {
            // 如果是 config 自己的 prototype 就赋值给 props
            props[prop] = val;
        }
    }

    // 返回一个新的 reactELement
    return reactElement(type, key, ref, props);
}