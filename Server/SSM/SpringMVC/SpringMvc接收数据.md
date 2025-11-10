# 使用

1. Controller

   ```java
   @Controller
   public class HelloController {
   
       // http://localhost:5000/springmvc/hello
       @RequestMapping("springmvc/hello")
       @ResponseBody
       public String hello() {
           System.out.println("Hello Controller");
           return "hello springmvc";
       }
   }
   ```

2. 配置文件

   ```java
   @Configuration
   @ComponentScan("com.springmvc")
   public class MvcConfig {
   
       @Bean
       public RequestMappingHandlerMapping handlerMapping() {
           return new RequestMappingHandlerMapping();
       }
   
       @Bean
       public RequestMappingHandlerAdapter handlerAdapter() {
           return new RequestMappingHandlerAdapter();
       }
   }
   ```

   ```java
   @EnableWebMvc  //json数据处理,必须使用此注解,因为他会加入json处理器
   @Configuration
   @ComponentScan("com.springmvc")
   public class MvcConfig implements WebMvcConfigurer {
   }
   ```

3. Tomcat引入配置文件使用(**Tomcat10以上**)

   ```java
   //TODO: SpringMVC提供的接口,是替代web.xml的方案,更方便实现完全注解方式ssm处理!
   //TODO: Springmvc框架会自动检查当前类的实现类,会自动加载 getRootConfigClasses / getServletConfigClasses 提供的配置类
   //TODO: getServletMappings 返回的地址 设置DispatherServlet对应处理的地址
   public class SpringMvcInt extends AbstractAnnotationConfigDispatcherServletInitializer {
   
       @Override
       protected Class<?>[] getRootConfigClasses() {
           return new Class[0];
       }
   
       @Override
       protected Class<?>[] getServletConfigClasses() {
           return new Class[]{MvcConfig.class};
       }
   
       @Override
       protected String[] getServletMappings() {
           return new String[]{"/"};
       }
   }
   ```

4. 配置Tomcat即可运行项目

   ```java
   // http://localhost:5000/springmvc/hello
   ```




# SpringMvc接收数据

**@RequestMapping**

**@GetMapping**

**@PostMapping**

**@RequestParam**

**@PathVariable**

**@RequestBody**



## @RequestMapping

该注解可以加类上或者方法上，路径可以进行**精准匹配**也可以进行**模糊匹配**

```java
@RequestMapping(value = {"/user"} , method = RequestMethod.POST)
```

method：属性的默认值是一个空数组 `{}`。这表示不指定任何HTTP方法时，请求将匹配到所有支持的HTTP方法



1. 注解可以设置在控制器类上，用于映射整个控制器的通用请求路径

   ````java
   @Controller
   @RequestMapping("springmvc")
   public class HelloController {
   }
   ````

2. 注解也可以单独设置在控制器方法上，用于更细粒度地映射请求路径和处理方法

   ```java
   @Controller
   public class HelloController {
       @RequestMapping("springmvc/hello")
       @ResponseBody
       public String hello() {
           System.out.println("Hello Controller");
           return "hello springmvc";
       }
   }
   ```



HTTP 方法特定快捷方式变体，进阶注解只能添加到handler方法上，无法添加到类上！

- **@GetMapping**
- **@PostMapping**
- @PutMapping
- @DeleteMapping
- @DeleteMappin



## 1.Param参数接收

1. 直接传值

   缺点：name和age都可以不传，不会报错

   ```java
   @GetMapping("data")
   @ResponseBody
   public String data(String name, int age) {
       System.out.println("name=" + name + " " + "age=" + age);
       return ("name=" + name + " " + "age=" + age);
   }
   ```

2. **@RequestParam** 注解

   - value | name：参数名
   - required：是否必须传值
   - defaultValue：参数默认值

   ```java
   @GetMapping("requestParam")
   @ResponseBody
   public String requestParam(@RequestParam("name") String name,
                              @RequestParam(required = false, defaultValue = "18") int age
   ) {
       System.out.println("name=" + name + " " + "age=" + age);
       return ("name=" + name + " " + "age=" + age);
   }
   ```

3. 一名多值

   ```java
   // http://localhost:5000/param/mulForm?list=bin&list=18
   @GetMapping("mulForm")
   @ResponseBody
   public String mulForm(@RequestParam List<String> list) {
       System.out.println(list.toString());  // [bin, 18]
       return list.toString();
   }
   ```

