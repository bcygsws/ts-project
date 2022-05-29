// 可选属性工具类
// 其他工具类：必选、排除
// https://juejin.cn/post/7064807731177193480
type Partial<T> = {
    [P in keyof T]?: T[P];
}