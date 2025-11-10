# 基本注解

| 注解名                         | 说明                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| @SpringBootConfiguration       |                                                              |
| @EnableAutoConfiguration       |                                                              |
| @ComponentScan                 | 组件扫描，可以发现和装配 bean                                |
| @SpringBootApplication         | 以上三个的集合体                                             |
| @Configuration                 | 声明一个配置类，配置类本身也是一个组件                       |
| @Bean                          | 标注方法的返回值是一个 bean，组件名默认是方法名              |
| @Import                        | 用于导入其他配置类，通常是@Configuration标注的类             |
| @ImportResource                | 用于导入包含bean定义的资源                                   |
| @Conditional                   | 条件装配，满足Conditional的条件则进行注入                    |
| @ConditionalOnBean             | 如果容器中存在这个Bean，则触发指定行为                       |
| @ConfigurationProperties       | 开启配置绑定                                                 |
| @EnableConfigurationProperties | 开启该类的配置绑定，并把其注入到容器中，一般用于导入第三方的组件进行属性绑定 |
| @Profile("prod")               | 指定环境（如生产环境）生效                                   |
|                                |                                                              |
|                                |                                                              |
|                                |                                                              |
|                                |                                                              |
|                                |                                                              |
|                                |                                                              |