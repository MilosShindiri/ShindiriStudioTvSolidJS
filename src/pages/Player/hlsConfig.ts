import Hls from "hls.js";
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

    videoElement.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1";

    videoElement.autoplay = false;
    videoElement.preload = true;
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.setAttribute("webkit-playsinline", "true");

    document.body.insertBefore(videoElement, document.body.firstChild);
  }
};

export const load = async config => {
  if (!player || !videoElement) {
    throw "Player not initialized yet";
  }

  player.attachMedia(videoElement);
  player.loadSource(config.streamUrl);
};

export const play = async () => {
  await videoElement.play().catch(() => {});
  state.playingState = true;
};

export const pause = () => {
  videoElement.pause();
  state.playingState = false;
};

export const destroy = () => {
  if (videoElement) {
    videoElement.pause();
    videoElement.remove();
    videoElement = null;
  }
};

export const forward = () => {
  if (videoElement) {
    videoElement.currentTime = Math.min(videoElement.currentTime + 5, videoElement.duration);
  }
};

export const backward = () => {
  if (videoElement) {
    videoElement.currentTime = videoElement.currentTime - 5;
  }
};

export const getCurrentTime = () => videoElement.currentTime;

export const getVideoDuration = () => videoElement.duration;

export const getTimeFormat = () => {
  const f = s => new Date(s * 1000).toISOString().substr(14, 5);
  return `${f(videoElement.currentTime)} : ${f(Math.floor(videoElement.duration))}`;
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
  forward,
  backward,
};
