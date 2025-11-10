==本章目的：解决非核心业务代码冗余问题==



# 代理

1. **代理模式**

   二十三种设计模式中的一种，属于结构型模式。它的作用就是通过提供一个**代理类**，让我们在调用目标方法的时候，不再是直接对目标方法进行调用，而是通过代理类间接调用。让不属于目标方法核心逻辑的代码从目标方法中剥离出来——解耦。调用目标方法时先调用代理对象的方法，减少对目标方法的调用和打扰，同时让附加功能能够集中在一起也有利于统一维护

2. **静态代理**

   主动创建代理类：

   ```java
   public class CalculatorImpl implements Calculator {
       @Override
       public int add(int i, int j) {
           int result = i + j;
           System.out.println("Calculator方法内部result: " + result);
           return result;
       }
   }
   
   ```

   ```java
   public class CalculatorStaticProxy implements Calculator {
       // 将被代理的目标对象声明为成员变量
       private Calculator target;
   
       public CalculatorStaticProxy(Calculator target) {
           this.target = target;
       }
   
       @Override
       public int add(int i, int j) {
           
           // 附加功能由代理类中的代理方法来实现
           System.out.println("[日志] add 方法开始了，参数是：" + i + "," + j);
           
           // 通过目标对象来实现核心业务逻辑
           int addResult = target.add(i, j);
           
           System.out.println("[日志] add 方法结束了，结果是：" + addResult);
           
           return addResult;
       }
   }
   ```

   ```java
   @Test
   public void testStaticProxy() {
       CalculatorStaticProxy calculatorStaticProxy = new CalculatorStaticProxy(new CalculatorImpl());
       calculatorStaticProxy.add(1, 2);
   }
   ```

3. **动态代理**

   动态代理技术分类
   
   - **JDK动态代理**：JDK原生的实现方式，需要被代理的目标类必须**实现接口**！他会根据目标类的接口动态生成一个代理对象！代理对象和目标对象有相同的接口！
   - **cglib**：通过继承被代理的目标类实现代理，所以**不需要目标类实现接口**！
   
   ---
   
   JDK动态代理：
   
   ```java
   public class ProxyFactory {
   
       private Object target;
       public ProxyFactory(Object target) {
           this.target = target;
       }
       public Object getProxy(){
           /**
            * newProxyInstance()：创建一个代理实例
            * 其中有三个参数：
            * 1、classLoader：加载动态生成的代理类的类加载器
            * 2、interfaces：目标对象实现的所有接口的class对象所组成的数组
            * 3、invocationHandler：设置代理对象实现目标对象方法的过程，即代理类中如何重写接口中的抽象方法
            */
           ClassLoader classLoader = target.getClass().getClassLoader();
           Class<?>[] interfaces = target.getClass().getInterfaces();
   
           InvocationHandler invocationHandler = new InvocationHandler() {
               @Override
               public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                   /**
                    * proxy：代理对象
                    * method：代理对象需要实现的方法，即其中需要重写的方法
                    * args：method所对应方法的参数
                    */
                   Object result = null;
                   try {
                       System.out.println("[动态代理][日志] "+method.getName()+"，参数："+ Arrays.toString(args));
                       result = method.invoke(target, args);
                       System.out.println("[动态代理][日志] "+method.getName()+"，结 果："+ result);
                   } catch (Exception e) {
                       e.printStackTrace();
                       System.out.println("[动态代理][日志] "+method.getName()+"，异常："+e.getMessage());
                   } finally {
                       System.out.println("[动态代理][日志] "+method.getName()+"，方法执行完毕");
                   }
                   return result;
               }
           };
   
           return Proxy.newProxyInstance(classLoader, interfaces, invocationHandler);
       }
   }
   ```
   
   ```java
   @Test
   public void testProxyFactory(){
       ProxyFactory factory = new ProxyFactory(new CalculatorImpl());
       Calculator proxy = (Calculator) factory.getProxy();
       proxy.div(1,1);
   }
   ```
   
   

# Aop

AOP（面向切面编程）是一种编程范式，它通过**将通用的横切关注点（如日志、事务、权限控制等）与业务逻辑分离，使得代码更加清晰、简洁、易于维护**。Aop是对OOP(面向对象)的补充，提供一种横向的解决办法。AOP可以应用于各种场景，以下是一些常见的AOP应用场景：

