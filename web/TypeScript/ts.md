# 函数默认值

```javascript
// 默认值
// 默认值可以让你在属性为 undefined 时使用缺省值：
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}
// 现在，即使 b 为 undefined ， keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值。
```



# 接口和类型别名(联合类型)

类型别名可以像接口一样；然而，仍有一些细微差别。

1. 其一，接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字—比如，错误信息就不会使用别名。 在下面的示例代码里，在编译器中将鼠标悬停在`interfaced`上，显示它返回的是`Interface`，但悬停在`aliased`上时，显示的却是对象字面量类型。

```javascript
type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
```

2. 另一个重要区别是类型别名不能被`extends`和`implements`（自己也不能`extends`和`implements`其它类型）。 因为**软件中的对象应该对于扩展是开放的，但是对于修改是封闭的**，你应该尽量去使用接口代替类型别名。
3. 另一方面，如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。



# export = 和 import = require() （不推荐使用）

若要导入一个使用了`export =`的模块时，必须使用TypeScript提供的特定语法

`import module = require("module")`。



# reference

用于声明文件间的依赖，告诉编译器在编译过程中要引入的额外的文件。

- /// <reference types="..." />与 /// <reference path="..." /> 指令相似，这个指令是用来声明依赖的； 一个 /// <reference types="..." /> 指令则声明了对某个包的依赖。

- /// <reference types="node" /> 引入到声明文件，表明这个文件使用了 @types/node/index.d.ts

