interface Todo {
    name: string;
    age: number;
    gender: string;
}

// 将一个接口类中的某些属性单独拿出来，组成一个新的类型
type NewTodo = Pick<Todo, "name" | "age">;
const new_todo: NewTodo = {
    name: '张衡',
    age: 55
};
console.log(new_todo);

// 上面选择了几个键，组成了一个新的类型；那么如何捡起某种类型名称，如：string,生成一个新类型呢？使用ConditionalPick
interface Example {
    a: string;
    b: string | number;
    c: () => void;
    d: {}
}

// 如何自定义一个工具类型ConditionalPick呢？
// 断句：[K in keyof V as V[K] extends T ? K
// : never]: V[K];
// 遍历到那个键值类型，返回这个键K,没有遍历到返回一个never
// 类型泛型中的参数遍历
type ConditionalPick<V, T> = {
    [K in keyof V as V[K] extends T ? K : never]: V[K];
}
type newExample = ConditionalPick<Example, string>;
const _myPick: newExample = {
    a: "张无忌"
};
console.log(_myPick);// 打印 {a:'张无忌'}

