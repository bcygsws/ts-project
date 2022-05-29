// 题1：关于type和泛型的继承
type User = {
    id: number;
    kind: string;
}

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
function makeCustomers<T extends User>(u: T): T {
    // 报错： '{ id: number; kind: string; }' is assignable to the constraint of type 'T'
    // T extends User T是子类，返回的对象是父类，子类T是不能当做返回父对象的返回值的
    return {
        ...u,
        id: u.id,
        kind: 'custom'
    }
}

// 题2：关于函数重载
// 功能：要求a,b的类型一致；当a,b类型不一致，函数调用时报错
// function f(a: string | number, b: string | number) {
//     if (typeof a === 'string') {
//         return a + ':' + b; // no error but b can be number!
//     } else {
//         return a + b; // error as b can be number | string
//     }
// }

// 函数重载来实现：声明重载签名，然后 实现签名
// a.声明重载签名
function f(a: string, b: string);
function f(a: number, b: number);
// b.实现签名
function f(a: string | number, b: string | number) {
    if (typeof a === 'string' && typeof b === 'string') {
        return a + '' + b;
    } else {
        // 当a b 都为number ，可以使用else if()分支，也可以使用类型断言，将a和b都断言为number
        return (a as number) + (b as number);
    }
}

f(2, 3); // Ok
// f(1, 'a'); // Error No overload matches this call.
// f('a', 2); // Error No overload matches this call.
f('a', 'b'); // Ok



