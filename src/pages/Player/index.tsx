import {
  IntrinsicNodeStyleProps,
  IntrinsicTextNodeStyleProps,
  Text,
  View,
  hexColor,
} from "@lightningtv/solid";
import { createEffect, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Column, removeKeepAlive, Row } from "@lightningtv/solid/primitives";
import { isLoading, setGlobalBackground, setIsPlayerActive, setLoading } from "@/state";
import {
  destroy,
  init,
  load,
  play,
  pause,
  isPlaying,
  isBuffering,
  currentTime,
  duration,
  forward,
  backward,
} from "./hlsConfig";
import LoadingScreen from "../../components/loading/Spinner";
import formatTimeHMS from "../../utils/formatTimeHMS";
const PLAYER_BASE = "static/images/player/";

const buttonStyle = {
  width: 66,
  height: 66,
  color: "#ffffff4d",
  $focus: {
    color: "#ED1C24",
  },
};

const timeLabelStyle = {
  fontFace: "Inter",
  fontWeight: 700,
  fontSize: 26,
  lineHeight: 1,
  letterSpacing: 0,
};

const Player = () => {
  let parent;
  let backBtnRef;
  let centerRowRef;

  const navigate = useNavigate();
  // createEffect(() => {
  //   console.log(currentTime() / duration());
  // });
  const _handlePlayPause = () => {
    if (isPlaying()) {
      pause();
    } else {
      play();
    }
  };

  const _handleBackwards = () => {
    backward();
  };

  const _handleForwards = () => {
    forward();
  };

  const _handleBack = () => {
    navigate(-1);
    destroy();
  };

  removeKeepAlive("navbar");
  setGlobalBackground(" ");

  onMount(async () => {
    setIsPlayerActive(true);
    setLoading(true);
    // setGlobalBackground("#000000");

    parent = document.querySelector('[data-testid="player"]') as HTMLElement;

    init(parent);

    load({
      streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    });

    const video = document.querySelector("video");
    // video?.addEventListener(
    //   "playing",
    //   () => {
    //     setLoading(false);
    //   },
    //   { once: true },
    // );

    play();
  });

  onCleanup(() => {
    setIsPlayerActive(false);
    destroy();
  });

  return (
    <>
      <Show when={!isLoading()} fallback={<LoadingScreen />}>
        <View
          onBackspace={() => {
            destroy();
            navigate(-1);
            return;
          }}
        >
          <View id="gradient" width={1920} height={1080} colorBottom="#000000" colorTop="#0000000" />
          <View
            display={"flex"}
            flexDirection="column"
            justifyContent="center"
            width={1680}
            height={126}
            x={115}
            y={836}
            color={"#0000000"}
            scroll="none"
          >
            <View>
              <View
                style={buttonStyle}
                src={PLAYER_BASE + "back.png"}
                onEnter={_handleBack}
                ref={backBtnRef}
                onRight={() => {
                  centerRowRef?.setFocus();
                }}
              />
              {/* </Row> */}

              {/* Row za centralna dugmad */}
              <Row
                ref={centerRowRef}
                width={1690}
                height={60}
                alignItems="center"
                justifyContent="center"
                scroll="none"
                autofocus
                selected={1}
                onLeft={() => {
                  backBtnRef?.setFocus();
                }}
                onUp={e => {
                  e.stopPropagation();
                }}
              >
                <View
                  style={buttonStyle}
                  src={PLAYER_BASE + "rewind.png"}
                  onEnter={_handleBackwards}
                  width={66}
                  height={66}
                />
                <View
                  style={buttonStyle}
                  src={PLAYER_BASE + (isPlaying() ? "pause.png" : "play.png")}
                  onEnter={_handlePlayPause}
                  width={90}
                  height={90}
                />
                <View
                  style={buttonStyle}
                  src={PLAYER_BASE + "forward.png"}
                  onEnter={_handleForwards}
                  width={66}
                  height={66}
                />
              </Row>
            </View>
            <View
              height={31}
              display="flex"
              flexDirection="row"
              justifyContent="spaceBetween"
              alignItems="center"
            >
              <Text style={timeLabelStyle} width={119} height={31}>
                {formatTimeHMS(currentTime())}
              </Text>
              <View width={1404} height={9} color={"#d9d9d91c"}>
                <View color={"#ED1C24"} width={(currentTime() / duration()) * 1404}></View>
              </View>
              <Text style={timeLabelStyle} width={119} height={31}>
                {formatTimeHMS(duration())}
              </Text>
            </View>
          </View>
        </View>
      </Show>
      <Show when={isBuffering()}>
        <LoadingScreen />
      </Show>
    </>
  );
};

export default Player;
