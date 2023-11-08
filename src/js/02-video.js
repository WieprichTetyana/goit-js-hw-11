import Player from '@vimeo/player';
import throttle  from 'lodash.throttle';

const iframeVideoElem = document.querySelector("#vimeo-player");

const player = new Player(iframeVideoElem, {
    id: 19231868,
    width: 640
});

player.on('timeupdate', throttle(onTimeUpdate, 1000));
    function onTimeUpdate(data) {
        localStorage.setItem("videoplayer-current-time", data.seconds);   
        console.log(data.seconds);
};

const savedTime = localStorage.getItem("videoplayer-current-time");
if (savedTime) {
    player.setCurrentTime(savedTime)
        .then(function (seconds) {
            console.log("Video has been set to", seconds);
        })
        .catch(function (error) {
            console.error("An error occurred:", error);
        });
}
