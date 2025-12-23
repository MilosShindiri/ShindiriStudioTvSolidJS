import { activeElement, For, Text, View } from "@lightningtv/solid";
import { Column, Row } from "@lightningtv/solid/primitives";
import Card from "../Home/components/Card";
import { children, createEffect, createResource, on, Show } from "solid-js";
import { setGlobalBackground } from "@/state";
import background from "../../assets/background.jpg";
import { Background } from "@/components/Background";
import styles from "@/styles";
import TopChannels from "./components/TopChannels";
import GoLiveButton from "./components/GoLiveButton";

const HomeStyle = {
  fontFamily: "Inter",
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: 0.06,
  color: "#FFFFFF",
} as const;

const Home = props => {
  setGlobalBackground(background);
  return (
    <Show when={props.data.rows[0].items()}>
      <View style={styles.page} forwardFocus={1}>
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
                      <For each={row.items()}>{item => <Card item={item} style={styles.homeCard} />}</For>
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
