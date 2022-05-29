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
function combineBoth() {
    var result = {
        a: 1,
        b: 2,
        c: 4
    };
    return result;
}
// 调用函数
console.log(combineBoth());
// 二.联合类型,形参a,b的类型都是string和number之中二选一
function add(a, b) {
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
function printTime(a) {
    if (a instanceof Date) {
        console.log(a.toDateString());
    }
    else if (a instanceof String) {
        console.log(a.toString());
    }
}
printTime(new Date());
printTime(new String('2012/3/12'));
// 2.2 实现签名
function plusOrCombine(a, b) {
    if (typeof a === 'string' && typeof b === 'string') { // 两个参数都为字符串，字符串拼接
        return a + b;
    }
    if (typeof a === 'number' && typeof b === 'number') { // 两个参数都为数值，数值相加
        return a + b;
    }
}
console.log(plusOrCombine(2, 4));
console.log(plusOrCombine('张翰', '李军'));
var GetArea = /** @class */ (function () {
    function GetArea(objParams, _height) {
        if (_height === void 0) { _height = 0; }
        if (typeof objParams === 'object') {
            var width = objParams.width, height = objParams.height;
            this.width = width;
            this.height = height;
        }
        else {
            this.width = objParams;
            this.height = _height;
        }
    }
    GetArea.prototype.getArea = function () {
        // 计算矩形面积
        return this.width * this.height;
    };
    return GetArea;
}());
// 构造器重载，不论是在定义签名和实现签名时，都不用管理返回值；原因是：在赋值给a1 a2之前，已经完成了构造的调用，并为成员变量width
// 和height赋值
var a1 = new GetArea(4, 3);
console.log(a1.getArea());
var a2 = new GetArea({ width: 45, height: 2 });
console.log(a2.getArea());
var myStr = {
    first: '1',
    second: '2',
    third: '3',
    fourth: '4',
    fifth: '5'
};
console.log(myStr);
// 上述代码的switch分支中没有对default进行处理，default那里抛出异常时，返回值是never
function dealError(s) {
    throw new Error('Unexpected object\t:' + s);
}
function area(s) {
    switch (s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.width * s.height;
        case "circle":
            return Math.PI * Math.pow(s.r, 2);
        default:
            return dealError(s);
    }
}
var cat = {
    kind: 'rectangle',
    width: 4,
    height: 5
};
console.log(cat.kind + ":" + area(cat)); // 长方形面积20
// 完整性检查测试
// console.log(area({kind: "triangle", a: 1, b: 2}));
// 六、完整性检查
// // 上述代码的switch分支中没有对default进行处理，default那里抛出异常时，返回值是never
// function dealError(s: never): never {
//     throw new Error('Unexpected object\t:' + s);
//
// }
