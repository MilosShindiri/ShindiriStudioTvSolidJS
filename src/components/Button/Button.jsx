import { View, Text } from "@lightningtv/solid";

const styles = {
  container: {
    // $focus: {
    //   color: 0x58807dff,
    // },
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
};

styles.text = {
  fontFamily: "Roboto",
  fontSize: 32,
  height: 50,
  color: "#fff",
  $focus: {
    color: 0x58807dff,
  },
};

export default function Button(props) {
  return (
    <View {...props} forwardStates style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
}
