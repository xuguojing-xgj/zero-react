// 为什么定义成 ReactSymbols 文件 不希望 reactElement 被滥用;
// 每个从 Symbol() 返回的 symbol 值都是唯一的。一个 symbol 值能作为对象属性的标识符；这是该数据类型仅有的目的。


// Symbol.for(key) 方法会根据给定的键 key，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，
// 否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。

// 我们通过 Symbol 是否为 function 以及 Symbol.for 是否存在来判断
// 在使用 symbol 之前 我们要判断当前的宿主环境支不支持 symbol 

const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// 如果支持
// 我们返回 REACT_ELEMENT_TYPE 通过 Symbol.for 创建一个独一无二的值 否则 通过一个数字表示

export const REACT_ELEMENT_TYPE = supportSymbol ? Symbol.for('react.element') : 0xeac7;