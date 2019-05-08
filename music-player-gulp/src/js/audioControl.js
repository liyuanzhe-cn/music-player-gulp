(function ($, root) {

    class AudioManager {
        constructor() {
            this.audio = new Audio();
            // this.audio.src = src;
            //默认暂停状态
            this.status = false
        }

        play () {
            this.audio.play();
            this.status = true
        }
        
        pause() {
            this.audio.pause();
            this.status = false
            
        }
        getAudio(src) {
            console.log(src)
            this.audio.src = src;
            this.audio.load();
        }
    }    

    root.AudioManager = new AudioManager();

})(window.$, window.player || (window.player = {}))