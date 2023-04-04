# 基本注解

@SpringBootConfiguration

@EnableAutoConfiguration

@ComponentScan                                   组件扫描，可以发现和装配 bean

@SpringBootApplication                         以上三个的集合体

@Configuration                                        声明一个配置类

@Import                                                    用于导入其他配置类，通常是@Configuration标注的类

@ImportResource                                   用于导入包含bean定义的资源

@Conditional                                            条件装配，满足Conditional的条件则进行注入

@ConfigurationProperties                     开启配置绑定

@EnableConfigurationProperties         开启该类的配置绑定，并把其注入到容器中

@Mapper                                                   操作Mybatis的接口

@Profile("prod")                                       指定环境（如生产环境）生效