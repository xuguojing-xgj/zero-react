/* eslint-disable @typescript-eslint/no-explicit-any */
// 定义类型
export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ElementType = any;

// ReactElement 类型定义
export interface ReactElement {
    $$typeof: symbol | number;
    type: ElementType;
    key: Key;
    ref: Ref;
    props: Props;
    __mark: string;
}
