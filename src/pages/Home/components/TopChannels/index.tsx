import styles from "@/styles";
import { For, Text } from "@lightningtv/solid";
import { Column } from "@lightningtv/solid/primitives";
import TopChannel from "./TopChannel";

const topChannelsData = [
  { name: "CBS", image: "CBS.png" },
  { name: "NBC", image: "NBC.png" },
  { name: "ABC", image: "ABC.png" },
  { name: "Fox", image: "FOX.png" },
  { name: "Fox News Channel", image: "FNC.png" },
];

const TopChannelLabelStyle = {
  fontFamily: "Inter",
  fontWeight: 700,
  fontSize: 24,
  lineHeight: 1,
  width: 280,
  height: 29,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlighn: "center",
} as const;

const TopChannels = () => {
  return (
    <Column style={styles.topChannelsWrapper} flexBoundary="fixed">
      <Text style={TopChannelLabelStyle} skipFocus>
        Top 5 Channels
      </Text>
      <For each={topChannelsData}>{channel => <TopChannel channel={channel} />}</For>
    </Column>
  );
};

export default TopChannels;
