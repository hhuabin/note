## 文件上传

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



## 文件下载

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
