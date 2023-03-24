使用 Spring 缓存

```xml
<!--cache-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>

<!--ehcache-->
<!--
    ehcache使用步骤
    1. pom 文件加入 ehcache
    2. application.yml 设置ehcache
    3. 配置本文件 ehcache.xml
-->
<dependency>
    <groupId>net.sf.ehcache</groupId>
    <artifactId>ehcache</artifactId>
</dependency>
```

```yml
spring:
  cache:
    type: ehcache
    ehcache:
      config: classpath:ehcache.xml
```

# Spring Cache 常用注解

- @EnableCaching 开启缓存注解功能 (Application中)

- @Cacheable 在方法执行前spring先查看缓存中是否有数据，如果有数据，则直接返回缓存数据;若没有数据，调用方法并将方法返回值放到缓存中

- @CachePut 将方法的返回值放到缓存中

- @CacheEvict 将一条或多条数据从缓存中删除

```java
// 默认存储方案
@CachePut(value = "smsCode", key = "#phone")
public String sendCode(String phone) {
    String code = codeUtils.generator(phone);
    return code;
}

// 删除缓存
// @CacheEvict(value = "smsCode", key = "#p0")
// @CacheEvict (value = smsCode", key = #root.args[0]")
@CacheEvict(value = smsCode", key = "#phone")
public void deleteCode(String phone) {
    return null;
}

// 获取缓存
// unless: 满足条件时不缓存数据
@Cacheable(value = "smsCode", key = "#phone", condition = "#unless == null")
public String getCode(String phone) {
    String code = "123456";
    return code;
}
```
