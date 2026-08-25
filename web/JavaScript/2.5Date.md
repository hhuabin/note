[MDN Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date "MDN")

时间戳是指从 **UTC 1970-01-01 00:00:00** 开始计算的秒数（或毫秒数），无论你身处哪个时区，**同一时刻**的时间戳都是相同的。



# 构造函数 DateConstructor

```typescript
interface DateConstructor {
    new(): Date;
    
    new(value: number | string): Date;
    
    new(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): Date;
    
    // 返回 1970-1-1 0:0:0 距离指定时间的毫秒数，参数会被当成 UTC（中时区） 时间
    UTC(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): number;
    
    // 返回 1970-1-1 0:0:0 距离现在的毫秒数
	now(): number;
}

const date = new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
const birthday = new Date(1995, 11, 17, 3, 24, 0);
```



## 创建日期

```javascript
new Date()    // -> Date        // 新建当前时区时间

Date.UTC(1970, 0, 1, 0, 0, 0)    // -> 0 number         月份从0开始

Date.now()    // -> 1694053979134 number
```



# Date

```typescript
interface Date {
    
    // 方法返回一个字符串，以本地的时区表示该 Date 对象。
    toString(): string;
    
    // 方法把一个日期转换为一个字符串，使用 UTC 时区
    toUTCString(): string;

    // 方法返回一个时间的格林威治时间数值
    getTime(): number;

    // 方法根据本地时间返回指定日期的年份
    getFullYear(): number;

    // 以世界时为标准，返回一个指定的日期对象的年份
    getUTCFullYear(): number;

    // 方法根据本地时间，返回一个指定的日期对象的月份，为基于 0 的值（0 表示一年中的第一月）
    getMonth(): number;

    // 方法以世界时为标准，返回一个指定的日期对象的月份，它是从 0 开始计数的（0 代表一年的第一个月）
    getUTCMonth(): number;

    // 根据本地时间，返回一个指定的日期对象为一个月中的哪一日
    getDate(): number;

    // 方法以世界时为标准，返回一个指定的日期对象为一个月中的第几天
    getUTCDate(): number;

    // 方法根据本地时间，返回一个具体日期中一周的第几天，0 表示星期天
    getDay(): number;

    // 方法以世界时为标准，返回一个指定的日期对象为一星期中的第几天，其中 0 代表星期天
    getUTCDay(): number;

    // 方法根据本地时间，返回一个指定的日期对象的小时
    getHours(): number;

    // 方法以世界时为标准，返回一个指定的日期对象的小时数
    getUTCHours(): number;

    // 方法根据本地时间，返回一个指定的日期对象的分钟数
    getMinutes(): number;

    // 方法以世界时为标准，返回一个指定的日期对象的分钟数
    getUTCMinutes(): number;

    // 方法根据本地时间，返回一个指定的日期对象的秒数
    getSeconds(): number;

    // 方法以世界时为标准，返回一个指定的日期对象的秒数
    getUTCSeconds(): number;

    // 方法根据本地时间，返回一个指定的日期对象的毫秒数
    getMilliseconds(): number;

    // 方法以世界时为标准，返回一个指定的日期对象的毫秒数
    getUTCMilliseconds(): number;
    
    // 方法返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟
    getTimezoneOffset(): number;
    
}
```



日期格式化函数

```javascript
const dataFormat = () => {
	const date = new Date()
	const year = date.getFullYear()
	const month = addLeftZero((date.getMonth() + 1) + '')
	const day = addLeftZero(date.getDate() + '')
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	console.log(year * 10000000000 + month * 100000000 + day * 1000000 + hour * 10000 + minute * 100 + second);

	return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second)
}

// 给左边加 0
const addLeftZero = (str: string): string => {
	return ("00" + str).substring(str.length);
}
```

