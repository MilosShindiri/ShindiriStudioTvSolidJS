import { setLoading } from "@/state";
import Hls from "hls.js";
import { createSignal } from "solid-js";
let player;
let videoElement;

export const [isPlaying, setIsPlaying] = createSignal(false);
export const [currentTime, setCurrentTime] = createSignal(0);
export const [duration, setDuration] = createSignal(0);
export const [isBuffering, setIsBuffering] = createSignal(false);

const bindVideoEvents = () => {
  videoElement.addEventListener("playing", () => {
    setIsPlaying(true);
  });

  videoElement.addEventListener("pause", () => {
    setIsPlaying(false);
  });

  videoElement.addEventListener("timeupdate", () => {
    setCurrentTime(videoElement.currentTime);
  });

  videoElement.addEventListener("loadedmetadata", () => {
    setDuration(videoElement.duration);
    setLoading(false);
    setIsBuffering(false);
  });

  videoElement.addEventListener("canplay", () => {
    setIsBuffering(false);
  });

  videoElement.addEventListener("seeking", () => {
    setIsBuffering(true);
  });
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
    videoElement.muted = false;
    videoElement.playsInline = true;
    videoElement.setAttribute("webkit-playsinline", "true");

    document.body.insertBefore(videoElement, document.body.firstChild);
  }
  bindVideoEvents();
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
};

export const pause = () => {
  videoElement.pause();
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
  currentTime,
  duration,
  getTimeFormat,
  destroy,
  forward,
  backward,
  isPlaying,
  isBuffering,
};
