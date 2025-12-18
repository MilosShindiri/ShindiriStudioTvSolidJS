import styles from "@/styles";
import { For, View } from "@lightningtv/solid";
import { Column } from "@lightningtv/solid/primitives";
import TopChannel from "./TopChannel";

const topChannelsData = [
  { name: "CBS", image: "CBS.png" },
  { name: "NBC", image: "NBC.png" },
  { name: "ABC", image: "ABC.png" },
  { name: "Fox", image: "FOX.png" },
  { name: "Fox News Channel", image: "FNC.png" },
];

const TopChannels = () => {
  return (
    <Column style={styles.topChannels} alignItems="center">
      <For each={topChannelsData}>{channel => <TopChannel channel={channel} />}</For>
    </Column>
  );
};

export default TopChannels;
