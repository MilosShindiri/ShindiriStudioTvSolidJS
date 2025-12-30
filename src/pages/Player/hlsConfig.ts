import Hls from "hls.js/dist/hls.js";
import shaka from "shaka-player";

let player;
let videoElement;

export const state = {
  playingState: false,
};

export const init = async element => {
  player = new Hls({
    debug: false,
    liveBackBufferLength: 30,
    enableWorker: false,
    maxBufferLength: 30,
  });

  videoElement = element;

  if (!videoElement) {
    videoElement = document.createElement("video");

    videoElement.style.cssText = "position: absolute; top: 0; left: 0; z-index: -1";

    videoElement.width = window.innerWidth;
    videoElement.height = window.innerHeight;

    videoElement.autoplay = true;
    videoElement.preload = true;
    videoElement.muted = false;

    player.on(Hls.Events.ERROR, err => {
      console.error(err);
    });
    document.body.insertBefore(videoElement, document.body.firstChild);
  }
};
/**
 * Loads the player.
 * @param {Object} config - The player configuration.
 * @returns {Promise<void>}
 */
export const load = async config => {
  if (!player || !videoElement) {
    throw "Player not initialized yet";
  }

  player.attachMedia(videoElement);
  player.loadSource(config.streamUrl);
};

export const play = () => {
  videoElement.play().then(() => {
    state.playingState = true;
  });
};

export const pause = () => {
  videoElement.pause();
  state.playingState = false;
};

export const destroy = async () => {
  await player.destroy();

  player = null;
  videoElement.remove();
  videoElement = null;
};

export const getCurrentTime = () => {
  return videoElement.currentTime;
};

export const getVideoDuration = () => {
  return videoElement.duration;
};

export const getTimeFormat = () => {
  let secondsToMmSs = seconds => new Date(seconds * 1000).toISOString().substr(14, 5);
  return `${secondsToMmSs(videoElement.currentTime)} : ${secondsToMmSs(Math.floor(videoElement.duration))}`;
};

export const seekForward = (seconds = 30) => {
  if (videoElement) {
    videoElement.currentTime = Math.min(videoElement.currentTime + seconds, videoElement.duration);
  }
};

export const seekBackward = (seconds = 10) => {
  if (videoElement) {
    videoElement.currentTime = Math.max(videoElement.currentTime - seconds, 0);
  }
};

export default {
  init,
  load,
  play,
  pause,
  getCurrentTime,
  getVideoDuration,
  getTimeFormat,
  state,
  destroy,
};
