# Spring MVC (Spring Model View Controller)

# 注解说明

- @RequestMapping

- @GetMapping

- @PostMapping

- @DeleteMapping

- @PutMapping

- @PathVarible          提取路径变量

- @RequestHeader   将 请求头信息 和 控制器方法 的形参 绑定

- @CookieValue         将 cookie数据 和 控制器方法 的形参 绑定

- @RequestParam     将 请求参数 和 控制器方法 的形参 绑定

- @RequestBody        将 json 格式的请求参数转化为 Java 对象

- @ResponseBody     将所标识的控制器方法的返回值作为响应报文的响应体响应到浏览器

- @RestController      @Controller与@ResponseBody的集合

# 请求 RequestMapping

```java
/**
 * @RequestMapping
 *  value
 *  method
 *  params
 *      "value": 当前请求中一定要携带该参数
 *      "!value": 当前请求中不能携带该参数
 *      "value=value"： 当前请求中一定要携带参数 value
 *      "value!=value"： 当前请求中不能携带参数 value
 * headers: 请求头，用法与 params 一样
 *      请求头错误 报404
 *
 * @RequestMapping(): value值支持设置一些特殊字符
 *  ?: 表示任意单个字符
 *  *: 表示任意个数任意字符
 *  **: 任意层数的任意目录，只能使用在双斜线中，前后不能有任意的其他字符，如 / ** /"test/
 * 路径中的占位符 {}, 配合 @PathVariable 使用
 *
 * @GetMapping @PostMapping @DeleteMapping @PutMapping
 */
```

# 请求参数 RequestParam

```java
/**
 * @RequestParam(value, required, defaultValue): 将 请求参数 和 控制器方法 的形参 绑定
 * value: 前端参数名
 * required: true | false
 *  true: 默认值，该参数必须要传
 *  false: 参数非必要，不传值为默认值
 * defaultValue: 参数默认值，此时和 required 的值无关
 *
 * @RequestHeader(value, required, defaultValue): 将 请求头信息 和 控制器方法 的形参 绑定
 *  用法与 @RequestParam 一样
 *
 * @CookieValue(value, required, defaultValue): 将 cookie数据 和 控制器方法 的形参 绑定
 *  用法与 @RequestParam 一样
 */
```

# 请求参数 RequestBody

```java
/**
 * @RequestBody: 将 json 格式的请求参数转化为 Java 对象
 *  有相对应的类请使用相对应的类，没有请使用 Map
 *  为 类 | Map 自动装配需要使用 jackson依赖
 */
```

# 相应体 ResponseBody

```java
/**
 * @ResponseBody: 将所标识的控制器方法的返回值作为响应报文的响应体响应到浏览器
 *  响应浏览器 json 格式的数据
 *  需要使用 jackson依赖
 */
```

# 文件上传

```java
@PostMapping("/upload")
public R<String> upload(MultipartFile file) {
    /**
     * 1. 生成文件名
     * 2. 选择下载路径
     * 3. 下载
     */

    // 获取上传的文件的文件名
    String originalFilename = file.getOriginalFilename();
    System.out.println("originalFilename: " + originalFilename);

    // 处理文件重名问题 利用UUID.后缀名
    String fileName = originalFilename.substring(originalFilename.lastIndexOf("."));
    fileName = UUID.randomUUID().toString() + fileName;
    System.out.println("fileName: " + fileName);

    // 创建 一个目录对象
    String photoPath = "D:\\binn\\image\\";
    File dir = new File(photoPath);
    if(!dir.exists()){
        // 弱目录不存在，需要创建
        dir.mkdir();
    }

    try {
        // 下载 file 到本地
        file.transferTo(new File( photoPath + fileName));
    } catch (IOException exception) {
        exception.printStackTrace();
    }
    return R.success("上传成功");
}
```

# 文件下载

```java
@GetMapping("/download")
public ResponseEntity<byte[]> download(String name, HttpServletResponse response) {
    // 用于浏览器下载
    /*try {
        //获取服务器中文件的真实路径
        String realPath = "C:\\Users\\gzyct\\Desktop\\pictures\\avatar.jpg";
        //创建输入流
        InputStream fileInputStream = new FileInputStream(realPath);

        //创建字节数组
        byte[] bytes = new byte[fileInputStream.available()];
        //将流读到字节数组中
        fileInputStream.read(bytes);

        //创建HttpHeaders对象设置响应头信息
        MultiValueMap<String, String> headers = new HttpHeaders();
        //设置要下载方式以及下载文件的名字
        headers.add("Content-Disposition", "attachment;filename=123.jpg");
        //设置响应状态码
        HttpStatus statusCode = HttpStatus.OK;
        //创建ResponseEntity对象
        ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(bytes, headers,statusCode);

        //关闭输入流
        fileInputStream.close();
        return responseEntity;
    } catch (Exception exception) {
        exception.printStackTrace();
    }*/

    // 浏览器不会下载，可以用于回显
    try {
        // 创建输入流
        FileInputStream fileInputStream = new FileInputStream(new File("C:\\Users\\gzyct\\Desktop\\pictures\\avatar.jpg"));

        // 输出流，在浏览器写到浏览器
        ServletOutputStream outputStream = response.getOutputStream();
        response.setContentType("image/jpeg");

        int len = 0;
        byte[] bytes = new byte[1024];
        while(( len = fileInputStream.read(bytes)) != -1) {
            outputStream.write(bytes, 0, len);
            outputStream.flush();
        }

        fileInputStream.close();
        outputStream.close();

    } catch (Exception exception) {
        exception.printStackTrace();
    }

    return null;
}
```
