# music-player-gulp

详细看我的掘金： https://juejin.im/post/5cd1c4e86fb9a0321e16b88a

gulp + 面向对象 + 异步回调 + fs模块模拟数据库项目

fs模块通过writeFile， readFile模拟数据库， 

<h3>gulp 抽风的解决办法</h3>
gulp会经常抽风，修改路径名之类的会不停报错，我的文件拿到手之后建议按照如下步骤操作：
 * gulp在绝对路径发生改变时会抽风， 不是我写的bug
 * 可以
 * 1.删除除了src和gulpfile。package.json之外的所有文件夹，
 * 改名备份 package.json文件夹， 
 * 从新npm init 再吧package.json的 包依赖 和 script 复制回去 ，
 * 再 npm i
 * 再 gulp 执行
 
 
 全局只做了一个player对象， 各种功能在该对象上面进行扩展，保证项目的可维护性

核心， 除了主入口index.js， 每一个js文件都这么写
**禁止使用异步async， await， 避免index.js 先于依赖模块加载出来**
```
(function ($, root) {
    function test(data, root){
    // 只使用 data 和 root 这两个对象进行开发，
    // data 内存入数据
    // root 内存方法，变量等
    }
    // 使用这种方法对接口进行暴露
    root.test = test 
})(window.$, window.player|| (window.player={}))

```

所有非主入口文件，暴露接口都是 **function( data数据， player对象 )**，
这样在后期维护和扩展上会更加的方便和容易。

开发使用less + es6；

做了初步的响应式，能适应ipad，手机，电脑， 毕竟就是练手项目，重点还在js；

前后端数据交互使用 fetch 和 $.ajax,

通过nodemon + concurrently 做了前后端的连载，
```
//后端package.json 文件
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm run gulp --prefix music-player-gulp",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
```
```
//
//前端package.json 文件
"scripts": {
    "gulp": "gulp",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```


**数据库的模拟方法，实现持久层，避免每次刷新数据数据都会还原*
**前端点赞 -> ajax -> 后端读取前端发过来的内容 -> promise -> writeFile -> 写入成功 -> 执行promise.resolve -> 读取文件 -> 发送给前端。 **
```
router.post('/changeLike', (req, res) => {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    new Promise((resolve, reject) => {
    //接收数据， 写入并存储文件
        fs.writeFile('./fakeDB/onlineMP3-1.json', req.body.data, { encoding: 'utf-8' }, (err, data) => {
            err ? reject(err) : resolve(data);
        })
    }).then((data) => {
    //写入完成之后，再读取文件，再发送给前端
        fs.readFile('./fakeDB/onlineMP3-1.json', { encoding: 'utf-8' }, (err, data) => {
            err ? console.log(err) : res.send(data);
        })
    }).catch((err) => {
        console.log(err)
    })
})
```



