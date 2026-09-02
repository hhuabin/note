

了解即可，不用学

# 基本操作

1. 下载 JDBC 驱动

2. 注册驱动

   ```java
   Class.forName("com.mysql.cj.jdbc.Driver");
   ```

3. 建立连接 `Connection`

   ```java
   String user = "root";
   String password = "root";
   String url = "jdbc:mysql://localhost:3306/test";
   
   Connection conn = DriverManager.getConnection(url, user, password);
   ```

4. 预编译 sql 语句 `PreparedStatement`

   ```java
   String sql = "select * from user_info";
   
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



# 封装方法

```properties
user = root
password = binn
url = jdbc:mysql://localhost:3306/test
diverClass=com.mysql.cj.jdbc.Driver
```

```java
package com.util;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

/**
 * 调用数据库工具类
 * @Description
 * @author bin
 * @version
 * @date 2022年10月8日下午5:11:14
 *
 */
public class JDBCUtils {
	
	/**
	 * 连接数据库
	 * @Description
	 * @author bin
	 * @date 2022年11月7日下午4:11:18
	 * @return
	 * @throws Exception
	 */
	public static Connection getConnection() throws Exception {
		// 读取配置文件信息
		InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");
		Properties pros = new Properties();
		pros.load(is);
		String user = pros.getProperty("user");
		String password = pros.getProperty("password");
		String url = pros.getProperty("url");
		String diverClass = pros.getProperty("diverClass");
		
		Class.forName(diverClass);

		Connection conn = DriverManager.getConnection(url, user, password);
		return conn;
	}
	
	/**
	 * 关闭连接数据库的各种资源
	 * @Description
	 * @author bin
	 * @date 2022年11月7日下午4:11:32
	 * @param conn
	 * @param ps
	 */
	public static void closeResource(Connection conn, Statement ps) {
		try {
			if(ps != null) ps.close();
			if(conn != null) conn.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void closeResource(Connection conn, Statement ps, ResultSet rs) {
		try {
			if(ps != null) ps.close();
			if(conn != null) conn.close();
			if(rs != null) rs.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
}
```

```java
/**
 * 通用数据库增删改函数
 * @Description
 * @author bin
 * @date 2022年10月9日上午10:58:07
 * @param sql
 * @param args
 */

public void update(String sql, Object ...args) {
    Connection conn = null;
    PreparedStatement ps = null;

    try {
		// 获取数据库连接
        conn = JDBCUtils.getConnection();
		// 预编译sql语句
        ps = conn.prepareStatement(sql);
		// 填充占位符
        for(int i = 0; i < args.length; i++) {
            ps.setObject(i+1, args[i]);
        }
		// 执行
        ps.executeUpdate();
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
		// 关闭资源
        JDBCUtils.closeResource(conn, ps);
    }
}
```

