"use strict";

//用来承接变量的立即执行函数，防止变量暴露
(function ($, root) {
    var nowIndex = 0;
    // function getIndex() {
    //     return nowIndex;
    // }
    // function setIndex(num) {
    //     return nowIndex = num;
    // }
    // root.getIndex = getIndex;
    // 因为nowIndex是引用值
    //避免频繁调用  root.nowIndex 
    root.nowIndex = nowIndex;
})(window.$, window.player || (window.player = {}));