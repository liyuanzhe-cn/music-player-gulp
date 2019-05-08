//登录注册路由接口
const express = require('express');
//引入express路由
const router = express.Router();

const fs = require('fs');

router.get('/musics', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    new Promise((resolve, reject) => {
        fs.readFile('./fakeDB/onlineMP3-1.json', { encoding: 'utf-8' }, (err, data) => {
            err ? reject(err) : resolve(data);
        })
    }).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

router.post('/changeLike', (req, res) => {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    new Promise((resolve, reject) => {
        fs.writeFile('./fakeDB/onlineMP3-1.json', req.body.data, { encoding: 'utf-8' }, (err, data) => {
            err ? reject(err) : resolve(data);
        })
    }).then((data) => {
        fs.readFile('./fakeDB/onlineMP3-1.json', { encoding: 'utf-8' }, (err, data) => {
            err ? console.log(err) : res.send(data);
        })
    }).catch((err) => {
        console.log(err)
    })
})

// router.get('/test', (req, res) => {
//    res.send("你好")
// })

module.exports = router;