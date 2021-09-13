
import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);

const iframeVimeo = qs('iframe');
const player = new Vimeo.Player(iframeVimeo);
const setStorageTime = seconds => localStorage.setItem('videoplayer-current-time', seconds);
const getStorageTime = () => localStorage.getItem('videoplayer-current-time');

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const setVideoCurrentTime = videoTime => {
  player
    .setCurrentTime(videoTime())
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;
        default:
          break;
      }
    });
};

const getVideoTime = () => {
  player
    .getCurrentTime()
    .then(function (seconds) {
      setStorageTime(seconds);
    })
    .catch(function (error) {
      console.log(error);
    });
};

setVideoCurrentTime(getStorageTime);

player.on('timeupdate', throttle(getVideoTime, 1000));
