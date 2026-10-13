# 一、安装配置

## `1.1` `Maven` 官网

[Maven 官网](https://maven.apache.org "Maven")

[历史版本下载](https://archive.apache.org/dist/maven/maven-3/ "历史版本Maven")（下载 `apache-maven-3.8.6-bin.zip`，`SpringBoot 2.7.18 推荐使用该版本`）

[Maven 仓库](https://mvnrepository.com "mvnrepository")



## `1.2` 下载安装

1. 下载 `Maven` 解压

2. 在`/conf/settings.xml`下修改，仓库存储地址，阿里云镜像等3处

   55 行左右，添加以下内容

   ```xml
   <localRepository>D:\Software\Maven\apache-maven-3.8.6\repository</localRepository>
   ```

   `<mirrors></mirrors>` 标签下，注释原来的 `mirror`，添加下面部分

   ```xml
   <mirror>
     <id>nexus-aliyun</id>
     <mirrorOf>central</mirrorOf>
     <name>Nexus aliyun</name>
     <url>http://maven.aliyun.com/nexus/content/groups/public</url>
   </mirror>
   ```

   `<profiles></profiles>` 下

   ```xml
   <!-- jdk 8 -->
   <profile>
     <id>jdk-1.8</id>
     <activation>
       <activeByDefault>true</activeByDefault>
       <jdk>1.8</jdk>
     </activation>
     <properties>
       <maven.compiler.source>1.8</maven.compiler.source>
       <maven.compiler.target>1.8</maven.compiler.target>
       <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
     </properties>
   </profile>
   ```

   ```xml
   <!-- jdk 17 -->
   <profile>
     <id>jdk-17</id>
     <activation>
       <activeByDefault>true</activeByDefault>
       <jdk>17</jdk>
     </activation>
     <properties>
       <java.version>17</java.version>
       <maven.compiler.release>17</maven.compiler.release>
     </properties>
   </profile>
   ```

3. 改变 `idea` 的 `Maven` 配置，配置方式与步骤2一样

   `D:\Software\JetBrains\IntelliJ IDEA 2021.1.3\plugins\maven\lib\maven3\conf\settings.xml`

4. 改动一下 `idea` 的默认 `maven` 设置

   `File` -> `New Projects Setup` -> `Settings for New Projects...`

   `Settings` 也顺带改一下：`Settings` -> `Build, Execution, Deployment` -> `Build Tools` -> `Maven`



# 二、`Maven` 基础概念





# 三、`Maven` 依赖管理

## `3.1` 第三方依赖声明 `dependency`

`Maven` 使用 `dependency` 声明项目所需的第三方依赖

```xml
<dependency>
    <groupId></groupId>
    <artifactId></artifactId>
    <version></version>
    <type></type>
    <classifier></classifier>
    <scope></scope>
    <optional></optional>
    <exclusions>
        <exclusion>
            <groupId></groupId>
            <artifactId></artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

| 标签         | 作用                                                     | 是否常用                                                     |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| `groupId`    | 依赖所属组织或项目的标识                                 | 必需                                                         |
| `artifactId` | 依赖构件名称                                             | 必需                                                         |
| `version`    | 依赖版本                                                 | 通常需要，版本也可以由父 `POM` 或 `dependencyManagement` 管理 |
| `scope`      | 指定依赖作用域                                           | 常用                                                         |
| `optional`   | 控制依赖是否向下游传递                                   | 偶尔                                                         |
| `exclusions` | 排除某个依赖传递引入的其他依赖                           | 常用                                                         |
| `type`       | 指定依赖构件类型，默认是 `jar`                           | 偶尔                                                         |
| `classifier` | 区分同一构件的不同变体，例如带有特定平台或附加内容的构件 | 偶尔                                                         |



### `3.1.1` `Maven` 的 `GAVP`

```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>user-service</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>
</dependency>
```

`Maven` 中的 `GAVP` 是指 `Groupld`、`Artifactld`、 `Version`、`Packaging` 等四个性的缩写，其中前三个是必要的，而 `Packaging` 属性为可选项

| 简称 | Maven 属性   | 含义                                   | 示例           |
| ---- | ------------ | -------------------------------------- | -------------- |
| G    | `groupId`    | 组织或项目的标识，通常采用反向域名格式 | `com.example`  |
| A    | `artifactId` | 构件名称，通常是模块或项目名称         | `user-service` |
| V    | `version`    | 构件版本号                             | `1.0.0`        |
| P    | `packaging`  | 构件的打包类型                         | `jar`          |

1.  `GroupID`：表示项目所属的组织或公司的标识符；格式：**com.[公司/BUJ.业务线.[子业务线]，最多 4 级**

2.  `ArtifactID`：表示项目的唯一标识符，格式：通常是项目的名称；**产品线名-模块名**

3.  `Version`：表示项目的当前版本号；格式：**主版本号.次版本号.修订号**

4.  `Packaging`：表示项目的打包方式，即输出的文件类型

    -   **`jar`**：`Java` 项目的标准打包方式，包含 `Java` 类和资源文件。
        - `war`：用于 `Web` 应用程序的打包方式，包含了 `Web` 应用所需的所有文件。

        - `pom`：用于打包 `Maven` 项目本身的信息，包含了项目的依赖、插件等信息。

        - `ear`：用于企业级 `Java` 应用程序的打包方式，包含了多个模块的 `JAR`、`WAR` 等文件。



### `3.1.2 ` `scope` 作用域

`scope` 用于指定依赖的作用范围，影响依赖在编译、测试、运行等阶段的可用性，以及依赖传递行为

```xml
<dependency>
    <groupId></groupId>
    <artifactId></artifactId>
    <version></version>
    <scope>runtime</scope>
</dependency>
```

| 作用域     | 编译主代码 | 编译测试代码 | 运行 | 依赖传递 | 典型用途                                   |
| ---------- | ---------- | ------------ | ---- | -------- | ------------------------------------------ |
| `compile`  | 是         | 是           | 是   | 是       | 普通业务依赖，默认值                       |
| `provided` | 是         | 是           | 是*  | 否       | `Servlet API` 等由运行环境提供的依赖       |
| `runtime`  | 否         | 是           | 是   | 是       | `JDBC` 驱动等运行时依赖                    |
| `test`     | 否         | 是           | 否*  | 否       | `JUnit` 等测试专用依赖                     |
| `system`   | 是         | 是           | 是*  | 否       | 本地指定的 `JAR`，不推荐使用               |
| `import`   | —          | —            | —    | —        | 仅用于 `dependencyManagement` 中导入 `BOM` |

可选属性 `scope`：引入依赖的作用域

- `compile`（默认值）：依赖在编译、测试、运行阶段都有效
- `provided`：依赖在编译阶段有效，但在打包阶段（例如 `WAR` 包构建）不会被包含
- `runtime`：依赖在运行和测试阶段有效，但不会被编译
- `test`：依赖仅在测试编译和运行测试时有效，不会被打包



### `3.1.3` `optional` 可选依赖

`optional` 用于控制依赖是否向下游项目传递

```xml
<dependency>
    <groupId></groupId>
    <artifactId></artifactId>
    <version></version>
    <optional>true</optional>
</dependency>
```

-   `false`（默认值）：允许该依赖正常传递给依赖当前项目的其他项目
-   `true`：该依赖不会自动传递给依赖当前项目的其他项目，需要下游项目自行声明

>   1.   假设项目 `A` 的 `pom.xml` 声明了 `Jackson`
>
>        ```xml
>        <dependency>
>            <groupId>com.fasterxml.jackson.core</groupId>
>            <artifactId>jackson-databind</artifactId>
>            <version>2.18.3</version>
>            <optional>false</optional>
>        </dependency>
>        ```
>
>   2.   项目 `B` 依赖项目 `A`，项目 `C` 又依赖项目 `B`
>
>   3.   只要中间没有其他依赖规则排除它，`Jackson` 就可以通过依赖传递进入 项目 `B` 和项目 `C` 的依赖树中
>
>   4.   如果 `<optional>true</optional>` 项目 `B` 和项目 `C` 的依赖树中就不会有 `Jackson`；如果项目 `B、C` 自己也需要 `Jackson`，就必须在 `B、C` 的 `pom.xml` 中显式声明



### `3.1.4` `exclusions` 排除传递依赖

依赖 `A` 自动引入了旧版本的依赖 `B`，而你不希望使用它

```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>library-a</artifactId>
    <version>1.0.0</version>
    <exclusions>
        <exclusion>
            <groupId>com.example</groupId>
            <artifactId>library-b</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

这样会排除通过 `library-a` 这条依赖路径传递引入的 `library-b`



## `3.2` `dependency` 和 `dependencyManagement`

| 配置位置                 | 主要作用                                                   |
| ------------------------ | ---------------------------------------------------------- |
| `<dependencies>`         | 声明项目实际需要的依赖                                     |
| `<dependencyManagement>` | 统一管理依赖的版本及其他默认配置，本身不会自动引入普通依赖 |
| `<exclusions>`           | 排除指定的传递依赖                                         |
| `<properties>`           | 定义可复用的属性，常用于统一版本号                         |

```xml
<properties>
    <mysql.version>8.4.6</mysql.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>${mysql.version}</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```



## `3.3` 依赖传递

### `SpringBoot` 依赖本地其他工程

1. `install` 需要被依赖的工程

2. 在工程中直接引入依赖即可

    ```xml
    <dependencies>
        <dependency>
            <groupId>com.locationproject</groupId>
            <artifactId>myprojectname</artifactId>
        </dependency>
    </dependencies>
    ```




## `3.4` 依赖冲突与版本仲裁

### `3.4.1` 依赖冲突

### `3.4.2` 版本仲裁

1.   `SpringBoot` 父工程的 `packaging` 设置成 `pom`，不打包也不写代码

     ```xml
     <packaging>pom</packaging>
     ```

2.   在 `dependencyManagement` 中声明依赖，不会下载依赖，可以被子工程继承默认版本号（版本仲裁）

     ```xml
     <packaging>pom</packaging>
     
     <properties>
         <mysql.version>8.0.33</mysql.version>
     </properties>
     
     <dependencyManagement>
         <dependencies>
             <dependency>
                 <groupId>com.mysql</groupId>
                 <artifactId>mysql-connector-j</artifactId>
                 <version>${mysql.version}</version>
             </dependency>
         </dependencies>
     </dependencyManagement>
     ```



## `3.5` 第三方依赖导入失败原因

第三方依赖导入失败可能的原因：

1. 网络不好
2. 版本号错误
3. 本地仓库被污染

解决办法：

3. 找到本地仓库对应的包文件，删除即可（`.lastUpdated` 文件）



# 四、`Maven` 仓库管理

## `4.1` 本地仓库

## `4.2` 中央仓库

## `4.3` 私服



# 五、`Maven` 构建

## `5.1` 生命周期

清理周期：`clean`

构建周期：`compile`、`test`、`package`、`install / deploy`

报告周期：`site`



## `5.2` 打包

请根据你的需求选择适当的命令。在执行这些命令之前，确保你已经在项目的根目录下，其中包含了 `pom.xml` 文件

1. 清理编译或打包后的项目结构，删除 `target` 文件夹

    ```shell
    mvn clean
    ```

2. 编译项目，生成 target 文件

    ```shell
    mvn compile
    ```

3. 只运行单元测试：

    ```shell
    mvn test
    ```

4. 打包项目但不运行测试，生成 war /jar 文件

    ```shell
    mvn package
    ```

5. 打包后上传到 maven 本地仓库(本地部署)

    ```shell
    mvn install
    ```

6. 只打包，上传到 maven 私服仓库(私服部署)

    ```shell
    mvn deploy
    ```

7. 生成一个项目依赖信息的展示页面

    ```
    mvn site
    ```

