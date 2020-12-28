## InsertData2htmlPlugin 向html中插入全局数据

> 可以在开发阶段去请求数据 并在构建阶段将数据插入到html中



```js
/*插入的形式如下*/
<head>
<script>
	;(function(){
        XXX = {"data":"data from InsertData2htmlPlugin"};
	})(window);
</script>
// 其他内容...
</head>
                          
```

### 参数

| params key |         |                                             |
| ---------- | ------- | ------------------------------------------- |
| open       | boolean | 是否开启                                    |
| url        | string  | 请求的URL 比如 http://127.0.0.1:8900/detail |
| method     | string  | 请求的方法类型 GET POST 默认POST            |
| headers    | object  | 请求头                                      |
| params     | object  | 请求参数                                    |
| key        | string  | 全局变量的key                     |

### 使用方式

```js
new InsertData2htmlPlugin({
    open: true,
    url,
    method: 'POST',
    params,
    key: '*****'
})
```

