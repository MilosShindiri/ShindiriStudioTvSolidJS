import { getImageUrl } from "@/api";
import { Text, View } from "@lightningtv/solid";

const Card = props => {
  const { id, title, poster_path } = props.item;
  console.log(id, title, poster_path);
  const cardStyles = {
    width: 400,
    height: 300,
    $focus: { scale: 3 },
  };
  return (
    <View>
      <View width={300} height={200} src={getImageUrl(poster_path, "original")} />
      <Text style={cardStyles}>{title}</Text>
    </View>
  );
};
export default Card;
