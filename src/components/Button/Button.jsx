import { View, Text } from "@lightningtv/solid";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontFamily: "Roboto",
    fontSize: 32,
    color: "#575757",
    // $focus: {
    //   color: 0xffffffff,
    // },
  },

  underline: {
    width: "100%",
    height: 4,
    y: 4,
    color: 0xff0000ff,
    alpha: 0,
    $focus: {
      alpha: 1,
    },
  },
};

export default function Button(props) {
  return (
    <View forwardStates style={styles.container} {...props}>
      <Text style={styles.text} color={props.selected ? "#ffffff" : "#575757"}>
        {props.children}
      </Text>
      <View style={styles.underline} />
    </View>
  );
}
