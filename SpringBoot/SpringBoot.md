# 配置文件

SpringBoot配置文件的加载顺序

1.  application.properfiles
2.  application.yml
3.  application.yaml



# 依赖

- poml 文件的父依赖的父依赖中管理了官方依赖的仲裁版本机制。

- 如果官方没有版本仲裁，需要自己指定依赖版本。



# 日志配置

## 日志格式

默认输出格式：

- 时间和日期：毫秒级精度
- 日志级别：ERROR, WARN, INFO, DEBUG, or TRACE.
- 进程 ID
- ---： 消息分割符
- 线程名： 使用[]包含
- Logger 名： 通常是产生日志的**类名**
- 消息： 日志记录的内容



指定日志文件路径（默认项目当前目录）：

```properties
logging.file.path=D://
```

指定日志文件名字：

```properties
logging.file.name=spring.log
```



## 日志的归档及切割(基于SpringBoot3默认的logback日志)

- 归档：日志存档的文件名格式(默认值：${LOG_FILE}.%d{yyyy-MM-dd}.%i.gz)

  ```properties
  logging.logback.rollingpolicy.file-name-pattern=${LOG_FILE}.%d{yyyy-MM-dd}.%i.gz
  ```

- 切割：存档前，每个日志文件的最大大小（默认值：10MB）

  ```properties
  logging.logback.rollingpolicy.max-file-size=10MB
  ```

- 应用启动时是否清除以前存档（默认值：false）

  ```properties
  logging.logback.rollingpolicy.clean-history-on-start=false
  ```

- 日志文件被删除之前，可以容纳的最大大小（默认值：0B）。设置1GB则磁盘存储超过 1GB 日志后就会删除旧日志文件

  ```properties
  logging.logback.rollingpolicy.total-size-cap=1GB
  ```

- 日志文件保存的最大天数(默认值：7)

  ```properties
  logging.logback.rollingpolicy.max-history=30
  ```

其他日志框架需要自己建立 xml 文件配，如 `log4j2.xml` 或 `log4j2-spring.xml`

导入其他的日志框架：

1. 导入任何第三方框架，先排除它的日志包，因为Boot底层控制好了日志
2. 修改 `application.properties` 配置文件，就可以调整日志的所有行为。如果不够，可以编写日志框架自己的配置文件放在类路径下就行，比如`logback-spring.xml`，`log4j2-spring.xml`
3. 如需对接**专业日志系统**，也只需要把 logback 记录的**日志**灌倒 **kafka**之类的中间件，这和SpringBoot没关系，都是日志框架自己的配置，**修改配置文件即可**
4. **业务中使用slf4j-api记录日志。不要再 sout 了**



# 配置文件的优先级

SpringBoot 应用启动时会自动寻找application.properties和application.yaml位置，进行加载。顺序如下：（**后面覆盖前面**）

1. 类路径: 内部
   1. 类根路径
   2. 类下/config包
2. 当前路径（项目所在的位置）
   1. 当前路径
   2. 当前下/config子目录
   3. /config目录的直接子目录

最终效果：优先级由高到低，前面覆盖后面

- 命令行 > 包外config直接子目录 > 包外config目录 > 包外根目录 > 包内目录
- 同级比较： 
- - profile配置 > 默认配置
  - properties配置 > yaml配置



# 打包运行

1. 打包

   ```java
   clear
   
   package
   ```

2. 运行

   ```shell
   java -jar yourjarfile.jar
   ```

3. 通过命令行改变参数

   ```shell
   java -jar -Dserver.port=<新端口号> yourjarfile.jar
   
   java -jar -Dserver.port=8080 yourjarfile.jar
   ```

   
