# 生命周期流程

Listener先要从 META-INF/spring.factories 读到

1. 引导： 利用 BootstrapContext 引导整个项目启动

   starting：              应用开始，SpringApplication的run方法一调用，只要有了 BootstrapContext 就执行

   environmentPrepared：   环境准备好（把启动参数等绑定到环境变量中），但是ioc还没有创建；【调一次】

2. 启动：

   contextPrepared：       ioc容器创建并准备好，但是sources（主配置类）没加载。并关闭引导上下文；组件都没创建  【调一次】

   contextLoaded：         ioc容器加载。主配置类加载进去了。但是ioc容器还没刷新（我们的bean没创建）。

   ==截止以前，ioc容器里面还没造bean呢==

   started：               ioc容器刷新了（所有bean造好了），但是 runner 没调用。

   ready:                  ioc容器刷新了（所有bean造好了），所有 runner 调用完了。

3. 运行

   以前步骤都正确执行，代表容器running。



### 完整触发流程

`**9大事件**`触发顺序&时机

1. `ApplicationStartingEvent`：应用启动但未做任何事情, 除过注册listeners and initializers.

2. `ApplicationEnvironmentPreparedEvent`：  Environment 准备好，但context 未创建.

3. `ApplicationContextInitializedEvent`: ApplicationContext 准备好，ApplicationContextInitializers 调用，但是任何bean未加载

4. `ApplicationPreparedEvent`： 容器刷新之前，bean定义信息加载

5. `ApplicationStartedEvent`： 容器刷新完成， runner未调用

   ==以下就开始插入了**探针机制**==

6. `AvailabilityChangeEvent`： `LivenessState.CORRECT`应用存活； **存活探针**

7. `ApplicationReadyEvent`: 任何runner被调用

8. `AvailabilityChangeEvent`：`ReadinessState.ACCEPTING_TRAFFIC`**就绪探针**，可以接请求

9.  `ApplicationFailedEvent `：启动出错







# 自定义 starter

1. 建包
2. 删除Applicition.class主类
3. META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports 文件中编写好我们自动配置类的全类名即可
4. 主包引入当前包



