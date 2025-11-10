# 数据库表

Spring使用的数据库表，数据库名ssm

```sql
DROP TABLE IF EXISTS `ssm_user`;
CREATE TABLE `ssm_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `age` int NULL DEFAULT NULL,
  `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

INSERT INTO `ssm_user` VALUES (1, 'admin', '123456', 23, '男', '123456@qq.com');
INSERT INTO `ssm_user` VALUES (2, 'admin', '123456', 24, '男', '123456@qq.com');
INSERT INTO `ssm_user` VALUES (3, 'bin', '123456', 24, '男', '123456@qq.com');
INSERT INTO `ssm_user` VALUES (4, 'bin', '123456', 24, '男', '123456@qq.com');
INSERT INTO `ssm_user` VALUES (5, 'binn', '123456', 24, '男', '123456@qq.com');
INSERT INTO `ssm_user` VALUES (6, '滨', '123456', 18, '1', '123@qq.com');
INSERT INTO `ssm_user` VALUES (7, '滨', '123456', 18, '1', '123@qq.com');
INSERT INTO `ssm_user` VALUES (8, 'root', '123', 24, '男', '123@qq.com');
```

