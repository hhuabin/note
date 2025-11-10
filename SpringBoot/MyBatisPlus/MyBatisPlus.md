# MyBatisPlus

[Mybatis官网](https://mybatis.org/mybatis-3/zh_CN/index.html "Mybatis")

[MyBatisPlus官网](https://baomidou.com/pages/24112f "MyBatisPlus")



# 基本使用

1. 导入依赖

   ```xml
   <dependency>
       <groupId>com.baomidou</groupId>
       <artifactId>mybatis-plus-boot-starter</artifactId>
       <version>3.5.5</version>
   </dependency>
   ```

2. Mapper增强

   继承`BaseMapper<>`接口，就拥有了 CURD 能力

   ```java
   @Mapper
   public interface UserPlusDao extends BaseMapper<User> {
   }
   ```

3. Service增强

   继承`IService<>`接口，继承`ServiceImpl`类

   ```java
   // 继承 IService，IUserService拥有了基本的增删改方法
   public interface IUserService extends IService<User> {
   }
   
   @Service
   public class UserServiceImpl2 extends ServiceImpl<UserPlusDao, User> implements IUserService {
   }
   ```



# 分页插件

```java
@Configuration
@MapperScan("scan.your.mapper.package")
public class MybatisPlusConfig {

    /**
     * 添加分页插件
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));//如果配置多个插件,切记分页最后添加
        //interceptor.addInnerInterceptor(new PaginationInnerInterceptor()); 如果有多数据源可以不配具体类型 否则都建议配上具体的DbType
        return interceptor;
    }
}
```

```java
Page pageInfo = new Page(page, pageSize);

userMapper.selectPage(pageInfo, null);

List<User> records = pageInfo.getRecords();

return records;
```



# 条件构造器 QueryWrapper

[QueryWrapper](https://baomidou.com/pages/10c804/)

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();

queryWrapper.like("username", "a")
            .between("age", 20, 30)
            .isNotNull("email");

List<User> list = userMapper.selectList(queryWrapper);
list.forEach(System.out::println);
```



# UpdateWrapper

```java
UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
```



# LambdaQueryWrapper, LambdaUpdateWrapper

```java
// 等价示例：
query().eq("id", value).one();
lambdaQuery().eq(Entity::getId, value).one();

// 等价示例：
update().eq("id", value).remove();
lambdaUpdate().eq(Entity::getId, value).remove();
```



# 注解



## @TableName

指定数据库表名

---

默认是是实体类名去掉大写，如 User -> user

也可以使用指定名字

```java
@TableName("t_user")
public class User{}
```

也可以在配置文件中使用公共前缀

```yaml
mybatis-plus:
  global-config:
    db-config:
      table-prefix: t_    # 表名公共前缀
```



## @TableId

标识实体类中的主键字段

```java
public @interface TableId {
    String value() default "";

    IdType type() default IdType.NONE;
}
```

- **value**：指定数据库表中与 Java 实体类中的字段对应的列名

  ```java
  @TableId(value = "user_id")
  private Long id;
  ```

  指定数据库表中主键列的名称为 "user_id"

- **type**：指定主键生成策略的类型

  | 值                     | 描述                           |
  | ---------------------- | ------------------------------ |
  | **IdType.AUTO**        | 数据库 ID 自增                 |
  | **IdType.NONE**        | 无状态，该类型为未设置主键类型 |
  | **IdType.INPUT**       | insert 前自行 set 主键值       |
  | **IdType.ASSIGN_ID**   | 分配 ID(主键类型为 Number      |
  | **IdType.ASSIGN_UUID** | 分配 UUID,主键类型为 String    |

---

也可以在全局配置文件中设置主键值

```yaml
mybatis-plus:
  global-config:
    db-config:
      id-type: auto    # 自动生成 id
```



## @TableField

字段注解（非主键）

| 属性   | 描述                 |
| ------ | -------------------- |
| value  | 数据库字段名         |
| exist  | 是否为数据库表字段   |
| fill   | 字段自动填充策略     |
| select | 是否进行 select 查询 |

```java
// 插入和更新时填充字段
@TableField(fill = FieldFill.INSERT_UPDATE)
private LocalDateTime updateTime;
```



## @TableLogic

删除分为：逻辑删除、逻辑删除

@TableLogic注明为逻辑删除

```java
// 当前列默认0未删除，1已删除
// 查询的时候默认也只查询deleted = 0的
@TableLogic
private Integer deleted
```



## @Version乐观锁

乐观锁字段添加`@Version`注解

```sql
ALTER TABLE USER ADD VERSION INT DEFAULT 1 ;  # int 类型 乐观锁字段
```

添加更新插件

```java
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
    return interceptor;
}
```

---

```java
@Version
private Integer version;
```

```java
@Test
public void testQuick7(){
    //步骤1: 先查询,在更新 获取version数据
    //同时查询两条,但是version唯一,最后更新的失败
    User user  = userMapper.selectById(5);
    User user1  = userMapper.selectById(5);

    user.setAge(20);
    user1.setAge(30);

    userMapper.updateById(user);
    //乐观锁生效,失败!
    userMapper.updateById(user1);
}
```



# 防止全表更新删除插件

```java
@Configuration
public class MybatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new BlockAttackInnerInterceptor());
        return interceptor;
    }
}
```



# MybatisX快速开发插件

[MybatisX快速开发插件](https://baomidou.com/pages/ba5b24/#%E5%8A%9F%E8%83%BD "")
