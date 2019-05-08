"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($, root) {
    var AudioManager = function () {
        function AudioManager() {
            _classCallCheck(this, AudioManager);

            this.audio = new Audio();
            // this.audio.src = src;
            //默认暂停状态
            this.status = false;
        }

        _createClass(AudioManager, [{
            key: "play",
            value: function play() {
                this.audio.play();
                this.status = true;
            }
        }, {
            key: "pause",
            value: function pause() {
                this.audio.pause();
                this.status = false;
            }
        }, {
            key: "getAudio",
            value: function getAudio(src) {
                console.log(src);
                this.audio.src = src;
                this.audio.load();
            }
        }]);

        return AudioManager;
    }();

    root.AudioManager = new AudioManager();
})(window.$, window.player || (window.player = {}));