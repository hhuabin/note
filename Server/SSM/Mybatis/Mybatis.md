# 1. 引入Mybatis

配置文件： mybatis-config.xml

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.10</version>
</dependency>
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <!--
        properties?,settings?,typeAliases?,typeHandlers?,
        objectFactory?,objectWrapperFactory?,reflectorFactory?,
        plugins?,environments?,databaseIdProvider?,mappers?
    -->

    <!--引入jdbc.properties文件，可以使用${key}的方式访问value-->
    <properties resource="jdbc.properties"/>

    <settings>
        <!--将下划线映射为驼峰-->
        <!--<setting name="mapUnderscoreToCamelCase" value="true"/>-->
        <!--全局延迟加载-->
        <!--<setting name="lazyLoadingEnabled" value="true"/>-->
        <!--完整加载-->
        <setting name="aggressiveLazyLoading" value="false"/>
    </settings>

    <typeAliases>
        <!--bean包下的类型在 mapper/下的映射文件 中全部拥有默认别名-->
        <package name="com.mybatis.bean"/>
    </typeAliases>
    
    <plugins>
        <!--配置分页器插件-->
        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
    </plugins>

    <!--
        environments: 配置连接数据库环境
        default: 设置默认使用的环境 id
    -->
    <environments default="development">
        <!--
            environment: 设置一个具体的连接数据库的环境
            id: 设置环境的唯一表示，不能重复
        -->
        <environment id="development">
            <!--
                transactionManager: 设置事务管理器
                type="JDBC" | "MANAGED"
                JDBC: 设置使用 JDBC 原生的事务管理方式
                MANAGED: 被管理，例如 Spring
            -->
            <transactionManager type="JDBC"/>
            <!--
                dataSource: 设置数据源
                type="POOLED" | "UNPOOLED" | "JNDI"
                POOLED: 表示数据库连接池
                UNPOOLED： 表示不使用数据库连接池
                JNDI： 表示使用上下文中的数据源
            -->
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="root"/>
                <property name="password" value="binn"/>
            </dataSource>
        </environment>
    </environments>

    <!--引入mybatis的映射文件-->
    <mappers>
        <!--<mapper resource="mappers/UserMapper.xml"/>-->
        <!--
            以包的方式引入映射文件，但是必须满足于
                1. mapper 接口和映射文件所在的包名必须一致
                2. mapper 接口和映射文件的名字必须一致
        -->
        <package name="com.mybatis.mapper"/>
    </mappers>
</configuration>
```



# 4. 动态 sql

```xml
<!--
    动态SQL 多条件查询
    if: 通过 test 属性中的表达式判断标签中的内容是否生效
    where:
        若标签中的内容成立会自动添加 where 关键字
        去掉标签中 内容前的 and 关键字
    trim:
        prefix, suffix: 在标签中前面后后面添加指定内容
        prefixOverrides, suffixOverrides: 在标签中前面后后面删除指定内容
    choose, when, otherwise
        相当于 if ... else ...
        when设置至少一个 otherwise最多一个。最终只有一条语句生效
    foreach
        collection: 循环的集合
        item: 集合个体
        separator: 循环间的分隔符
        open: 循环内容的开头
        close: 循环内容的结尾
    sql: 可以记录一段 sql
        id: 唯一标识
        <include refid="empColumns"> 使用
-->
<sql id="empColumns">
    emp_id, emp_name, age, gender, dept_id
</sql>
<select id="getEmpByCondition" resultMap="empResultMap">
    select <include refid="empColumns"></include> from t_emp
    <where>
        <if test="empName != null and empName != ''">
            emp_name = #{empName}
        </if>
        <if test="age != null and age != ''">
            and age = #{age}
        </if>
        <if test="gender != null and gender != ''">
            and gender = #{gender}
        </if>
    </where>
</select>

<!--void insertMoreEmp(@Param("emps") List<Emp> emps);-->
<insert id="insertMoreEmp">
    insert into t_emp values
    <foreach collection="emps" item="emp" separator=",">
        (null, #{emp.empName}, #{emp.age}, #{emp.gender}, null)
    </foreach>
</insert>
```



# 5. Mybatis 缓存

```java
/**
 * mybatis的一级缓存
 *  mybatis的一级缓存是 sqlSession 级别的
 *  通过同一个 sqlSession 查询的数据会被缓存，再次查询会从缓存中获取
 *  一级缓存默认开启
 *  一级缓存失效的 4 种情况
 *  1. 不同的 sqlSession 对应不同的一级缓存
 *  2. 同一个 sqlSession 但是查询条件不同
 *  3. 同一个 sqlSession 的两次查询期间 执行了任何一次 增删改 操作
 *  4. 同一个 sqlSession 的两次查询期间 手动清空了缓存 sqlSession.clearCache();
 */

/**
 * mybatis的二级缓存
 *  mybatis的二级缓存是 SqlSessionFactory 级别的，即通过同一个 SqlSessionFactory 所获取的 sqlSession 对象
 *  查询的数据会被缓存，在通过同一个 SqlSessionFactory 所获取的 sqlSession 查询相同的数据会从缓存种获取
 *
 * mybatis的二级缓存开启条件
 *  1. 在核心配置文件中，设置全局属性 cacheEnabled = "true" 默认为 true 不需要设置
 *  2. 在映射文件(CacheMapper.xml)中设置标签 <cache/>
 *  3. 二级缓存必须在 sqlSession 关闭或提交后有效
 *  4. 查询的数据所转换的实体类类型必须 实现序列化接口
 *
 * 使用二级缓存失效的情况
 *  两次查询间执行了任何一次 增删改 操作，会使 一级和二级缓存都失效
 */


/**
 * 缓存命中顺序 -> 优先查询二级缓存，再查询一级缓存，最后查询数据库
 */
```
