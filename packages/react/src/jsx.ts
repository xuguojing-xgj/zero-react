// 返回结果为 reactElement 的数组结构
import { REACT_ELEMENT_TYPE } from '../shared/ReactSymbols';
import { Type, Ref, Key, Props, ReactElement , ElementType} from '../shared/ReactTypes';


// 定义 reactElement 构造函数

const reactElement = function (type: Type, key: Key, ref: Ref, props: Props) : ReactElement {
    // 定义 
    const element = {
        // 区分数据结构 是否是一个reactElement (内部使用) 指定我们当前的数据结构是 reactElement
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref,
        props,
        // 区分 我们正在使用的 reactElement 和 真实项目中的 reactElement 定义新的字段
        __mark: 'isReact',
    }

    return element;
}


// 实现 jsx 方法

export const jsx = () => {}