# Math 常用方法

| 方法                                    | 说明                                         | 返回值                           |
| --------------------------------------- | -------------------------------------------- | -------------------------------- |
| `public static abs(x)`                  | 返回参数 `x` 的绝对值                        | `int`、`long`、`float`、`double` |
| `public static ceil(double x)`          | 返回不小于参数 `x` 的最小整数值              | `double`                         |
| `public static floor(double x)`         | 返回不大于参数 `x` 的最大整数值              | `double`                         |
| `public static round(x)`                | 返回参数 `x` 的四舍五入值                    | `int`、`long`                    |
| `public static max(x, y)`               | 返回参数 `x` 和 `y` 中的较大值               | `int`、`long`、`float`、`double` |
| `public static min(x, y)`               | 返回参数 `x` 和 `y` 中的较小值               | `int`、`long`、`float`、`double` |
| `public static sqrt(double x)`          | 返回参数 `x` 的平方根                        | `double`                         |
| `public static pow(double x, double y)` | 返回 `x` 的 `y` 次幂                         | `double`                         |
| `public static random()`                | 返回一个大于等于 `0.0` 且小于 `1.0` 的随机数 | `double`                         |

```java
public final class Math {
    public static double abs(double a);
    public static float abs(float a);
    public static int abs(int a);
    public static long abs(long a);

    public static double ceil(double a);

    public static double floor(double a);

    public static long round(double a);
    public static int round(float a);

    public static double max(double a, double b);
    public static float max(float a, float b);
    public static int max(int a, int b);
    public static long max(long a, long b);

    public static double min(double a, double b);
    public static float min(float a, float b);
    public static int min(int a, int b);
    public static long min(long a, long b);

    public static double sqrt(double a);

    public static double pow(double a, double b);

    public static double random();
}
```

```java
// 使用
double num = Math.random();
System.out.println(num);
```

