# 官网

[Maven官网](https://maven.apache.org "Maven")

[Maven仓库](https://mvnrepository.com "mvnrepository")



# 安装配置

1. 下载`Maven`解压

2. 在`/conf/settings.xml`下修改，仓库存储地址，阿里云镜像等3处

   55行左右，添加以下内容

   ```xml
   <localRepository>D:\Software\Maven\apache-maven-3.8.4\repository</localRepository>
   ```

   \<mirrors>\</mirrors>标签下，注释原来的mirror，添加下面部分

   ```xml
   <mirror>
       <id>nexus-aliyun</id>
       <mirrorOf>central</mirrorOf>
       <name>Nexus aliyun</name>
       <url>http://maven.aliyun.com/nexus/content/groups/public</url>
   </mirror>
   ```

   \<profiles>\</profiles>下

   ```xml
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

3. 改变`idea`的Maven配置，配置方式与步骤2一样

   `D:\Software\JetBrains\IntelliJ IDEA 2021.1.3\plugins\maven\lib\maven3\conf\settings.xml`



# Maven的GAVP

Maven 中的 GAVP 是指 Groupld、Artifactld、 Version、Packaging 等四个性的缩写，其中前三个是必要的，而 Packaging 属性为可选项

- **GroupID**：表示项目所属的组织或公司的标识符；格式：com.[公司/BUJ.业务线.[子业务线]，最多 4 级
-  **ArtifactID**：表示项目的唯一标识符，格式：通常是项目的名称；产品线名-模块名
- **Version**：表示项目的当前版本号；格式：主版本号.次版本号.修订 号
- **Packaging**：表示项目的打包方式，即输出的文件类型
  - **jar**：Java项目的标准打包方式，包含Java类和资源文件。
  - **war**：用于Web应用程序的打包方式，包含了Web应用所需的所有文件。
  - **pom**：用于打包Maven项目本身的信息，包含了项目的依赖、插件等信息。
  - **ear**：用于企业级Java应用程序的打包方式，包含了多个模块的JAR、WAR等文件。



# 依赖管理



## 第三方依赖信息声明

```xml
<groupId></groupId>
<artifactId></artifactId>
<version></version>
<scope></scope>
```

- 可选属性`scope`：引入依赖的作用域
  - **compile（默认值）**：依赖在编译、测试、运行阶段都有效
  - **provided**：依赖在编译阶段有效，但在打包阶段（例如WAR包构建）不会被包含
  - **runtime**：依赖在运行和测试阶段有效，但不会被编译
  - **test**：依赖仅在测试编译和运行测试时有效，不会被打包



## 第三方依赖导入失败

原因：

1. 网络不好
2. 版本号错误
3. 本地仓库被污染

解决办法：

3. 找到本地仓库对应的包文件，删除即可（.lastUpdated文件）



# 构建管理

请根据你的需求选择适当的命令。在执行这些命令之前，确保你已经在项目的根目录下，其中包含了 `pom.xml` 文件

1. 清理编译或打包后的项目结构，删除 target 文件夹

   ```
   mvn clean
   ```

2. 编译项目，生成 target 文件

   ```
   mvn compile
   ```

3. 只运行单元测试：

   ```
   mvn test
   ```

4. 打包项目但不运行测试，生成 war /jar 文件

   ```
   mvn package
   ```

5. 打包后上传到 maven 本地仓库(本地部署)

   ```
   mvn install
   ```

6. 只打包，上传到 maven 私服仓库(私服部署)

   ```
   mvn deploy
   ```

7. 生成一个项目依赖信息的展示页面

   ```
   mvn site
   ```



## 命令构建周期

清理周期 clean

构建周期 compile、test、package、install / deploy

报告周期 site



# Maven工程的继承

父工程的 `packaging` 设置成 `pom`，不打包也不写代码

```xml
<packaging>pom</packaging>
```

在`dependencyManagement`中声明依赖，不会下载依赖，可以被子工程继承默认版本号

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



# 依赖本地其他工程

1. install 需要被依赖的工程

2. 在工程中直接引入依赖即可

   ```xml
   <dependencies>
       <dependency>
           <groupId>com.locationproject</groupId>
           <artifactId>myprojectname</artifactId>
       </dependency>
   </dependencies>
   ```

   