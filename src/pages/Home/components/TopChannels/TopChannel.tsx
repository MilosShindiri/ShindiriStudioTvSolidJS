import { Text, View } from "@lightningtv/solid";
const CHANNELS_BASE = "static/images/channels/";

const TopChannelStyle = {
  width: 280,
  height: 136,
  color: "#181818",
  borderRadius: 16,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 24,
  $focus: {
    border: { width: 4, color: "#ED1C24" },
  },
} as const;

const TopChannelTextStyle = {
  fontFamily: "Inter",
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1,
  height: 19,
} as const;

const TopChannel = props => {
  return (
    <View style={TopChannelStyle} id="card">
      <View width={45} height={45} src={CHANNELS_BASE + props.channel.image}></View>
      <Text style={TopChannelTextStyle}>{props.channel.name}</Text>
    </View>
  );
};

export default TopChannel;
