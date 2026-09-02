官网地址

[https://redis.io](https://redis.io "redis")

windows下载网址

[https://github.com/microsoftarchive/redis/releases](https://github.com/microsoftarchive/redis/releases "redis")



# 基本使用

1. 设置键值

   ```sql
   # name = bin
   set name bin
   
   # 10秒存活时间
   setex name 10 bin
   
   # 当 name 不存在的时候成功
   setnx name bin
   ```

2. 取值

   ```sql
   get name
   ```



# 通用命令

```sql
KEYS *
KEYS pattern     # 查找所有符合给定模式(pattern)的 key
EXISTS key       # 检查给定key是否存在
TYPE key         # 返回 key所储存的值的类型
TTL key          # 返回给定 key 的剩余生存时间(TTL,time to live)，以秒为单位
DEL key          # 该命令用于在 key 存在是删除 key
```



# 哈希 hash 操作命令

`Redis hash` 是一个 `string` 类型的 `field` 和 `value` 的映射表，`hash` 特别适合用于存储对象

1. 将哈希表 key 中的字段 field 的值设为 value

   ```sql
   HSET key field value   
   ```

2. 获取存储在哈希表中指定字段的值

   ```sql
   HGET key field
   ```

3. 删除存储在哈希表中的指定字段

   ```sql
   HDEL key field
   ```

4. 获取哈希表中所有字段

   ```sql
   HKEYS key
   ```

5. 获取哈希表中所有值

   ```sql
   HVALS key
   ```

6.  获取在哈希表中指定key的所有字段和值

   ```sql
   HGETALL key
   ```



# 列表 `list` 常用命令

`Redis` 列表是简单的字符串列表，按照插入顺序排序

1. 将一个或多个值插入到列表头部

   ```sql
   LPUSH key value1 [value2]
   ```

2. 获取列表指定范围内的元素

   ```sql
   LRANGE key start stop
   ```

3. 移除并获取列表最后一个元素

   ```sql
   RPOP key
   ```

4. 获取列表长度

   ```sql
   LLEN key
   ```

5. 移出并获取列表的最后一个元素，如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止

   ```sql
   BRPoP key1 [key2] timeout
   ```



# 集合 `set` 常用命令

`Redis set` 是 `string` 类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据，常用命令:

1. 向集合添加一个或多个成员

   ```sql
   SADD key member1 [member2]
   ```

2. 返回集合中的所有成员

   ```sql
   SMEMBERS key 
   ```

3.   获取集合的成员数

   ```sql
   SCARD key
   ```

4. 返回给定所有集合的交集

   ```sql
   SINTER key1[key2] 
   ```

5. 返回所有给定集合的并集

   ```sql
   SUNION key1 [key2]
   ```

6. 返回给定所有集合的差集

   ```sql
   SDIFF key1 [key2] 
   ```

7. 移除集合中一个或多个成员

   ```sql
   SREM key member1 [member2]
   ```



# 有序集合 `sortedset` 操作命令

Redis sorted set 有序集合是 string 类型元素的集合，且不允许重复的成员。每个元素都会关联一个double类型的分数(score)。redis正是通过分数来为集合中的成员进行从小到大排序。有序集合的成员是唯一的，但分数却可以重复

1. 向有序集合添加一个或多个成员，或者更新已存在成员的分数

   ```sql
   ZADD key score1 member1 [score2 member2]
   ```

2. 通过索引区间返回有序集合中指定区间内的成员

   ```sql
   ZRANGE key start stop [WITHSCORES]
   ```

3. 有序集合中对指定成员的分数加上增量 `increment`

   ```sql
   ZINCRBY key increment member
   ```

4. 移除有序集合中的一个或多个成员

   ```sql
   ZREM key member [member ...]
   ```



# `SpringBoot` 整合 `redis`

```xml
<!--redis-->
<!--
    redis 使用步骤
    1. pom 文件加入 redis 依赖
    2. application.yml 设置 cache: redis
-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

```yml
// application.yml
spring:
  cache:
    type: redis
    redis:
      time-to-live: 60s
  redis:
    host: localhost
    port: 6379
    client-type: lettuce
```

```java
    // redis
    @Resource
    private RedisTemplate redisTemplate;

    @Test
    void set() {
        ValueOperations valueOperations = redisTemplate.opsForValue();
        valueOperations.set("name", "hhhbin");
    }

    @Test
    void get() {
        ValueOperations valueOperations = redisTemplate.opsForValue();
        Object name = valueOperations.get("name");
        System.out.println(name);
    }

    /**
     * 操作Hash类型数据
     */
    @Test
    public void testHash(){
        HashOperations hashOperations = redisTemplate.opsForHash();

        // 存值
        hashOperations.put("002","name","bin");
        hashOperations.put("002","age","20");

        // 取值
        String age = (String) hashOperations.get("002", "age");
        System.out.println(age);

        // 获得hash结构中的所有字段
        Set keys = hashOperations.keys("002");
        for (Object key : keys) {
            System.out.println(key);
        }

        // 获得hash结构中的所有值
        List values = hashOperations.values("002");
        for (Object value : values) {
            System.out.println(value);
        }
    }

    /**
     * 操作List类型的数据
     */
    @Test
    public void testList(){
        ListOperations listOperations = redisTemplate.opsForList();

        //存值
        listOperations.leftPush("mylist","a");
        listOperations.leftPushAll("mylist","b","c");

        //取值
        List<String> mylist = listOperations.range("mylist", 0, -1);
        for (String value : mylist) {
            System.out.println(value);
        }

        // 获得列表长度 llen
        Long size = listOperations.size("mylist");
        int lSize = size.intValue();
        for (int i = 0; i < lSize; i++) {
            // 出队列
            String element = (String) listOperations.rightPop("mylist");
            // System.out.println(element);
        }
    }

    /**
     * 操作Set类型的数据
     */
    @Test
    public void testSet(){
        SetOperations setOperations = redisTemplate.opsForSet();

        // 存值
        setOperations.add("myset","a","b","c","a");

        // 取值
        Set<String> myset = setOperations.members("myset");
        for (String o : myset) {
            System.out.println(o);
        }
        // 删除成员
        setOperations.remove("myset","a","b");
    }

    /**
     * 操作ZSet类型的数据
     */
    @Test
    public void testZset(){
        ZSetOperations zSetOperations = redisTemplate.opsForZSet();

        // 存值
        zSetOperations.add("myZset","a",10.0);
        zSetOperations.add("myZset","b",11.0);
        zSetOperations.add("myZset","c",12.0);
        zSetOperations.add("myZset","a",13.0);

        // 修改分数
        zSetOperations.incrementScore("myZset","b",20.0);

        // 取值
        Set<String> myZset = zSetOperations.range("myZset", 0, -1);
        for (String s : myZset) {
            System.out.println(s);
        }
        // 删除成员
        zSetOperations.remove("myZset","a","b");
    }
```



# `Java` 操作 `Redis`

`Spring Data Redis` 中提供了一个高度封装的类: `RedisTemplate`，针对 `redis` 客户端中大量 `api` 进行了归类封装,将同一类型操作封装为 `operation` 接口，具体分类如下:

| 接口              | 用法                       |
| ----------------- | -------------------------- |
| `ValueOperations` | 简单 `K-V` 操作            |
| `SetOperations`   | `set` 类型数据操作         |
| `ZSetOperations`  | `zset` 类型数据操作        |
| `HashOperations`  | 针对 `map` 类型的数据操作  |
| `ListOperations`  | 针对 `list` 类型的数据操作 |
