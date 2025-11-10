# 1.Servlet

**Servlet (server applet) 是运行在服务端 tomcat 的 Java 小程序，是sun司提供一套定义动态资源规范；从代码层面上来进 Servlet 就是一个接口**

- 不是所有的JAVA类都能用于处理客户端请求，能处理客户端请求并做出响应的一套技术标准就是Servlet
- Servlet是运行在服务端的，所以 Servlet必须在WEB项目中开发且在Tomcat这样的服务容器中运行



## HttpServletRequest和HttpServletResponse

请求响应与HttpServletRequest和HttpServletResponse之间的对应关系：

1. tomcat 接收到请求后，会将请求报文的信息转换一个`HttpServletRequest`对象该对象中包含了请求中的**所有信息**、**请求行**、**请求头**、**请求体**

2.  tomcat 同时创建了一个`HttpServletResponse`对象，该对象用于承装要响应给客户端的信息，后面，该对象会被转换成响应的**报文**、**响应行**、**响应头**、**响应体**

3. tomcat根据请求中的资源路径找到对应的servlet，将servlet实例化调用service方法，同时将HttpServletRequest 和HttpServletResponse对象传入

   ```java
   package com.boot.servlet;
   
   public class userServlet extends HttpServlet {
   
       // http://localhost:5000/demo_war_exploded/servlet?username=bin
       @Override
       protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
           String username = request.getParameter("username");
           PrintWriter writer = response.getWriter();
           writer.write(username);
       }
   }
   ```
   
   1. 从request对象中获取请求的所有信息（参数）
   2. 根据参数生成要响应给客户端的数据
   3. 将响应的数据放入`response`对象



# 2.Servlet 的生命周期

1. 实例化 **ServletLifeCycle()**
2. 初始化 **init()**
3. 接收请求、处理请求（服务）**service()**
4. 销毁 **destroy()**

Servlet 在 `Tomcat` 中是单例的，不建议在 `service ` 方法中修改成员变量，会引发线程安全问题

---

Servlet中的核心方法：`init()` `service()` `destroy()`

```java
public interface Servlet {
    // 初始化方法，构造完毕后，由 tomcat 自动调用并完成初始化功能的方法
    void init(ServletConfig var1) throws ServletException;
	// 接收用户请求，响应信息的方法
    void service(ServletRequest request, ServletResponse response) throws ServletException, IOException;
	// Servlet 回收前，由 tomcat 调用的销毁方法
    void destroy();
}
```

---

一般每个请求会执行相对应的 servlet。

**DefaultServlet**：默认的 servlet，当匹配不上其他的 servlet，默认匹配上它，一般用于处理静态资源。

```xml
<servlet>
    <servlet-name>default</servlet-name>
    <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
</servlet>
```



# 3.Servlet 的继承结构

**Servlet -> GenericServlet -> HttpServlet**

`service()`方法负责处理请求，在`service()`里面会调用`doGet()`、`doPost()`方法。默认的`doGet`、`doPost()`是返回**405**的。所以继承类一定要重写`doGet()`、`doPost()`方法，或者`service()`方法(一般不推荐直接重写这个)。



## ServletConfig

- 为Servlet提供初始配置参数的一种对象每个Servlet都有自己独立唯一的ServletConfig对象
- 容器会为每个**Servlet实例化一个ServletConfig对象**，并通过Servlet生命周期的init方法传入给Servlet作为属性

```java
@WebServlet(
        urlPatterns = "/hello",
        initParams = {
                @WebInitParam(name = "name", value = "bin"),
                @WebInitParam(name = "age", value = "18"),
        }
)
public class userServlet extends HttpServlet {

    // http://localhost:5000/demo/hello
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ServletConfig servletConfig  = getServletConfig();

        String keyname = servletConfig.getInitParameter("name");

        System.out.println("keyname: " + keyname);

        Enumeration<String> initParameterNames = servletConfig.getInitParameterNames();

        while(initParameterNames.hasMoreElements()) {
            String key = initParameterNames.nextElement();
            System.out.println(key + "=" + getInitParameter(key));
        }
    }
}
```



## ServletContext

- ServletContext对象有称呼为上下文对象或者叫**应用域对象**
- 容器会为每个app创建一个独立的唯一的ServletContext对象
- ServletContext对象为所有的Servlet所共享
- ServletContext可以为所有的Servlet提供初始配置参数

