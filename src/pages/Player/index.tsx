import {
  IntrinsicNodeStyleProps,
  IntrinsicTextNodeStyleProps,
  Text,
  View,
  hexColor,
} from "@lightningtv/solid";
import { createSignal, For, onMount, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Column, removeKeepAlive, Row } from "@lightningtv/solid/primitives";
import { isLoading, setGlobalBackground, setLoading } from "@/state";
import { destroy, init, load, play, pause, state, forward, backward } from "./hlsConfig";
import LoadingScreen from "../../components/loading/Spinner";
const PLAYER_BASE = "static/images/player/";

const buttonStyle = {
  width: 66,
  height: 66,
  color: "#ffffff4d",
  $focus: {
    color: "#ED1C24",
  },
};

const Player = () => {
  let parent;
  const navigate = useNavigate();
  const [playing, setPlaying] = createSignal(true);

  const _handlePlayPause = () => {
    if (state.playingState) {
      setPlaying(false);
      pause();
    } else {
      setPlaying(true);
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
    setLoading(true);
    setGlobalBackground("#000000");

    parent = document.querySelector('[data-testid="player"]') as HTMLElement;

    init(parent);

    load({
      streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    });

    const video = document.querySelector("video");
    video?.addEventListener(
      "playing",
      () => {
        setLoading(false);
      },
      { once: true },
    );

    play();
    setPlaying(true);
  });

  return (
    <Show when={!isLoading()} fallback={<LoadingScreen />}>
      <View
        onBackspace={() => {
          navigate(-1);
          destroy();
        }}
      >
        <Column width={1680} height={156} x={115} y={836} color={"#0000000"}>
          <Row width={995} height={90} justifyContent="spaceBetween" alignItems="center">
            <View style={buttonStyle} src={PLAYER_BASE + "back.png"} onEnter={_handleBack} />
            <Row alignItems="center" autofocus selected={1} scroll="none">
              <View
                style={buttonStyle}
                src={PLAYER_BASE + "rewind.png"}
                onEnter={_handleBackwards}
                width={66}
                height={66}
              />
              <View
                style={buttonStyle}
                src={PLAYER_BASE + (playing() ? "pause.png" : "play.png")}
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
          </Row>
        </Column>
      </View>
    </Show>
  );
};

export default Player;
