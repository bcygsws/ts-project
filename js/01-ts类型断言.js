/**
 *
 * @ 类型断言
 * 参考文档：
 * https://blog.csdn.net/weixin_41387874/article/details/123606875
 * https://blog.csdn.net/weixin_59306092/article/details/122683654?spm=1001.2101.3001.6650.13&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-13-122683654-blog-123606875.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-13-122683654-blog-123606875.pc_relevant_default&utm_relevant_index=17
 * https://blog.csdn.net/weixin_49343253/article/details/123394239?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-123394239-blog-121498772.pc_relevant_antiscanv4&spm=1001.2101.3001.4242.1&utm_relevant_index=3
 *
 *
 * 1.类型断言的作用
 * 类型断言是用于实现【覆盖编译器推断的类型】
 * 也就是，我们比编译器更了解变量需要什么样的类型，编译器不应该继续报错
 *
 * 2.类型断言和类型转换的区别
 * 类型断言发生在编译时，类型转换发生在运行时
 *
 *
 * 3.双重断言：
 * S类型和T类型相互兼容的情况下，使用双重断言
 * 判断是否使用双重断言？
 * a.如果S是T的子类型？或者T是S的子类型，就不要使用双重断言，单个断言就能解决
 * b.还有一种方法，如果使用单个断言编译器报错，说明ST类型和T类型互不兼容，需要使用双重断言
 *
 * 类型断言的两种方式：
 * 尖括号或者as 类型
 * <string> val
 * val as string
 * 注意：在jsx文件中，只支持as的写法
 *
 *
 */
function getLen(val) {
    // 当不确定传入值的类型时，使用联合类型
    // 断言为string，两种方式：1.<类型>val 2.as方式
    // let val1=<string>val;
    var val1 = val;
    if (val1.length) {
        // any类型“string | number”上不存在属性“length”。类型“number”上不存在属性“length”。ts(2339)
        return val1.length;
    }
    else {
        return val1.toString().length;
    }
}
// 调用函数getLen
console.log(getLen('abcde')); // 字符串abcde的长度是5
console.log(getLen(45)); // 数字45的位数是2
var myObj = {};
console.log(myObj);
myObj.a = '张三影';
myObj.b = 5;
console.log(myObj);
// 3.双重断言
// 当想将S类型的断言为T类型，是S类型和T类型相互兼容的情况，使用双重断言
function handle(event) {
    // S：any T:HTMLElement ,S类型断言为T类型，any断言为HTMLElement
    var element = event;
}
//  如何确定是否需要 【双重断言】
// 如果T是S的子类型或者S是T的值类型，那么就不要双重断言，单个断言就足够解决问题
// 还有一种方法是让编译器帮助我们，当我们使用单个断言而编译器报错的时候，就说明S类型和T类型
// 并不互相兼容(使得其兼容)，需要使用双重断言
