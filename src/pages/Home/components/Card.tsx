import { getImageUrl } from "@/api";
import { activeElement, Text, View } from "@lightningtv/solid";
import { createEffect, on } from "solid-js";

const CardStyles = {
  scale: 1,
  $focus: {
    scale: 1.1,
  },
} as const;

const CardTextStyles = {
  fontFamily: "Inter",
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
  $focus: {
    border: { width: 6, color: "#ED1C24" },
  },
} as const;

const Card = props => {
  const { title, poster_path } = props.item;

  return (
    <View
      id="card"
      width={props.style.width}
      height={props.style.height}
      display="flex"
      flexDirection="column"
      gap={16}
      style={CardStyles}
      forwardStates
    >
      <View id="pic" style={cardPosterStyles} src={getImageUrl(poster_path, "w342")} />
      <Text id="text" y={props.style.height} width={props.style.width} style={CardTextStyles}>
        {title}
      </Text>
    </View>
  );
};
export default Card;
