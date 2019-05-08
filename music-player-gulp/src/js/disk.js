(function ($, root) {
    let disk = {
        timer: null,
         deg:0,
        startRotate(){
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.deg += 0.3;
                $('.album-pic').css({
                    transform: 'rotateZ(' + this.deg + 'deg)',
                    transformOrigin: 'center center'
                })
            }, 30)
        },
        stopRotate(){
            clearInterval(this.timer);
        },
        changeSong(){
            console.log(this)
            this.deg = 0;
            this.startRotate();
        },
        diskZeroDeg() {
            this.deg = 0;
        }

    }
    root.disk = disk;
})(window.$, window.player|| (window.player={}))