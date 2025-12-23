import { Text, View } from "@lightningtv/solid";

const GoLiveButtonStyle = {
  borderRadius: 30,
  width: 352,
  height: 67,
  top: 19,
  color: "#2f2f2f",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  $focus: {
    color: "#ED1C24",
  },
} as const;

const GoLiveButtonLabel = {
  fontFace: "Inter",
  fontWeight: 600,
  fontSize: 24,
  letterSpacing: 0.06,
  display: "flex",
} as const;

const GoLiveButton = props => {
  return (
    <View style={GoLiveButtonStyle}>
      <Text style={GoLiveButtonLabel}>GO TO LIVE PLAYER</Text>
    </View>
  );
};

export default GoLiveButton;
