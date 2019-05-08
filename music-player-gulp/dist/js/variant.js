"use strict";

//用来承接变量的立即执行函数，防止变量暴露
(function ($, root) {
    var nowIndex = 0;

    root.nowIndex = nowIndex;
})(window.$, window.player || (window.player = {}));