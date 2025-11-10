# 编程式事务

```java
Connection conn = ...;
  
try {
    // 开启事务：关闭事务的自动提交
    conn.setAutoCommit(false);
    // 核心操作
    // 业务代码
    // 提交事务
    conn.commit();
  
}catch(Exception e){
  
    // 回滚事务
    conn.rollBack();
  
}finally{
  
    // 释放数据库连接
    conn.close();
  
}
```

编程式的实现方式存在缺陷：

- 细节没有被屏蔽：具体操作过程中，所有细节都需要程序员自己来完成，比较繁琐。
- 代码复用性不高：如果没有有效抽取出来，每次实现功能都需要自己编写代码，代码就没有得到复用。



# 声明式事务

声明式事务是指**使用注解或 XML 配置的方式来控制事务的提交和回滚**。

开发者只需要添加配置即可， 具体事务的实现由第三方框架实现，避免我们直接进行事务操作！

使用声明式事务可以将事务的控制和业务逻辑分离开来，提高代码的可读性和可维护性。

```xml
<!-- 声明式事务依赖-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>6.0.6</version>
</dependency>
```

1. dao层

   ```java
   @Repository
   public class UserDaoImpl implements UserDao {
   
       @Autowired
       private JdbcTemplate jdbcTemplate;
   
   
       @Override
       public void updateNameById(String name, Integer id) {
           String sql = "UPDATE ssm_user SET username = ? WHERE id = ?";
           int rows = jdbcTemplate.update(sql, name, id);
       }
   
       @Override
       public void updateAgeById(Integer age, Integer id) {
           String sql = "UPDATE ssm_user SET age = ? WHERE id = ?";
           int rows = jdbcTemplate.update(sql, age, id);
       }
   }
   ```

2. service层，加`@Transactional`注解开启事务

   ```java
   @Service
   public class UserServiceImpl implements UserService {
   
       @Autowired
       private UserDao userDao;
   
       @Override
       @Transactional
       public void updateUser() {
           userDao.updateNameById("hhhhhuabin", 3);
   
           System.out.println("-----------------");
   
           userDao.updateAgeById(24, 100);
       }
   
   }
   ```

3. 测试

   ```java
   @ComponentScan("com.springioc")
   @PropertySource(value = "classpath:jdbc.properties")
   @Configuration
   @EnableTransactionManagement      // 开启事务注解的支持
   public class JavaConfiguration {
   
       // druid连接池
       @Bean
       public DruidDataSource dataSource(
               @Value("${jdbc.user}") String user,
               @Value("${jdbc.password}") String password,
               @Value("${jdbc.url}") String url,
               @Value("${jdbc.driver}") String driver
       ) {
           DruidDataSource druidDataSource = new DruidDataSource();
           druidDataSource.setUsername(user);
           druidDataSource.setPassword(password);
           druidDataSource.setUrl(url);
           druidDataSource.setDriverClassName(driver);
           return druidDataSource;
       }
   
       // jdbcTemplate
       @Bean
       public JdbcTemplate jdbcTemplate(DruidDataSource dataSource) {
           JdbcTemplate jdbcTemplate = new JdbcTemplate();
           jdbcTemplate.setDataSource(dataSource);
           return jdbcTemplate;
       }
   
       /**
        * 装配事务管理实现对象
        * @param dataSource
        * @return
        */
       @Bean
       public TransactionManager transactionManager(DataSource dataSource){
           DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager();
           dataSourceTransactionManager.setDataSource(dataSource);
           return dataSourceTransactionManager;
       }
   
   }
   ```

   ```java
   @SpringJUnitConfig(JavaConfiguration.class)
   public class SpringTxTest {
   
       @Autowired
       public UserService userService;
   
       @Test
       public void testUpdate() {
           userService.updateUser();
       }
   }
   ```



# @Transactional

@Transactional可以放在**类**或者**方法**上，方法上的会覆盖类上的



**事务的属性：**

1. 只读 readOnly

   对一个查询操作来说，如果我们把它设置成只读，就能够明确告诉数据库，这个操作不涉及写操作。这样数据库就能够针对查询操作来进行优化

   ```java
   // readOnly = true把当前事务设置为只读 默认是false!
   @Transactional(readOnly = true)
   ```

2. 超时时间

   ```java
   /**
    * timeout设置事务超时时间,单位秒! 默认: -1 永不超时,不限制事务时间!
    */
   @Transactional(readOnly = false, timeout = 3)
   ```

3. 事务异常

   - 默认只针对运行时异常回滚，编译时异常不回滚

     ```java
     /**
      * rollbackFor = 指定哪些异常才会回滚,默认是 RuntimeException and Error 异常方可回滚!
      * noRollbackFor = 指定哪些异常不会回滚, 默认没有指定,如果指定,应该在rollbackFor的范围内!
      */
     @Transactional(readOnly = false,timeout = 3,rollbackFor = Exception.class,noRollbackFor = FileNotFoundException.class)
     ```

4. 事务的隔离级别

   - `Isolation.DEFAULT `

   1. `Isolation.READ_UNCOMMITTED`：**读未提交**，事务可以读取未被提交的数据，容易产生脏读、不可重复读和幻读等问题。实现简单但不太安全，一般不用
   2. `Isolation.READ_COMMITTED`：**读已提交**，事务只能读取已经提交的数据，可以避免脏读问题，但可能引发不可重复读和幻读
   3. `Isolation.REPEATABLE_READ`：**可重复读**，在一个事务中，相同的查询将返回相同的结果集，不管其他事务对数据做了什么修改。可以避免脏读和不可重复读，但仍有幻读的问题
   4. `Isolation.SERIALIZABLE`：**串行化**，最高的隔离级别，完全禁止了并发，只允许一个事务执行完毕之后才能执行另一个事务。可以避免以上所有问题，但效率较低，不适用于高并发场景

   ```java
   /**
    * isolation = 设置事务的隔离级别,mysql默认是repeatable read!
    */
   @Transactional(readOnly = false,
                  timeout = 3,
                  rollbackFor = Exception.class,
                  noRollbackFor = FileNotFoundException.class,
                  isolation = Isolation.REPEATABLE_READ)
   ```

5. 事务传播行为

   | 名称               | 含义                                             |
   | ------------------ | ------------------------------------------------ |
   | REQUIRED（默认值） | 如果父方法有事务，就加入，如果没有就新建自己独立 |
   | REQUIRES_NEW       | 不管父方法是否有事务，我都新建事务，都是独立的   |

   ```java
   @Transactional(propagation = Propagation.REQUIRED)
   ```

   
