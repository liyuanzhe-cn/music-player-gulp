'use strict';

(function ($, root) {

    function secondToMinute(second) {
        //秒转分钟
        return parseInt(second / 60) + ":" + (parseInt(second % 60) < 10 ? '0' + parseInt(second % 60) : parseInt(second % 60));
    }
    var timer = null;
    //渲染背景图片和专辑图片
    var renderImg = function renderImg(src) {
        // var img = new Image();
        // img.src = src;
        // img.onload = function () {

        $('.album-pic').css({
            backgroundImage: 'url(' + src + ')'
        });
        // canvas 不支持跨域，这个方法仅限于在同源策略下中使用
        // blurImg jq 插件采用canvas绘图技术
        // root.blurImg(img, $('.wrapper'))

        //删除之前的壁纸
        $(".bg-album").remove();
        var bgImg = $('<div class = "bg-album"></div>').css({
            width: "100%",
            height: '100%',
            position: "absolute",
            left: 0,
            top: 0,
            backgroundImage: 'url(' + src + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            filter: 'blur(5px)'
        });
        $('.wrapper').prepend(bgImg);
        // }
    };

    var renderInfo = function renderInfo(data) {
        $('.song-info').empty().append('\n                <div class="song-name">' + data.song + '</div>\n                <div class="singer-name">' + data.singer + '</div>\n                <div class="album-name">' + data.album + '</div>\n        ');
    };

    var renderProcess = function renderProcess(audio) {
        clearInterval(renderProcess.timer);
        // console.log(AudioManager.audio.currentTime)
        var ad = audio;
        renderProcess.timer = setInterval(function () {

            var percentage = ad.currentTime / ad.duration * 100 + '%';
            //播放完了 触发下一曲
            if (ad.currentTime / ad.duration >= 1) {
                $('.next').eq(0).trigger('click');
            }
            $('.curtime').html(secondToMinute(ad.currentTime));
            $('.slider').css('width', percentage);
            $('.totaltime').html(secondToMinute(ad.duration));
        }, 30);
    };

    var renderList = function renderList(data) {
        var str = '';
        data.map(function (ele, index) {
            str += '<li class="list-select-song" data-id="' + index + '">' + ele.song + '</li>';
        });
        $('.song-list').find('ul').empty().html(str);
    };

    var renderControl = {
        isLike: function isLike(like) {
            if (like) {
                $('.btn.like').addClass('liking');
            } else {
                $('.btn.like').removeClass('liking');
            }
        }
    };

    root.render = function (data, root) {
        var AudioManager = root.AudioManager;


        renderImg(data[root.nowIndex].image);
        renderInfo(data[root.nowIndex]);
        renderControl.isLike(data[root.nowIndex].isLike);
        renderProcess(AudioManager.audio);
        renderList(data);
    };
    //实例方法

})(window.jQuery, window.player || (window.player = {}));

//面向对象设计思想
// 第一次先创建对象 window.player
// 之后再使用插件时 会使用已创建对象
// 再根据面向对象实现方法的调用
// (function ($, root) {
//     let fn = () => {
//     }
//     root.render = fn;
// }(window.jQuery, window.player || (window.player = {})))