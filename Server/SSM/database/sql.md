# `Spring` 数据库表

`Spring` 使用的数据库表，数据库名 `ssm`

```sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS `ssm`
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_0900_ai_ci;

-- 建表
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_name` varchar(20) NULL DEFAULT NULL,
    `password` varchar(20) NULL DEFAULT NULL,
    `age` int NULL DEFAULT NULL,
    `gender` char(1) NULL DEFAULT NULL,
    `email` varchar(50) NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
)
    ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci
    COMMENT = '普通用户表';

-- 插入数据
INSERT INTO `user` (user_name, `password`, age, gender, email)
VALUES ('admin', '123456', 23, '男', '123456@qq.com'),
    ('admin', '123456', 24, '男', '123456@qq.com'),
    ('bin', '123456', 24, '男', '123456@qq.com'),
    ('bin', '123456', 24, '男', '123456@qq.com'),
    ('binn', '123456', 24, '男', '123456@qq.com'),
    ('滨', '123456', 18, '1', '123@qq.com'),
    ('滨', '123456', 18, '1', '123@qq.com'),
    ('root', '123', 24, '男', '123@qq.com');
```



# `MyBatis` 数据库表

```sql
CREATE TABLE `t_emp`(
  emp_id INT AUTO_INCREMENT,
  emp_name CHAR(100),
  emp_salary DOUBLE(10,5),
  PRIMARY KEY(emp_id)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci
    COMMENT = '员工表';

CREATE TABLE `t_customer` (
    `customer_id` INT NOT NULL AUTO_INCREMENT,
    `customer_name` CHAR(100), PRIMARY KEY (`customer_id`)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci
    COMMENT = '客户表';

CREATE TABLE `t_order` (
    `order_id` INT NOT NULL AUTO_INCREMENT,
    `order_name` CHAR(100),
    `customer_id` INT,
    PRIMARY KEY (`order_id`)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci
    COMMENT = '订单表';


INSERT INTO `t_emp`(emp_name, emp_salary) VALUES
	("tom", 200.33),
	("jerry", 666.66),
	("andy", 777.77),
	("a", 100),
	("b", 200),
	("c", 300),
	("d", 400),
	("e", 500),
	("f", 600),
	("g", 700);

INSERT INTO `t_customer` (`customer_name`)
VALUES ('c01');

INSERT INTO `t_order` (`order_name`, `customer_id`)
VALUES
	('o1', '1'),
	('o2', '1'),
	('o3', '1');
```