```java
public class userServlet extends HttpServlet {

    // http://localhost:5000/demo/hello
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("---------------ServletConfig----------------------");
        ServletContext servletContext = servletConfig.getServletContext();
        ServletContext servletContext1 = request.getServletContext();
        ServletContext servletContext2 = getServletContext();
        System.out.println(servletContext == servletContext1);      // true
        System.out.println(servletContext1 == servletContext2);     // true
        
        // 获取资源的真实路径
        String realPath = servletContext.getRealPath("upload");
        System.out.println("realPath: " + realPath);

        // 获取项目的上下文路径
        String contextPath = servletContext.getContextPath();
        System.out.println("contextPath: " + contextPath);         // /demo

        // 域对象的相关API
        servletContext.setAttribute("myName", "bin");
        Object myName = servletContext.getAttribute("myName");
        servletContext.removeAttribute("myName");
        System.out.println("myName: " + myName);
    }
}
```

**域对象的相关API**

| API                                          | 功能解释            |
| -------------------------------------------- | ------------------- |
| void setAttribute(String var1, Object var2); | 向域中存储/修改数据 |
| Object getAttribute(String var1);            | 获得域中的数据      |
| void removeAttribute(String var1);           | 移除域中的数据      |



# 4.HttpServletRequest

- 获取请求行信息相关方式请求的url,协议及版本)

  | API                     | 功能解释                       |
  | ----------------------- | ------------------------------ |
  | **getRequestURL**       | 获取客户端请求的url            |
  | String getRequestURI(); | 获取客户端请求项目中的具体资源 |
  | int getServerPort();    | 获取客户端发送请求时的端口     |
  | int getLocalPort();     | 获取本应用在所在容器的端口     |
  | int getRemotePort();    | 获取客户端程序的端口           |
  | String getScheme();     | 获取请求协议                   |
  | String getProtocol();   | 获取请求协议及版本号           |
  | String getMethod();     | 获取请求方式                   |

- 获得请求头信息相关

  | API                                   | 功能解释               |
  | ------------------------------------- | ---------------------- |
  | String getHeader(String var1);        | 根据头名称获取请求头   |
  | Enumeration<String> getHeaderNames(); | 获取所有的请求头名字   |
  | String getContentType();              | 获取content-type请求头 |

  ```java
  // 获取请求头相关的
  System.out.println("------------------getHeaderNames--------------------");
  Enumeration<String> headerNames = req.getHeaderNames();
  while (headerNames.hasMoreElements()) {
      String hname = headerNames.nextElement();
      System.out.println(hname + ": " + req.getHeader(hname));
      // host: localhost:5000
  	// connection: keep-alive
  }
  ```

- 获得请求参数相关

  | API                                                     | 功能解释                             |
  | ------------------------------------------------------- | ------------------------------------ |
  | **String getParameter(String var1);**                   | 根据请求参数名获取请求单个参数值     |
  | String[] getParameterValues(String var1);               | 根据请求参数名获取请求多个参数值数组 |
  | **Enumeration<String> getParameterNames();**            | 获取所有请求参数名                   |
  | **Map<String, String[]> getParameterMap();**            | 获取所有请求参数的键值对集合         |
  | BufferedReader getReader() throws IOException;          | 获取读取请求体的字符输入流           |
  | ServletInputStream getInputStream() throws IOException; | 获取读取请求体的字节输入流           |
  | int getContentLength();                                 | 获得请求体长度的字节数               |

  ```java
  @WebServlet("/httpservlet")
  public class httpServlet extends HttpServlet {
  
      // http://localhost:5000/demo/httpservlet?username=bin&age=18
      @Override
      protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          // 用于获取key=value形式的参数
          String username = req.getParameter("username");
          String age = req.getParameter("age");
          System.out.println("username: " + username + ", age: " + age);  // username: bin, age: 18
  
          Map<String, String[]> parameterMap = req.getParameterMap();
          Set<Map.Entry<String, String[]>> entries = parameterMap.entrySet();
          for (Map.Entry<String, String[]> entry : entries) {
              String key = entry.getKey();
              String[] value = entry.getValue();
              if(value.length > 1) {
                  System.out.println(key + "=" + value.toString());
              } else {
                  System.out.println(key + "=" + value[0]);
              }
          }
      }
  }
  ```

  

