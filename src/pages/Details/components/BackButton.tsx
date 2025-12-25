import { View } from "@lightningtv/solid";
import backArrow from "/static/images/vector.png";
import { useNavigate } from "@solidjs/router";

const BackButtonStyle = {
  width: 112,
  height: 64,
  borderRadius: 300,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#2F2F2F",
  $focus: {
    color: "#ED1C24",
  },
} as const;

const BackButton = props => {
  const navigate = useNavigate();
  return (
    <View style={BackButtonStyle} onEnter={() => history.back()}>
      <View src={backArrow} width={48} height={48}></View>
    </View>
  );
};

export default BackButton;
