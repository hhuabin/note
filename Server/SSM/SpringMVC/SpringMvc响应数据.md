# 模板视图

1. 导入jsp页面和依赖

   ```xml
   <!-- jsp需要依赖! jstl-->
   <dependency>
       <groupId>jakarta.servlet.jsp.jstl</groupId>
       <artifactId>jakarta.servlet.jsp.jstl-api</artifactId>
       <version>3.0.0</version>
   </dependency>
   ```

2. 配置jsp视图解析器

   ```java
   @EnableWebMvc  //json数据处理,必须使用此注解,因为他会加入json处理器
   @Configuration
   @ComponentScan("com.springmvc")
   public class MvcConfig implements WebMvcConfigurer {
   
       // 配置jsp视图解析器
       @Override
       public void configureViewResolvers(ViewResolverRegistry registry) {
           registry.jsp("/WEB-INF/views/", ".jsp");
       }
   }
   ```

3. 返回视图

   ```java
   @Controller
   @RequestMapping("jsp")
   public class jspController {
   
       @RequestMapping("/index")
       public String jumpJsp() {
           return "index";
       }
   }
   ```



# 转发和重定向

- 转发：forward:***

  ```java
  @RequestMapping("/forward")
  public String forward() {
      // 转发到 /jsp/index，地址栏是/forward
      return "forward:/jsp/index";
  }
  ```

- 重定向：redirect:***

  ```java
  @RequestMapping("/redirect")
  public String redirect() {
      // 重定向到 /jsp/index。地址栏是/index
      return "redirect:/jsp/index";
  }
  
  // 外部网站
  @RequestMapping("/redirectBilibli")
  public String redirectBilibli() {
      // 重定向到 /jsp/index
      return "redirect:https://www.bilibili.com";
  }
  ```



# 返回json数据

1. 加入jackson依赖，json类型处理的工具

   ```xml
   <dependency>
       <groupId>com.fasterxml.jackson.core</groupId>
       <artifactId>jackson-databind</artifactId>
       <version>2.15.0</version>
   </dependency>
   ```

2. 直接返回该对象即可==（User实体的getter和setter方法一定要写）==

   ```java
   @Data
   public class User {
       private String name;
   
       private int age = 18;
   }
   ```

   ```java
   @RequestMapping("json")
   @RestController // = @Controller + @ResponseBody
   public class jsonController {
       
       @GetMapping(value  = "user")
       public User getUser() {
           User user = new User();
           user.setAge(18);
           user.setName("bin");
           System.out.println("user: " + user.toString());
           return user;
       }
   }
   ```




# 静态资源

```java
@EnableWebMvc  //json数据处理,必须使用此注解,因为他会加入json处理器
@Configuration
@ComponentScan("com.springmvc")
public class MvcConfig implements WebMvcConfigurer {

    // 配置jsp视图解析器
    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.jsp("/WEB-INF/views/", ".jsp");
    }

    // 开启静态资源查找
    // handlerMapping匹配不到的时候就找静态资源
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}
```

