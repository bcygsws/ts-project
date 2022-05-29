function updateTodo(myTodo, updateTodo) {
    return { myTodo: myTodo, updateTodo: updateTodo };
}
var my_ts1 = {
    // a:3,// 通过工具类变成可选属性
    b: '一去紫台连朔漠',
    c: true
};
console.log(my_ts1);
var lh_test = {
    // name: '濯足洞庭望八荒',// name属性被排除掉了
    age: 14,
    gender: 'male'
};
console.log(lh_test);
// d. 扁平化交叉类型的工具类Simplify
// e. 忽略某些对象属性 Omit type Omit<T,K>=Pick<T,Exclude<keyof T,K>>
