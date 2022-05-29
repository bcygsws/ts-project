var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// function makeCustomers<T extends User>(u: T): T {
//     // 报错： '{ id: number; kind: string; }' is assignable to the constraint of type 'T'
//     // T extends User T是子类，返回的对象是父类，子类T是不能当做返回父对象的返回值的
//     return {
//         id: u.id,
//         kind: 'custom'
//     }
// }
// 方法1：改变返回值的类型，T改成User
// function makeCustomers<T extends User>(u: T): User {
//     // 报错： '{ id: number; kind: string; }' is assignable to the constraint of type 'T'
//     // T extends User T是子类，返回的对象是父类，子类T是不能当做返回父对象的返回值的
//     return {
//         id: u.id,
//         kind: 'custom'
//     }
// }
// 方法2：让return的返回值兼容T
function makeCustomers(u) {
    // 报错： '{ id: number; kind: string; }' is assignable to the constraint of type 'T'
    // T extends User T是子类，返回的对象是父类，子类T是不能当做返回父对象的返回值的
    return __assign(__assign({}, u), { id: u.id, kind: 'custom' });
}
// b.实现签名
function f(a, b) {
    if (typeof a === 'string' && typeof b === 'string') {
        return a + '' + b;
    }
    else {
        // 当a b 都为number ，可以使用else if()分支，也可以使用类型断言，将a和b都断言为number
        return a + b;
    }
}
f(2, 3); // Ok
// f(1, 'a'); // Error No overload matches this call.
// f('a', 2); // Error No overload matches this call.
f('a', 'b'); // Ok
