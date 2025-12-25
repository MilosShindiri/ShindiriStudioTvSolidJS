import { View, Text } from "@lightningtv/solid";
import play from "/static/images/play.png";

const WatchNowButtonStyle = {
  width: 286,
  height: 78,
  borderRadius: 300,
  gap: 10,
  color: "#2F2F2F",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  $focus: {
    color: "#ED1C24",
  },
} as const;
const WatchNowLabelStyle = {
  fontFamily: "Inter",
  fontWeight: 600,
  fontSize: 20,
  lineHeight: 1,
  letterSpacing: 0.08,
} as const;
const WatchNowButton = props => {
  return (
    <View style={WatchNowButtonStyle}>
      <View src={play} width={24} height={24} />
      <Text style={WatchNowLabelStyle}>WATCH NOW</Text>
    </View>
  );
};

export default WatchNowButton;
