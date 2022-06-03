function getLen(val: string | number) {
	// 当不确定传入值的类型时，使用联合类型
	// 断言为string，两种方式：1.<类型>val 2.as方式
	// let val1=<string>val;
	let val1 = val as string;
	if (val1.length) {
		// any类型“string | number”上不存在属性“length”。类型“number”上不存在属性“length”。ts(2339)
		return val1.length;
	} else {
		return val1.toString().length;
	}
}
// 调用函数getLen
console.log(getLen('abcde'));// 字符串abcde的长度是5
console.log(getLen(45));// 数字45的位数是2