4. 实体接收，实体类一定要加上setter方法，否则赋值不生效

   ```java
   @Data
   public class User {
       private String name;
       
       private int age = 18;
   }
   
   // http://localhost:5000/param/addUser?name=bin
   @GetMapping("addUser")
   @ResponseBody
   public String addUser(User user) {
       System.out.println("user=" + user);
       return "success";
   }
   ```

5. 动态路径参数，@PathVariable

   ```java
   @ResponseBody
   @GetMapping("/user/{userid}")
   public String testPathVariable(@PathVariable("userid") String userId) {
       System.out.println("userId: " + userId);
       return userId;
   }
   ```



## 2.json数据接收

1. 加入jackson依赖，json类型处理的工具

   ```xml
   <dependency>
       <groupId>com.fasterxml.jackson.core</groupId>
       <artifactId>jackson-databind</artifactId>
       <version>2.15.0</version>
   </dependency>
   ```

2. 配置使用@EnableWebMvc注解，此注解可代替`MvcConfig`下的`handlerMapping`和`handlerAdapter`方法

   ```java
   @EnableWebMvc  //json数据处理,必须使用此注解,因为他会加入json处理器
   @Configuration
   @ComponentScan("com.springmvc")
   public class MvcConfig {
   }
   ```

1. 接收json实体

   ```java
   // 加入setter方法
   @Data
   public class Person {
       private String name;
       private int age;
       private String gender;
   }
   
   @Controller
   @RequestMapping("json")
   @ResponseBody
   public class JsonController {
   
       @PostMapping("data")
       public String addPerson(@RequestBody Person person) {
           System.out.println("person=" + person.toString());
           return person.toString();
       }
   }
   ```



## 3.接收Cookie

**@CookieValue**

```java
@Controller
@RequestMapping("cookie")
@ResponseBody
public class CookieController {

    // 取Cookie
    @GetMapping("data")
    public String data(@CookieValue("username") String username) {
        System.out.println("username=" + username);
        return username;
    }

    // 存Cookie
    @GetMapping("save")
    public String saveCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("username", "bin");
        response.addCookie(cookie);
        return "success";
    }
}
```



## 4.接收请求头数据

**@RequestHeader**

```java
@GetMapping("header")
public String header(@RequestHeader("Host") String host) {
    System.out.println("host=" + host);
    return host;
}
```



## 5.原生Api获取

```java
@GetMapping("http")
public void api(HttpServletRequest request,
                HttpServletResponse response,
                HttpSession session
) {
    ServletContext servletContext = request.getServletContext();
    ServletContext servletContext1 = session.getServletContext();
    System.out.println(servletContext == servletContext1);
}
```



## 6.共享域对象

请求**转发**或者**重定向**，使用JavaWeb的共享域

1. **HttpServletRequest**
2. **HttpSession**
3. **ServletContext**

```java
@Controller
@RequestMapping("share")
@ResponseBody
public class ShareController {

    @Autowired
    private ServletContext servletContext;

    @GetMapping("request")
    public void request(HttpServletRequest request, HttpSession session) {

    }
}
```

**SpringMvc提供的方式**：

1. **ModelAndView**

   `ModelAndView` 是一个包含模型（Model）和视图（View）的对象。通过在控制器方法中返回 `ModelAndView`，你可以设置模型数据并指定视图名称。该对象将在请求处理过程中被传递给视图解析器，以渲染相应的视图

   ```java
   @Controller
   public class MyController {
   
       @RequestMapping("/example")
       public ModelAndView example() {
           ModelAndView modelAndView = new ModelAndView("exampleView");
           modelAndView.addObject("message", "Hello, World!");
           return modelAndView;
       }
   }
   ```

2. **Model**

   ```java
   @Controller
   public class MyController {
   
       @RequestMapping("/example")
       public String example(Model model) {
           model.addAttribute("message", "Hello, World!");
           return "exampleView";
       }
   }
   ```

3. **Map**

   除了 `Model` 接口外，你还可以使用 `Map` 类型的参数。Spring MVC 会自动将 `Model` 对象注入到方法参数中

   ```java
   @Controller
   public class MyController {
       @RequestMapping("/example")
       public String example(Map<String, Object> model) {
           model.put("message", "Hello, World!");
           return "exampleView";
       }
   }
   ```

4. **@ModelAttribute**

   `@ModelAttribute` 注解可以用于方法参数或方法上，用于将一个方法返回的对象添加到模型中。这样的对象将在每个请求处理方法执行之前被调用，并被添加到模型中

   ```java
   @Controller
   public class MyController {
   
       @ModelAttribute("message")
       public String addMessage() {
           return "Hello, World!";
       }
   
       @RequestMapping("/example")
       public String example() {
           return "exampleView";
       }
   }
   ```



