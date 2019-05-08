const root = window.player;
//
const nowIndex = root.nowIndex;
//音频对象
const AudioManager = root.AudioManager;
//按钮设置(音乐数组, 当前的播放的音乐的index, audio对象)
const bindEvent = root.bindEvent;
//渲染函数
const render = root.render;

//这个作品的思想：
//面向对象 + 单对象编程思想， 所有引入函数都是只需要 两个参数 （data ， root对象）， 这样方便后续的维护
// 这个只是练习版本，只是表达一下我的思想而已

console.log(root)


const getData = () => {
    fetch(`http://localhost:3000/api/musics`)
        .then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data);

            bindEvent(data, root);
            
            AudioManager.getAudio(data[nowIndex].audio);

            render(data, root);
        }).catch((err) => {
            alert('请开启服务器, 在根目录server.js')
        })
}
getData();


window.onload = function () {
    console.log(document.body.offsetWidth)
    if (document.body.offsetWidth > 1024) {
        this.alert('请使用手机,pad模式打开本网页')
    }
}

// 关于root对象
/*
AudioManager: AudioManager {audio: audio, status: true}  播放器对象
bindEvent: ƒ bindEvent(data, root) 事件绑定对象
blurImg: ƒ blurImg(img, ele)  //高斯模糊 未使用 因为canvas禁止跨域， 只能在同源策略下使用
disk: {timer: 5, deg: 2096.999999999811, startRotate: ƒ, stopRotate: ƒ, changeSong: ƒ} 对旋转光盘的操作
nowIndex: 0  // 当前播放的歌曲索引
render: ƒ (data, root) // 渲染页面
*/


/**
 * 欢迎来到入口文件，
 * 
 * 后端传过来的数据，如果不好使，请用定时器+promise模拟一个ajax；
 * var data = 那个歌曲数据字符串
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve (data)
        })
    }).then((data) => {

    }).catch((err) => {

    })
 * 
 * gulp在绝对路径发生改变时会抽风， 不是我写的bug
 * 可以
 * 1.删除除了src和gulpfile。package.json之外的所有文件夹，
 * 改名备份 package.json文件夹， 
 * 从新npm init 再吧package.json的 包依赖 和 script 复制回去 ，
 * 再 npm i
 * 再 gulp 执行
 * [
    {
        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557147106191&di=beda36e75c0602746a03b24635bb3b50&imgtype=0&src=http%3A%2F%2Fimg2.soyoung.com%2Ftieba%2Fweb%2F20190114%2F3%2Fd44d0ec8fe54ed589affa5f8fbf79c3c_570.jpg",
        "audio": "http://fs.open.kugou.com/626fdc4e58846bbaae576e3cb0bf1943/5ccff716/G015/M04/1A/1D/r4YBAFUXWfKAC5ipAE868vsDFKw039.mp3",
        "song": "小小恋歌",
        "album": "MESSAGE",
        "singer": "新垣结衣",
        "duration": 325,
        "isLike": true
    },
    {
        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557147265654&di=0d028315d14069f72113a0a5bdebff0e&imgtype=0&src=http%3A%2F%2Fp1.music.126.net%2FbZa1R51K75wmRsrMD5F8dA%3D%3D%2F109951163094616046.jpg",
        "audio": "http://fs.open.kugou.com/9f2753995ae3b20088ec16043058e0b0/5ccffbc4/G110/M0B/11/11/TpQEAFmeosGAdSzlADDYbzQxJ8k322.mp3",
        "song": "青柠",
        "album": "青柠",
        "singer": "徐秉龙 桃十五",
        "duration": 200,
        "isLike": false
    },
    {
        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557147487355&di=153507d1842c7d6119ae9e5b846c71f6&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171126%2Fb4b871c6ff4749a0a4cac099de1e33cd.jpeg",
        "audio": "http://fs.open.kugou.com/9820adfaaa0835623d5e6a446aef7136/5ccfedaf/G108/M0B/10/1D/rA0DAFmNMtuAUhesADcks-2d4EQ165.mp3",
        "song": "带你去旅行",
        "album": "带你去旅行",
        "singer": "校长",
        "duration": 225,
        "isLike": false
    }
]
 */