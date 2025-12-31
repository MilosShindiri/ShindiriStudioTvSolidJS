import { getImageUrl } from "@/api";
import { View, Text } from "@lightningtv/solid";

const CardStyles = {
  width: 440,
  height: 265,
  scale: 1,
  $focus: {
    scale: 1.1,
  },
} as const;

const CardTextStyles = {
  fontWeight: 400,
  fontSize: 24,
  maxLines: 1,
  contain: "width",
  lineHeight: 1,
  color: "#FFFFFF99",
  $focus: {
    color: "#ffffff",
  },
} as const;

const cardPosterStyles = {
  borderRadius: 6,
  $focus: {
    border: { width: 6, color: "#ED1C24" },
  },
} as const;

const Card = props => {
  const { title, poster_path } = props.item;

  return (
    <View
      id="card"
      item={props.item}
      width={props.style.width}
      height={props.style.height}
      display="flex"
      flexDirection="column"
      style={CardStyles}
      gap={16}
      forwardStates
      focusable
      onEnter={() => props.onEnter()}
      // autofocus={props.autofocus}
    >
      <View id="picture" style={cardPosterStyles} src={getImageUrl(poster_path, "w92")} />
      <Text id="text" y={props.style.height} width={props.style.width} style={CardTextStyles}>
        {title}
      </Text>
    </View>
  );
};
export default Card;
