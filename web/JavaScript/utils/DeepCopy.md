# 深复制

1. **递归方法**

   ```typescript
   const deepCopy = <T>(obj: T): T => {
       if (obj === null || typeof obj !== 'object') {
           return obj
       }
   
       const copy = (Array.isArray(obj) ? [] : {}) as T
   
       for (const key in obj) {
           // 判断是否是对象本身的属性而不是继承属性，如 toString() 等
           if (obj.hasOwnProperty(key)) {
               copy[key] = deepCopy(obj[key])
           }
       }
   
       return copy
   }
   ```

2. **JSON方法：**

   缺点：

   1. **无法复制函数、正则表达式和特殊对象**
   2. **循环引用问题**
   3. **性能问题**
   4. **丢失对象的原型链信息**

   ```typescript
   const deepCopyWithJSON = <T>(obj: T): T => {
   
       return JSON.parse(JSON.stringify(obj));
   
   }
   ```





```typescript
export default class DeepCopy {

    /**
     * 优点：可以处理更复杂的数据结构，如嵌套对象、数组、Date、RegExp 等。
     *       不会丢失非 JSON 数据类型（例如函数、undefined 等）
     * 缺点：实现起来较复杂，容易出错，特别是处理循环引用和其他边缘情况时需要额外逻辑
     */
    /**
     * 循环递归深复制函数
     * @param { T } obj
     * @returns { T }
     */
    public static deepCopy = <T>(obj: T): T => {
        if (obj === null || typeof obj !== 'object') {
            return obj
        }

        const copy = (Array.isArray(obj) ? [] : {}) as T

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                copy[key] = DeepCopy.deepCopy(obj[key])
            }
        }

        return copy
    }

    /**
     * 优点：速度更快，处理简单数据类型
     * 缺点：不支持函数、undefined、Date、RegExp 等特殊对象。使用 JSON.stringify() 会丢失这些值
     */
    /**
     * JSON转换深复制函数
     * @param { T } obj
     * @returns { T }
     */
    public static deepCopyWithJSON = <T>(obj: T): T => {

        return JSON.parse(JSON.stringify(obj))

    }
}

```