1. 日志记录：在系统中记录日志是非常重要的，可以使用AOP来实现日志记录的功能，可以在方法执行前、执行后或异常抛出时记录日志。
2. 事务处理：在数据库操作中使用事务可以保证数据的一致性，可以使用AOP来实现事务处理的功能，可以在方法开始前开启事务，在方法执行完毕后提交或回滚事务。
3. 安全控制：在系统中包含某些需要安全控制的操作，如登录、修改密码、授权等，可以使用AOP来实现安全控制的功能。可以在方法执行前进行权限判断，如果用户没有权限，则抛出异常或转向到错误页面，以防止未经授权的访问。
4. 性能监控：在系统运行过程中，有时需要对某些方法的性能进行监控，以找到系统的瓶颈并进行优化。可以使用AOP来实现性能监控的功能，可以在方法执行前记录时间戳，在方法执行完毕后计算方法执行时间并输出到日志中。
5. 异常处理：系统中可能出现各种异常情况，如空指针异常、数据库连接异常等，可以使用AOP来实现异常处理的功能，在方法执行过程中，如果出现异常，则进行异常处理（如记录日志、发送邮件等）。
6. 缓存控制：在系统中有些数据可以缓存起来以提高访问速度，可以使用AOP来实现缓存控制的功能，可以在方法执行前查询缓存中是否有数据，如果有则返回，否则执行方法并将方法返回值存入缓存中。
7. 动态代理：AOP的实现方式之一是通过动态代理，可以代理某个类的所有方法，用于实现各种功能。

综上所述，AOP可以应用于各种场景，它的作用是==将通用的横切关注点与业务逻辑分离，做成代理==。使得代码更加清晰、简洁、易于维护。



## AOP思想主要的应用场景

1. **横切关注点**

   从每个方法中抽取出来的同一类非核心业务。在同一个项目中，我们可以使用多个横切关注点对相关方法进行多个不同方面的增强。

   这个概念不是语法层面天然存在的，而是根据附加功能的逻辑上的需要：有十个附加功能，就有十个横切关注点

2. **通知(增强)**

   - 前置通知：在被代理的目标方法前执行
   - 返回通知：在被代理的目标方法成功结束后执行
   - 异常通知：在被代理的目标方法异常结束后执行
   - 后置通知：在被代理的目标方法最终结束后执行
   - 环绕通知：使用try...catch...finally结构围绕整个被代理的目标方法，包括上面四种通知对应的所有位置

3. **连接点 joinpoint**

   指那些被拦截到的点。在 Spring 中，可以被动态代理拦截目标类的方法

4. **切入点 pointcut**

   定位连接点的方式，或者可以理解成被选中的连接点！

   是一个表达式，比如execution(* com.spring.service.impl.*.*(..))。符合条件的每个方法都是一个具体的连接点

5. **切面 aspect**

   切入点和通知的结合。是一个类

6. **目标 target**

   被代理的目标对象

7. **代理 proxy**

   向目标对象应用通知之后创建的代理对象

8. **织入 weave**

   指把通知应用到目标上，生成代理对象的过程。可以在编译期织入，也可以在运行期织入，Spring采用后者



## SpringAop基于注解方式的实现

```xml
<!-- spring-aspects会帮我们传递过来aspectjweaver -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>6.0.6</version>
</dependency>

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>6.0.6</version>
</dependency>
```