- 其他API

  | API                                                          | 功能解释                    |
  | ------------------------------------------------------------ | --------------------------- |
  | String getServletPath();                                     | 获取请求的Servlet的映射路径 |
  | ServletContext getServletContext();                          | 获取ServletContext对象      |
  | Cookie[] getCookies();                                       | 获取请求中的所有cookie      |
  | HttpSession getSession();                                    | 获取Session对象             |
  | void setCharacterEncoding(String var1) throws UnsupportedEncodingException; | 设置请求体字符集            |

  

## 请求转发

在Servlet中，使用`RequestDispatcher`对象来进行请求转发。以下是一个简单的请求转发

```java
// 获取RequestDispatcher对象，参数是转发的目标路径
RequestDispatcher dispatcher = request.getRequestDispatcher("/targetServlet");

// 执行请求转发
dispatcher.forward(request, response);
```

- 请求转发是通过`HttpServletRequest`对象实现的
- 请求转发是服务器内部行为，对客户端是屏蔽的
- 容户端只产生了一次请求 服务端只产生了一对 request response对象
- 客户端的地址栏是不变的
- 请求的参数是可以继续传递的
- 目标资源可以是servlet动态资源 也可以是html协态资源
  - 目标资源可以追WEB-INF 下的受保护的资源 该方式也是`WEB-INF`下的资源的唯一访问方式
- 目标资源不可以是外部资源，如`https://www.bilibili.com`这种



# 5.HttpServletResponse

- 设置响应行相关

  | API                           | 功能解释       |
  | ----------------------------- | -------------- |
  | **void setStatus(int var1);** | 设置响应状态码 |

- 设置响应头相关

  | API                                           | 功能解释                                         |
  | --------------------------------------------- | ------------------------------------------------ |
  | **void setHeader(String var1, String var2);** | 设置/修改响应头键值对                            |
  | **void setContentType(String var1);**         | 设置content-type响应头及响应字符集(设置MIME类型) |

- 设置响应体相关

  | API                                                       | 功能解释                                               |
  | --------------------------------------------------------- | ------------------------------------------------------ |
  | PrintWriter getWriter() throws IOException;               | 获得向响应体放入信息的字符输出流                       |
  | ServletOutputStream getOutputStream() throws IOException; | 获得向响应体放入信息的字节输出流                       |
  | **void setContentLength(int var1);**                      | 设置响应体的字节长度其实就是在设置content-length响应头 |
  | **void sendRedirect(String var1) throws IOException;**    | 设置响应码为302，同时设置location响应头                |

  ```java
  @WebServlet("/httpservlet")
  public class httpServlet extends HttpServlet {
  
      // http://localhost:5000/demo/httpservlet
      @Override
      protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          resp.setStatus(200);
          String _html = "<h1>hhaubin</h1>";
          resp.setHeader("Content-Type", "text/html");
          // 获得一个向响应体中输入二进制信息的字节输出流
          PrintWriter writer = resp.getWriter();
          writer.write(_html);
      }
  }
  ```

  

- 其他API

  | API                                                       | 功能解释                                            |
  | --------------------------------------------------------- | --------------------------------------------------- |
  | void sendError(int var1, String var2) throws IOException; | 向客户端响应错误信息的方法,需要指定响应码和响应信息 |
  | void addCookie(Cookie var1)                               | 向响应体中增加cookie                                |
  | void setCharacterEncoding(String var1);                   | 设置响应体字符集                                    |

  

## 响应重定向

- 响应重定向通过HttpServletResponse对象的sendRedirect方法实现
- 响应重定向是服务端通过302响应码和路径告诉客户端自己去找其他资源,是在服务端提示下的,客户端的行为
- 客户端至少发送了两次请求客户端地址栏是要变化的
- 服务端产生了多对请求和响应对象且请求和响应对象不会传递给下一个资源
- 因为全程产生了多个HttpservletRequset对象,所以请求参数不可以传递请求域中的数据也不可以传递
- 重定向可以是其他Servlet动态资源也可以是一些静态资源以实现页面跳转
- 重定向不可以到给WEB-INF下受保护的资源
- 重定向可以到本项目以外的外部资源

```java
@Override
protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
    ServletContext servletContext = request.getServletContext();
    String contextPath = servletContext.getContextPath();
    System.out.println("contextPath: " + contextPath);    // /demo
    
    resp.setStatus(302);
    resp.setHeader("location", contextPath + "/hello");
    // or
    resp.sendRedirect(contextPath + "/hello")
}
```

- 重定向要注意路径问题
