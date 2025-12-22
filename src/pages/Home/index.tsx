import { activeElement, For, Text, View } from "@lightningtv/solid";
import { Column, Row } from "@lightningtv/solid/primitives";
import Card from "../Home/components/Card";
import { createEffect, createResource, on, Show } from "solid-js";
import { setGlobalBackground } from "@/state";
import background from "../../assets/background.jpg";
import { Background } from "@/components/Background";
import styles from "@/styles";
import TopChannels from "./components/TopChannels";

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
    <View style={styles.page}>
      <Background />
      <View id="gradient" width={1920} height={1080} colorTl="#0000000" colorBr="#151515" />
      <Row id="homeContainer" y={125} x={62} scroll="none">
        <Column id="mediaContainer" width={1241} height={404} autofocus>
          <For each={props.data.rows}>
            {row => (
              <View width={1241} height={404} forwardFocus={1}>
                <Text style={HomeStyle}>{row.title}</Text>
                <Row y={45} width={1241} height={359} gap={24} scroll="none" forwardFocus={0}>
                  <For each={row.items()}>
                    {item => <Card item={item} style={styles.homeCard} forwardFocus={0} />}
                  </For>
                </Row>
              </View>
            )}
          </For>
        </Column>
        <TopChannels />
      </Row>
    </View>
  );
};

export default Home;
