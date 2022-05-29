/*
*
* 题3：ts内置的工具类型，将某个类型里的属性全部变为可选属性
* 1.Partial工具类可以将所有属性变成可选
* 2.那么如何将指定的属性变成可选呢？
*
* */
interface MyTodo {
    title: string;
    description: string;
}

function updateTodo(myTodo: MyTodo, updateTodo: Partial<MyTodo>) {
    return {myTodo, updateTodo}
}

// lie.es5.td.ts文件
// 中单独抽离出工具类Partial<T>
// type Partial<T> ={
//     [P in keyof T]?:T[P];
// }

// 进一步,如何给指定的属性变成可选的呢？


type Foo = {
    a: number;
    b?: string;
    c: boolean;
}
// 定义Simplify工具类，将交叉类型进行扁平化处理
type Simplify1<T> = {
    [S in keyof T]: T[S];
}
// 定义Partial工具类将所有的属性，变成可选属性,避免重复键，将Partial名称改为Partial1
type Partial1<T> = {
    [P in keyof T]?: T[P];
};
// 定义排除某项属性的工具类Exclude
// 只是完成了 【把K属性排除了 这个操作】，并没有得到重新组织的对象，重新组织好的对象，他是Omit工具类
type Exclude1<T, K> = T extends K ? never : T;
// 定义获取其中几个属性，组成新的属性的Pick工具类
type Pick1<T, K extends keyof T> = {// 验证K适应于类型T
    [P in K]: T[P];// 遍历K中的P
};
// 上面两个工具类结合，组成一个排除某些属性，组成一个新类型的工具类
type Omit1<T, K> = Pick1<T, Exclude1<keyof T, K>>;
// 处理思路：
// 1.Simplify1工具类将交叉类型扁平化处理
// 2.改变的部分使用Partial1变成可选
// 3.Pick1排除工具类Pick1<T,Exclude1<keyof T,K>>

// type setOption<T, K extends keyof T> = Simplify1<Partial1<Pick1<T, K>> & Pick1<T, Exclude1<keyof T, K>>>;
// 用Omit1替换掉后面一部分
type setOption<T, K extends keyof T> = Simplify1<Partial1<Pick1<T, K>> & Omit1<T, K>>;
// 测试用例
type someOptions = setOption<Foo, "a">;
const my_ts1: someOptions = {
    // a:3,// 通过工具类变成可选属性
    b: '一去紫台连朔漠',// 本身就是可选属性
    c: true
};
console.log(my_ts1);
// 学习工具类的思路
// 基本工具类列举：https://juejin.cn/post/7064807731177193480
// 30ts面试题：https://juejin.cn/post/7009046640308781063
// github答案：https://github.com/semlinker/awesome-typescript/issues/21
// 1.储备一些基本的工具类
// a. Pick
// b. Partial
// c.Exclude
type LianHe = {
    name: string;
    age: number;
    gender: string
};

// 方法一
// type LH = Exclude1<keyof LianHe, 'name'>;// 得到的是一个新类型，"age"|"gender"
// // LH只是键名组成的联合类型，如："age"|"gender",还不能作为一个对象的对象；组织成一个对象，使用Pick工具类
// type P_LH = Pick1<LianHe, LH>;
// 方法二
type P_LH = Omit1<LianHe, 'name'>;
const lh_test: P_LH = {
    // name: '濯足洞庭望八荒',// name属性被排除掉了
    age: 14,
    gender: 'male'
};
console.log(lh_test);
// d. 扁平化交叉类型的工具类Simplify
// e. 忽略某些对象属性 Omit type Omit<T,K>=Pick<T,Exclude<keyof T,K>>