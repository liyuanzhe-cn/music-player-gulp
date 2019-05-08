'use strict';

(function ($, root) {

    function bindEvent(data, root) {
        var disk = root.disk,
            render = root.render,
            AudioManager = root.AudioManager;


        var clearPlayerStateAndReplay = function clearPlayerStateAndReplay() {
            //偶和功能： 清空播放器播放状态，重新渲染和加载音乐并判断是否播放
            root.render(data, root);
            AudioManager.pause();
            AudioManager.getAudio(data[root.nowIndex].audio);
            AudioManager.status ? AudioManager.pause() : AudioManager.play();
            disk.changeSong();
        };

        $('.like').on('click', function () {
            data[root.nowIndex].isLike = !data[root.nowIndex].isLike;
            render(data, root);
        });

        $('.prev').on('click', function () {
            if (root.nowIndex == 0) {
                root.nowIndex = data.length - 1;
            } else {
                --root.nowIndex;
            }

            clearPlayerStateAndReplay();
            console.log("上一曲", root.nowIndex);
        });

        $('.next').on('click', function () {
            if (root.nowIndex == 0) {
                root.nowIndex = data.length - 1;
            } else {
                --root.nowIndex;
            }
            clearPlayerStateAndReplay();
            console.log("下一曲", root.nowIndex);
        });

        $('.play').on('click', function () {
            console.log(this);
            console.log('播放', data[root.nowIndex].audio);
            console.log(AudioManager.status);
            //AudioManager.status 为是否正在播放 ， true是正在播放， false是没有在播放，默认false
            if (AudioManager.status) {
                $(this).addClass('pause');
                disk.stopRotate();
                AudioManager.pause();
            } else {
                $(this).removeClass('pause');
                disk.startRotate();
                AudioManager.play();
            }
        });

        console.info('事件绑定完成');
    }
    root.bindEvent = bindEvent;
})(window.$, window.player || (window.player = {}));