// 参考文档：https://github.com/semlinker/awesome-typescript/issues/23
// 完成者：github用户：junbin123
type Fn = (a: number, b: string) => number;
// 以终为始，定义一个工具类，只是添加了某个指定类型的参数，参数名称已经规定为了x
// 使用infer关键字，infer关键字可以为extends中的条件语句定义变量,供其他地方使用；infer定义了两个变量，参数值和函数的返回值
type AppendArguments<F, T> = F extends (...args: infer Args) => infer Ret ? (x: T, ...args: Args) => Ret : never;
const fb: Fn = (a: number, b: string) => {
    return a + parseInt(b);
}
// 使用定义的工具类，扩展它的参数
type newFn = AppendArguments<Fn, number>;
const fbNew: newFn = (x: number, a: number, b: string) => {
    return x + a + parseInt(b);
}
console.log(fbNew(1, 2, "4x"));// 7