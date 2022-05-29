/*
*
* @ 定义一个 NativeFlat 工具类型，支持把数组类型拍平（扁平化）
*
* NativeFlat 二维数组
* DeepFlat 多维数组
*
*
*
*
*
* */
type NativeFlat<T extends any[]> = {
    [P in keyof T]: T[P] extends any[] ? T[P][number] : T[P]
}[number];
// Alias for:
// NativeFlat<[["a"], ["b", "c"], ["d"], "e"]>
// Initial type:
//     ["a", ("b" | "c"), "d", "e"]
// 对象{}外再跟一个[number],取数组中的元素,变成 "a" | "b" | "c" | "d" | "e"
type GenNativeFlat = NativeFlat<[['a'], ['b', 'c'], ['d'], 'e']>;

type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepFlat<T extends any[]> = {
    [K in keyof T]: T[K] extends any[] ? DeepFlat<T[K]> : T[K];
}[number];
type GenDeepFlat = DeepFlat<Deep>;
