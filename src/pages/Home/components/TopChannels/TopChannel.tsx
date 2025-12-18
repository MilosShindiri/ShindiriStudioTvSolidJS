import { Text, View } from "@lightningtv/solid";

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
};

const TopChannelTextStyle = {
  fontFamily: "Inter",
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1,
  height: 19,
};

const TopChannel = props => {
  console.log(props.channel);
  return (
    <View style={TopChannelStyle} id="card">
      <View width={45} height={45} src={"assets/channels/" + props.channel.image}></View>
      <Text>{props.channel.name}</Text>
    </View>
  );
};

export default TopChannel;