1. 定义Aspect

   -  **@Before：前置通知**，在目标方法执行之前执行
   - **@After：后置通知**，在方法的 finally 字句中执行
   - **@AfterReturning：返回值通知**，在目标方法返回值之后执行
   - **@AfterThrowing：异常通知**，在方法的 catch 字句中执行
   - **@Around：环绕通知**

   ```java
   @Component
   @Aspect        // 将当前组件标识为切面
   @Order(1)      // 切面优先级，值越小，优先级越高
   public class LoggerAspect {
   
       /**
        * 在切面中需要通过指定注解将方法标识为通知方法
        * @Before 前置通知，在目标方法执行之前执行
        * @After 后置通知，在方法的 finally 字句中执行
        * @AfterReturning 返回值通知，在目标方法返回值之后执行
        * @AfterThrowing 异常通知，在方法的 catch 字句中执行
        *
        * execution()
        *  第一个 * 标识任意的方法和修饰符
        *  第二个 * 标识类中的方法
        *  ..表示任意的参数列表
        *  类的地方也可以使用 *
        */
   
       // 切点，也可以创建一个切点存储类，参考com.springioc.pointcut.MyPointCut
       @Pointcut("execution(* com.springioc.proxy.CalculatorImpl.*(..))")
       public void pointCut() {}
   
   //    @Before("execution(public int com.spring.proxy.CalculatorImpl.add(int, int))")
   //    @Before("execution(* com.spring.proxy.CalculatorImpl.*(..))")
       @Before("pointCut()")
       public void beforeAdviceMethod(JoinPoint joinPoint) {
   
           // 获取连接点对应的方法的签名信息
           Signature signature = joinPoint.getSignature();
   
           // 获取连接点对应方法的参数
           Object[] args = joinPoint.getArgs();
   
           System.out.println("beforeAdviceMethod 前置通知, 方法： " + signature.getName() + ",参数： " + Arrays.toString(args));
       }
   
       @After("com.springioc.pointcut.MyPointCut.pointCut()")
       public void afterAdviceMethod(JoinPoint joinPoint) {
           // 获取连接点对应的方法的签名信息
           Signature signature = joinPoint.getSignature();
   
           // 获取连接点对应方法的参数
           Object[] args = joinPoint.getArgs();
   
           System.out.println("After 后置通知, 方法： " + signature.getName() + ",参数： " + Arrays.toString(args));
       }
   
       /**
        * 返回值通知
        * returning: 接收表示方法的返回值
        */
       @AfterReturning(value = "pointCut()", returning = "result")
       public void afterReturnAdviceMethod(JoinPoint joinPoint, Object result) {
           // 获取连接点对应的方法的签名信息
           Signature signature = joinPoint.getSignature();
   
           System.out.println("AfterReturning 返回值通知, 方法： " + signature.getName() + ",返回值： " + result);
       }
   
       /**
        * throwing： 接收目标对象方法的异常参数
        */
       @AfterThrowing(value = "pointCut()", throwing = "ex")
       public void afterThrowingAdviceMethod(JoinPoint joinPoint, Throwable ex) {
           // 获取连接点对应的方法的签名信息
           Signature signature = joinPoint.getSignature();
   
           // 获取连接点对应方法的参数
           Object[] args = joinPoint.getArgs();
   
           System.out.println("AfterThrowing 异常通知, 方法： " + signature.getName() + ", 异常： " + ex);
       }
   
       @Around("pointCut()")
       public Object aroundAdviceMethod(ProceedingJoinPoint joinPoint) {
   
           // 环绕通知的返回值一定要和目标对象的返回值一致
   
           Object result = null;
           try {
               System.out.println(" 环绕通知--前置通知  开启事务");
               // 表示 目标对象方法 执行
               result = joinPoint.proceed();
   
               System.out.println(" 环绕通知--返回通知  结束事务");
           } catch (Throwable throwable) {
               System.out.println(" 环绕通知--异常通知  事务回滚");
           } finally {
               System.out.println(" 环绕通知--后置通知");
           }
           return result;
       }
   }
   ```

2. 定义切点

   ```java
   @Component
   public class MyPointCut {
       // 定义切点是CalculatorImpl类下的所有方法
       @Pointcut("execution(* com.springioc.proxy.CalculatorImpl.*(..))")
       public void pointCut() {}
   
       @Pointcut("execution(* com.springioc.proxy.CalculatorImpl.*(String, ..))")
       public void pointCut2() {}
   }
   ```

3. 测试

   ```java
   @ComponentScan("com.springioc")
   @Configuration
   @EnableAspectJAutoProxy    // 开启aspectj的注解
   public class JavaConfiguration {
   }
   ```

   ```java
   @SpringJUnitConfig(JavaConfiguration.class)
   public class AopTest {
   
       @Autowired
       private Calculator calculator;
   
       @Test
       public void testAop(){
           int add = calculator.add(1, 1);
           System.out.println("result=" + add);
       }
   }
   ```

   



# SpringAop对获取Bean的理解

根据接口获取Bean

1. 获取Bean：场景1

   - 一个接口有**多个实现类**，接口所有实现类都放入 IOC 容器

     - 根据接口类型获取 bean

       会抛出 NoUniqueBeanDefinitionException 异常，表示 IOC 容器中这个类型的 bean 有多个

     - 根据类获取bean

       正常

2. 获取Bean：场景2

   - 声明一个接口，接口有一个实现类

   - **创建一个切面类**，对上面接口的实现类应用通知

     - 测试：根据接口类型获取bean (Calculator.class)

       正常

     - 测试：根据类获取bean (CalculatorImpl.class)

       <span style="color: #F00;">无法获取</span>

   ```java
   public interface Calculator {}
   
   @Component
   public class CalculatorImpl implements Calculator {}
   ```

   原因分析：

   应用了切面后，真正放在IOC容器中的是**代理类的对象**，目标类并没有被放到IOC容器中，所以根据目标类的类型从IOC容器中是找不到的，**根据接口能找到是因为实现接口使用的是JDK动态代理，代理类实现了该接口**

3. 场景3

   - 声明一个类，创建一个切面类，对上面的类应用通知

     - 根据类获取 bean，<span style="color: #F00;">能获取到</span>

       这里没有实现接口，采用的是cglib代理，故而可以通过类型获取

<span style="color: #F00;">如果使用AOP技术，目标类有接口，必须使用接口类型接收IoC容器中代理组件！</span>
