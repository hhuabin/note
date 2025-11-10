# web.xml配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!-- 
        配置servLet类并起一个别名
            servlet-name 用于关联请求的映射路径
            servlet-class 告诉Tomcat对应的要实例化的ServLet类
     -->
    <servlet>
        <servlet-name>servlet</servlet-name>
        <servlet-class>com.boot.servlet.userServlet</servlet-class>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>servlet</servlet-name>
        <!-- 精确匹配 -->
        <url-pattern>/servlet</url-pattern>
        <!-- 模糊匹配 * -->
        <url-pattern>/user/*</url-pattern>
    </servlet-mapping>

</web-app>
```





# @WebServlet 注解

`@WebServlet(name = "MyServlet", urlPatterns = "/hello")`

`@WebServlet` 是 Java Servlet 中的一个注解，用于声明一个 Servlet。Servlet 是 Java Web 应用中处理 HTTP 请求的一种方式

```java
import javax.servlet.annotation.WebServlet;

@WebServlet(name = "MyServlet", urlPatterns = "/hello")
public class MyServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        response.getWriter().println("<html><body><h1>Hello, Servlet!</h1></body></html>");
    }
}
```

```
@WebServlet(
        urlPatterns = "/hello",
        initParams = {                      // 默认参数
                @WebInitParam(name = "name", value = "bin")
        }
)
```







Tips：

当注解的参数名是`value`的时候，可以省略不写，所以一般都会配一个value参数当默认值。在WebServlet接口中，`value`指向`urlPatterns`。故而，当不写参数名的时候@WebServlet("/hello"）则是在给`urlPatterns`赋值

```java
public @interface WebServlet {
    String name() default "";

    String[] value() default {};

    String[] urlPatterns() default {};
}
```

