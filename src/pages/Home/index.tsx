import { activeElement, For, Text, View } from "@lightningtv/solid";
import { Column, removeKeepAlive, Row } from "@lightningtv/solid/primitives";
import Card from "../Home/components/Card";
import { createEffect, on, Show } from "solid-js";
import { setBackgroundHeight, setBackgroundWidth, setGlobalBackground } from "@/state";
import background from "../../../public/assets/background.jpg";
import styles from "@/styles";
import TopChannels from "./components/TopChannels";
import GoLiveButton from "./components/GoLiveButton";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import LoadingScreen from "@/components/loading/Spinner";

const HomeStyle = {
  fontFamily: "Inter",
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: 0.06,
  color: "#FFFFFF",
} as const;

const Home = props => {
  setBackgroundWidth(1920);
  setBackgroundHeight(1080);
  setGlobalBackground(background);

  const homeElFocused = () => {
    setGlobalBackground(background);
  };

  removeKeepAlive("movies");

  const { toDetails } = useAppNavigation();
  return (
    <Show when={props.data.rows[0].items()} fallback={<LoadingScreen />}>
      <View style={styles.page} forwardFocus={1} onFocus={homeElFocused}>
        {/* <Background /> */}
        <View id="gradient" width={1920} height={1080} colorTl="#151515" colorBr="#00000000" />
        <Column y={125} x={62} gap={5}>
          <Row id="homeContainer" scroll="none">
            <Column id="mediaContainer" width={1241} height={404} autofocus>
              <For each={props.data.rows}>
                {row => (
                  <>
                    <Text style={HomeStyle} skipFocus>
                      {row.title}
                    </Text>
                    <Row width={1241} height={359} gap={24} scroll="none">
                      <For each={row.items()}>
                        {item => (
                          <Card
                            item={item}
                            style={styles.homeCard}
                            onEnter={() => toDetails(item.id, row.title)}
                          />
                        )}
                      </For>
                    </Row>
                  </>
                )}
              </For>
            </Column>
            <TopChannels />
          </Row>
          <GoLiveButton />
        </Column>
      </View>
    </Show>
  );
};

export default Home;
