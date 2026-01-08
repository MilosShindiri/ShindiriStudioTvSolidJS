import Hls from "hls.js";
import { createSignal } from "solid-js";
import { setLoading } from "@/state";

/**
 * Internal refs
 */
let player: Hls | null = null;
let videoElement: HTMLVideoElement | null = null;
let destroyed = false;

/**
 * Public signals
 */
export const [isPlaying, setIsPlaying] = createSignal(false);
export const [currentTime, setCurrentTime] = createSignal(0);
export const [duration, setDuration] = createSignal(0);
export const [isBuffering, setIsBuffering] = createSignal(false);

/**
 * Helpers
 */
const safe = (fn: () => void) => {
  if (!destroyed && videoElement) fn();
};

/**
 * Bind video events
 */
const bindVideoEvents = () => {
  if (!videoElement) return;

  videoElement.addEventListener("playing", () => safe(() => setIsPlaying(true)));

  videoElement.addEventListener("pause", () => safe(() => setIsPlaying(false)));

  videoElement.addEventListener("timeupdate", () => safe(() => setCurrentTime(videoElement!.currentTime)));

  videoElement.addEventListener("loadedmetadata", () =>
    safe(() => {
      setDuration(videoElement!.duration || 0);
      setLoading(false);
      setIsBuffering(false);
    }),
  );

  videoElement.addEventListener("waiting", () => safe(() => setIsBuffering(true)));

  videoElement.addEventListener("canplay", () => safe(() => setIsBuffering(false)));

  videoElement.addEventListener("seeking", () => safe(() => setIsBuffering(true)));
};

/**
 * Init player
 */
export const init = (element?: HTMLVideoElement | HTMLElement) => {
  destroyed = false;

  player = new Hls({
    debug: false,
    enableWorker: false, // TV SAFE
    liveBackBufferLength: 30,
    maxBufferLength: 30,
    backBufferLength: 30,
  });

  if (element instanceof HTMLVideoElement) {
    videoElement = element;
  } else {
    videoElement = document.createElement("video");

    videoElement.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1";

    videoElement.preload = "auto";
    videoElement.autoplay = false;
    videoElement.muted = false;
    videoElement.playsInline = true;
    videoElement.setAttribute("webkit-playsinline", "true");

    document.body.insertBefore(videoElement, document.body.firstChild);
  }

  bindVideoEvents();
};

/**
 * Load stream
 */
export const load = (config: { streamUrl: string }) => {
  if (!player || !videoElement || destroyed) return;

  setLoading(true);
  setIsBuffering(true);

  player.attachMedia(videoElement);

  if (destroyed) return;

  player.loadSource(config.streamUrl);
};

/**
 * Controls
 */
export const play = async () => {
  if (!videoElement || destroyed) return;
  await videoElement.play().catch(() => {});
};

export const pause = () => {
  if (!videoElement || destroyed) return;
  videoElement.pause();
};

export const forward = () => {
  if (!videoElement || destroyed) return;
  videoElement.currentTime = Math.min(videoElement.currentTime + 5, videoElement.duration || Infinity);
};

export const backward = () => {
  if (!videoElement || destroyed) return;
  videoElement.currentTime = Math.max(videoElement.currentTime - 5, 0);
};

/**
 * Destroy (CRITICAL FOR TV)
 */
export const destroy = () => {
  destroyed = true;

  if (player) {
    try {
      player.stopLoad();
      player.detachMedia();
      player.destroy();
    } catch {}
    player = null;
  }

  if (videoElement) {
    try {
      videoElement.pause();
      videoElement.removeAttribute("src");
      videoElement.load(); // force GC
      videoElement.remove();
    } catch {}
    videoElement = null;
  }

  setIsPlaying(false);
  setIsBuffering(false);
  setCurrentTime(0);
  setDuration(0);
  setLoading(false);
};

/**
 * Utils
 */
export const getCurrentTime = () => currentTime();
export const getVideoDuration = () => duration();

export const getTimeFormat = () => {
  const f = (s = 0) => new Date(s * 1000).toISOString().substring(14, 19);
  return `${f(currentTime())} / ${f(duration())}`;
};

/**
 * Public API
 */
export default {
  init,
  load,
  play,
  pause,
  forward,
  backward,
  destroy,
  currentTime,
  duration,
  isPlaying,
  isBuffering,
  getTimeFormat,
};
