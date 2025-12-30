import {
  IntrinsicNodeStyleProps,
  IntrinsicTextNodeStyleProps,
  Text,
  View,
  hexColor,
} from "@lightningtv/solid";
import { createSignal, onCleanup, onMount } from "solid-js";
import {
  init,
  load,
  play,
  pause,
  getCurrentTime,
  getVideoDuration,
  state,
  getTimeFormat,
  destroy,
  seekForward,
  seekBackward,
} from "../Player/hlsConfig";
import { useNavigate } from "@solidjs/router";
import { removeKeepAlive, Row } from "@lightningtv/solid/primitives";
import { setGlobalBackground } from "@/state";

const Player = () => {
  let parent;
  let playerInterval;
  const navigate = useNavigate();
  const [playingState, setPlayingState] = createSignal(true);
  const [currentTime, setCurrentTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  const [progressFill, setProgressFill] = createSignal(0);

  removeKeepAlive("navbar");
  setGlobalBackground(" ");

  let playerWrapperRef;
  let playerUIRef;
  let isVisible = true;

  const playerWrapperStyles = {
    width: 1920,
    height: 300,
    y: 800,
  };

  const playerBtnStyles = {
    $focus: {
      color: "#EB2827",
    },
    color: "#FFFFFF",
    width: 70,
    height: 70,
  };

  const progressBarStyles = {
    width: 1760,
    height: 10,
    color: 0xffffff55,
    y: 100,
    x: 80,
    borderRadius: 10,
    // alpha: 0.33,
  };

  const progressBarFillStyles = {
    width: 200,
    color: "#EB2827",
    // alpha: 1,
    borderRadius: 10,
  };

  const togglePlayPause = () => {
    if (isVisible) {
      if (state.playingState === true) {
        pause();
        setPlayingState(false);
      } else {
        play();
        setPlayingState(true);
      }
    }
  };

  const seekFW = () => {
    seekForward();
  };

  const seekRW = () => {
    seekBackward();
  };

  onMount(() => {
    parent = document.querySelector('[data-testid="player"]') as HTMLElement;
    init(parent);
    load({
      streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    });
    play();

    playerInterval = setInterval(() => {
      console.log("asdff cr, dr, timeformat", getCurrentTime(), getVideoDuration(), getTimeFormat());
      const [cur, dur] = getTimeFormat().split(" : ");
      setCurrentTime(cur);
      setDuration(dur);
      setProgressFill((getCurrentTime() / getVideoDuration()) * 100);
    }, 1000);

    /* const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        hidePlayerUIDebounced();
      }
    };
    window.addEventListener("keydown", handleKey); */

    hidePlayerUIDebounced();
  });

  const showPlayerUI = () => {
    playerWrapperRef.alpha = 1;
    isVisible = true;
    playerUIRef.setFocus();
  };

  const hidePlayerUI = () => {
    playerWrapperRef.alpha = 0;
    isVisible = false;
    playerWrapperRef.setFocus();
    playerUIRef.selected = 1;
  };
  let hideTimeout;

  const hidePlayerUIDebounced = () => {
    clearTimeout(hideTimeout);
    showPlayerUI();
    hideTimeout = setTimeout(() => {
      hidePlayerUI();
    }, 5000);
  };

  onCleanup(() => {
    clearTimeout(hideTimeout);
    clearInterval(playerInterval);
  });

  return (
    <View
      zind
      onBackspace={() => {
        navigate(-1);
        destroy();
      }}
    >
      <View
        ref={playerWrapperRef}
        id="player-wrapper"
        style={playerWrapperStyles}
        onEnter={() => hidePlayerUIDebounced()}
        onLeft={() => hidePlayerUIDebounced()}
        onRight={() => hidePlayerUIDebounced()}
      >
        <Row
          ref={playerUIRef}
          autofocus
          id="player-controls"
          justifyContent="center"
          scroll="none"
          selected={1}
        >
          <View style={playerBtnStyles} src="assets/fast-backward.svg" onEnter={() => seekRW()} />
          <View
            style={playerBtnStyles}
            onEnter={() => togglePlayPause()}
            src={playingState() ? "assets/pause.svg" : "assets/play.svg"}
          />
          <View style={playerBtnStyles} src="assets/fast-forward.svg" onEnter={() => seekFW()} />
        </Row>
        <View id="current-time" x={78} y={50}>
          <Text mountX={0} fontSize={28}>{`${currentTime()}`}</Text>
        </View>
        <View id="duration" x={1840} y={50}>
          <Text mountX={1} fontSize={28}>{`${duration()}`}</Text>
        </View>
        <View id="progressbar" style={progressBarStyles}>
          <View
            id="progressbar-fill"
            width={(progressFill() * 1760) / 100}
            style={progressBarFillStyles}
          ></View>
        </View>
      </View>
    </View>
  );
};

export default Player;
