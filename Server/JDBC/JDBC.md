# 基本操作

1. 下载 JDBC 驱动

2. 注册驱动

   ```java
   Class.forName("com.mysql.cj.jdbc.Driver");
   ```

3. 建立连接 `Connection`

   ```java
   Connection conn = DriverManager.getConnection(url, user, password);
   ```

4. 预编译 sql 语句 `PreparedStatement`

   ```java
   PreparedStatement ps = conn.prepareStatement(sql);
   ```

5. 执行 sql `ResultSet`、`ResultSetMetaData`

   ```java
   ResultSet rs = ps.executeQuery();  // ps.executeUpdate();
   ```

6. 关闭对象

   ```java
   if(ps != null) ps.close();
   if(conn != null) conn.close();
   if(rs != null) rs.close();
   ```