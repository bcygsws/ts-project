/*
*
* ts中的高级类型：
* TS 文档是有一章叫高级类型，其实并不是真的“高级”，他实际的意思是将普通的类型用“某种方式”组合起来形成一个“组合类型”，
* 这个组合类型叫高级类型。对于这种组合后的类型可以有一些特殊的操作
* https://blog.csdn.net/weixin_39895684/article/details/111166486?spm=1001.2101.3001.6650.9&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-9-111166486-blog-124185072.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-9-111166486-blog-124185072.pc_relevant_default&utm_relevant_index=13
* @ TS中的高级类型
* 1.交叉类型
* 2.联合类型
* 3.类型保护区分类型typeof/自定义保护instance
* 4.字符串字面量
* 5.可辨识联合
* 6.完整性检查
*
*
* */

// 一.交叉类型
interface First {
    a: number;
    b: number;
}

interface Second {
    a: number;
    c: number;
}

function combineBoth(): First & Second {
    const result = {
        a: 1,
        b: 2,
        c: 4
    }
    return result;
}

// 调用函数
console.log(combineBoth());

// 二.联合类型,形参a,b的类型都是string和number之中二选一
function add(a: string | number, b: string | number) {
    // do something
}

// 三.类型保护和区分类型
// function plusOrCombine(a: string | number, b: string | number) {
//     if (typeof a === "string" && typeof b === "string") {
//         return a + b;
//     } else if (typeof a === "number" && typeof b === "number") {
//         return a + b;
//     }
// }
//
// // 函数调用测试
// console.log(plusOrCombine(2, 4));
// console.log(plusOrCombine('张翰', '李军'));

// 自定义保护
// typeof虽然能够判断类型,但是对于数组、对象等typeof都判别为object,无法具体知道它到底属于哪一种类型？
// 这就引入了instanceof

// 案例：传入一个Date对象或者String对象,打印时间
function printTime(a: Date|String){
    if(a instanceof Date){
        console.log(a.toDateString());
    }else if(a instanceof String){
        console.log(a.toString());
    }
}
printTime(new Date());
printTime(new String('2012/3/12'));
// 自定义函数模拟，instanceof
// interface Bird {
//     fly();
// }
//
//
// interface Fish {
//     swim();
// }
//
// // 定义一个判断是否是Fish对象的方法
// function isFish(pet: Fish | Bird): pet is Fish {
//     // Fish|Bird联合类型中没有swim属性
//     return (pet).swim !== undefined;
// }
//
// let pet1: Fish = {
//     swim() {
//         console.log('鱼儿在游泳……');
//     }
// }
// let pet2: Bird = {
//     fly() {
//         console.log('小鸟在天上飞……');
//     }
// }
//
// // 是鱼以后，做一些事情
// function doSth(pet: Fish | Bird) {
//     if (isFish(pet)) {
//         pet.swim()
//     } else {
//         pet.fly();
//     }
// }
//
// doSth(pet1);
// doSth(pet2)
// ----------分割线----------
// 问：如果函数plusOrCombine()传入的参数,一个是字符一个是数值,仍然需要分支判断？
// 答：使用函数重载来解决这个问题

// 1.参考文档
// 函数重载：https://www.jianshu.com/p/c1f6db65f95b
// 函数重载和构造器重载：https://blog.csdn.net/qq_39970857/article/details/120949349

// 一个或多个签名组合叫做函数重载
// 2.函数重载的示例

// 2.1 声明签名-先声明重载的所有可能情况，但不包括函数体
function plusOrCombine(a: string, b: string): string;
function plusOrCombine(a: number, b: number): number;
// 2.2 实现签名
function plusOrCombine(a: string | number, b: string | number) {
    if (typeof a === 'string' && typeof b === 'string') {// 两个参数都为字符串，字符串拼接
        return a + b;
    }
    if (typeof a === 'number' && typeof b === 'number') {// 两个参数都为数值，数值相加
        return a + b;
    }
}

console.log(plusOrCombine(2, 4));
console.log(plusOrCombine('张翰', '李军'));
// 此时，传参一个字符串一个数值，就会报错：TS2769: No overload matches this call.
// 即：没有重载匹配这次调用
// console.log(plusOrCombine('张翰', 4));

// 3.构造器重载，构造器重载和函数重载基本一样。区别在于不能是定义签名和实现签名，构造器重载都不管理返回值；
// new 类()的时候，构造函数向成员属性添加属性值发生在赋值给定义的对象之前
// 需求：分别传入宽、高计算矩形面积或者传入一个对象,来计算矩形面积
// 定义类型AreaType,type定义了一个别名
type AreaType = {
    width?: number;
    height?: number;
}

class GetArea {
    width: number;
    height: number;
    // 构造器重载
    //  1.定义重载签名
    constructor(width: number, height: number);// 签名1
    constructor(obj: AreaType);// 签名2
    constructor(objParams: any, _height: number = 0) {// 此处_height最好不要使用可选参数,因为签名1中实实在在定义时传入了两个参数
        if (typeof objParams === 'object') {
            const {width, height} = objParams;
            this.width = width;
            this.height = height;
        } else {
            this.width = objParams;
            this.height = _height;
        }
    }

    getArea() {
        // 计算矩形面积
        return this.width * this.height;
    }
}

// 构造器重载，不论是在定义签名和实现签名时，都不用管理返回值；原因是：在赋值给a1 a2之前，已经完成了构造的调用，并为成员变量width
// 和height赋值
const a1 = new GetArea(4, 3);
console.log(a1.getArea());
const a2 = new GetArea({width: 45, height: 2});
console.log(a2.getArea());

// 四、字符串字面量,类似枚举或者联合类型
// 在interface和type定义类型的区别中，第三点：type中可以使用in关键字
type TString = 'first' | 'second' | 'third' | 'fourth' | 'fifth';
type test1 = {
    [key in TString]: string;
}
const myStr: test1 = {
    first: '1',
    second: '2',
    third: '3',
    fourth: '4',
    fifth: '5'
};
console.log(myStr);
// 五、可辨识联合
// 正方形接口
interface Square {
    kind: 'square';
    size: number;
}

// 长方形接口
interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
}

// 圆接口
interface Circle {
    kind: 'circle';
    r: number;
}

// 分析：上面三个接口都有kind属性，定义一个联合类型
// shapeType完成了三个接口的抽象
type ShapeType = Square | Rectangle | Circle;

// 上述代码的switch分支中没有对default进行处理，default那里抛出异常时，返回值是never
function dealError(s: never): never {
    throw new Error('Unexpected object\t:' + s);

}

function area(s: ShapeType) {
    switch (s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.width * s.height;
        case "circle":
            return Math.PI * Math.pow(s.r, 2);
        default :
            return dealError(s);
    }
}

const cat: Rectangle = {
    kind: 'rectangle',
    width: 4,
    height: 5
};
console.log(cat.kind + ":" + area(cat));// 长方形面积20

// 完整性检查测试
// console.log(area({kind: "triangle", a: 1, b: 2}));

// 六、完整性检查
// // 上述代码的switch分支中没有对default进行处理，default那里抛出异常时，返回值是never
// function dealError(s: never): never {
//     throw new Error('Unexpected object\t:' + s);
//
// }