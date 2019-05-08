'use strict';

(function ($, root) {

    function bindEvent(data, root) {
        var disk = root.disk,
            render = root.render,
            AudioManager = root.AudioManager;


        var clearPlayerStateAndReplay = function clearPlayerStateAndReplay() {
            //歌曲切换时执行
            AudioManager.pause();
            AudioManager.getAudio(data[root.nowIndex].audio);
            AudioManager.play();
            disk.changeSong();
            $('.play').removeClass('pause');
            render(data, root);
        };

        var playSong = function playSong() {
            AudioManager.play();
            disk.startRotate();
            $('.play').removeClass('pause');
        };

        var pauseSong = function pauseSong() {
            AudioManager.pause();
            disk.stopRotate();
            $('.play').addClass('pause');
        };

        $('.like').on('click', function () {
            data[root.nowIndex].isLike = !data[root.nowIndex].isLike;
            // clearPlayerStateAndReplay(AudioManager.status)
            $.ajax({
                url: 'http://localhost:3000/api/changeLike',
                method: 'post',
                data: { data: JSON.stringify(data) },
                success: function success(res) {
                    var data = JSON.parse(res);
                    render(data, root);
                    console.log(data);
                },
                fail: function fail() {
                    console.log('"我喜欢"信息写入失败');
                }
            });
            render(data, root);
        });

        $('.prev').on('click', function () {
            if (root.nowIndex == 0) {
                root.nowIndex = data.length - 1;
            } else {
                --root.nowIndex;
            }
            clearPlayerStateAndReplay(true);
            console.log("上一曲", root.nowIndex);
        });

        $('.next').on('click', function () {
            if (root.nowIndex == 0) {
                root.nowIndex = data.length - 1;
            } else {
                --root.nowIndex;
            }
            clearPlayerStateAndReplay(true);
            console.log("下一曲", root.nowIndex);
        });

        $('.play').on('click', function () {
            //AudioManager.status 为是否正在播放 ， true是正在播放， false是没有在播放，默认false
            if (AudioManager.status) {
                pauseSong();
            } else {
                playSong();
            }
        });

        $('.slider-bar').on('click', function (e) {
            //AudioManager.status 为是否正在播放 ， true是正在播放， false是没有在播放，默认false
            //播放进度
            // console.log(e.offsetX, e.target.offsetWidth);
            var percentage = e.offsetX / this.offsetWidth;
            AudioManager.audio.currentTime = AudioManager.audio.duration * percentage;
            playSong();
            render(data, root);
        });

        $('.btn.list').on('click', function (e) {
            var listHeight = $('.song-list')[0].offsetHeight;
            $('.song-list').css({
                top: "calc(100vh - " + listHeight + "px)"
            });
        });

        $('.close-list').on('click', function (e) {
            var listHeight = -$('.song-list')[0].offsetHeight;
            $('.song-list').css({
                top: "100vh"
            });
        });

        $('.song-list>ul').on('click', 'li', function (e) {
            root.nowIndex = $(e.target).data('id');
            console.log(root.nowIndex);
            clearPlayerStateAndReplay();
            $('.close-list').trigger('click');
        });

        console.info('事件绑定完成');
    }
    root.bindEvent = bindEvent;
})(window.$, window.player || (window.player = {}));