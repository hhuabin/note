# 1. 引入Mybatis

配置文件： mybatis-config.xml

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.10</version>
</dependency>
```

# 2. Mapper.xml Parameter参数设置

```xml
${}: 是 statement 拼串 (注意双引号)
#{}: 是占位符
不能使用#{}的情况：
    若参数类型是String, #{}会把''带进 sql 语句中，此时需要使用 ${},因为${}是拼串的
1. 如果有两个及以上的参数应该使用 #{param1} #{param2}的方式定义变量 | #{arg0} #{arg1}
2. 使用 Map 的时候以 Map 的字段名命名即可
3. 若mapper接口的参数为实体类
    直接使用实体类的属性名即可
4. 可以在mapper接口的参数中使用 @Param 注解
    可以使用 Map 的键的形式调用参数
    可以使用 #{param2} 的形式调用参数
```

```java
// Mapper interface
/*
    @Param注解
        Mybatis会自动把参数放进map集合里面
        在映射文件调用的时候直接使用 value 值即可
*/
Map<String, Object> getUserByIdToMap(@Param("id") Integer id);
```

```xml
<!--Map<String, Object> getUserByIdToMap(@Param("id") Integer id);-->
<select id="getUserByIdToMap" resultType="map">
    select * from t_user where id = #{id}
</select>
```

# 3. Mapper.xml ResultMap参数设置

## 使用驼峰命名的办法

1. sql 自定义返回字段

2. 在 mybatis-config.xml 的settings中设置

3. 使用自定义映射 resultMap

## resultMap: 设置自定义映射关系

id: 唯一标识
type: 处理映射关系的实体类类型
    id: 处理表的主键和实体类属性的映射关系
    result: 处理普通字段与实体类中属性的映射关系
    association: 处理多对一的映射关系
    collection: 处理一对多的映射关系
        column: sql 查询出的某个字段
        property: 实体类中属性名

```xml
<resultMap id="empResultMap" type="Emp">
    <id column="emp_id" property="empId"></id>
    <result column="emp_name" property="empName"></result>
    <result column="age" property="age"></result>
    <result column="gender" property="gender"></result>
</resultMap>

<!--List<Emp> getEmpByEmpId(@Param("empId") Integer empId);-->
<select id="getEmpByEmpId" resultMap="empResultMap">
   select * from t_emp where emp_id = #{empId}
</select>
```

## 表关联查询

1. 处理多对一关系
    property="dept.deptId"
2. 使用 <association/> 标签
    property：实体类的属性名
    javaType：实体类的类型

## 分布查询 可以配合延迟加载进行 sql 性能提升

使用 <association/> 标签

    property：实体类的属性名
     fetchType: eager | lazy 立即加载 | 延迟加载
     select: 设置分布查询的sql 唯一标识
     column: 将查询出的某个字段作为分布查询的 sql 条件

```xml
<resultMap id="deptAndEmpResultMap" type="Dept">
    <id column="dept_id" property="deptId"></id>
    <result column="dept_name" property="deptName"></result>
    <collection property="emps" ofType="Emp">
        <id column="emp_id" property="empId"></id>
        <result column="emp_name" property="empName"></result>
        <result column="age" property="age"></result>
        <result column="gender" property="gender"></result>
    </collection>
    <!--<association property="emps" fetchType="lazy"
                 select="com.mybatis.mapper.EmpMapper.getEmpByDeptId"
                 column="dept_id"></association>-->
</resultMap>

<!--Dept getDeptAndEmpByDeptId(@Param("deptId") Integer deptId);-->
<select id="getDeptAndEmpByDeptId" resultMap="deptAndEmpResultMap">
    SELECT * FROM t_dept
    LEFT JOIN t_emp ON t_dept.dept_id = t_emp.dept_id
    WHERE t_dept.dept_id = #{deptId}
</select>
<!--分布查询-->
<!--<select id="getDeptAndEmpByDeptId" resultMap="deptAndEmpResultMap">
    SELECT * FROM t_dept WHERE t_dept.dept_id = #{deptId}
</select>-->
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
