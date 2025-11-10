# 安装

```shell
yum install httpd-tools
```



# 启动

```shell
ab -n 10000 -c 50 http://192.168.0.1:80/
```

- -n：即requests，用于指定压力测试总共的执行次数
- -c：即concurrency，用于指定的并发数
- -t ：即timelimit，等待响应的最大时间(单位:秒)
- -W：以HTML表格形式打印结果



