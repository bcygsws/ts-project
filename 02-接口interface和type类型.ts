/*
*
* @ 接口interface和type类型的作用
*
* 参考文档：https://blog.csdn.net/qq_43033748/article/details/121468329?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7EPayColumn-1-121468329-blog-124185072.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7EPayColumn-1-121468329-blog-124185072.pc_relevant_default&utm_relevant_index=1
* 参考文档2：https://blog.csdn.net/weixin_46831501/article/details/124185072
*
*
* */
// interface和type都是用来定义类型的，区别：
// 1.接口名称可以重复,而type类型,定义类型的别名,名称不能重复
interface IName {
    name: string;
}

interface IName {
    age: number;
}

// 等价于
// interface IName {
//     name: string;
//     age: number;
// }

type T1 = {
    name: string;
    age: number;
}
// TS2300: Duplicate identifier 'T1'.
// type T1 = {
//     name: string;
//     age: number;
//     gender: string;
// }

// 2.相同点,都可以描述一个对象或者函数,但是type可以描述基本类型别名、联合类型、元组类型等
// 描述基本类型
type baseType = string;

interface Apple {
    name: string;
    eat: () => void;
}

interface Orange {
    name: string;
    eat: () => void;
}

interface Banana {
    name: string;
    eat: () => void;
}

// type声明联合类型
type TUnion = Apple | Orange | Banana;
// type声明元组类型
type TList = [Apple, Orange, Banana];// 元祖类型，严格规定了类型的顺序，而联合类型是多选一，不关注顺序

// 3.type类型定义中可以使用in关键字,而接口interface中不可以使用
type Keys = 'firstname' | 'lastname';// 定义的是键名，联合类型的形式
type TName = {
    [Key in Keys]: string;
}
const test: TName = {
    firstname: '张',
    lastname: '三丰'
};
console.log(test);// {firstname: '张', lastname: '三丰'}

// 4.导出方式不同，type必须先定义类型，之后导出类型变量；而interface定义时可以导出
type TPerson = {
    name: string;
    age: number;
    gender: string;
}
// export {TPerson};
// 定义接口时可以同步导出，但是type不行；必须分两步，完成定义，单独导出
// export default interface IPerson {
//     name: string;
//     age: number;
//     gender: string;
//
// }
// 5.扩展方式不同
// interface和java中一样,本质上是类,类就可以继承,ts中接口的扩展要使用extends
interface IFat {
    name: string;
    age: number;
};

// 接口中扩展使用extends关键字
interface ISon extends IFat {
    sex: string;
}

const i1: ISon = {
    name: '请始皇',
    age: 50,
    sex: '男'
};
console.log(i1);// {name: '请始皇', age: 50, sex: '男'}

// type中扩展使用扩展符号&
type TAnimal = {
    name: string;
    age: number;
} & { isOld: boolean };
const ts1: TAnimal = {
    name: '小狗',
    age: 3,
    isOld: false
};
console.log(ts1);// {name: '小狗', age: 3, isOld: false}

