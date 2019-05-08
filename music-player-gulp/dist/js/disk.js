'use strict';

(function ($, root) {
    var disk = {
        timer: null,
        deg: 0,
        startRotate: function startRotate() {
            var _this = this;

            clearInterval(this.timer);
            this.timer = setInterval(function () {
                _this.deg += 0.3;
                $('.album-pic').css({
                    transform: 'rotateZ(' + _this.deg + 'deg)',
                    transformOrigin: 'center center'
                });
            }, 30);
        },
        stopRotate: function stopRotate() {
            clearInterval(this.timer);
        },
        changeSong: function changeSong() {
            console.log(this);
            this.deg = 0;
            this.startRotate();
        },
        diskZeroDeg: function diskZeroDeg() {
            this.deg = 0;
        }
    };
    root.disk = disk;
})(window.$, window.player || (window.player = {}));