import { setGlobalBackground } from "@/state";
import { View, Text } from "@lightningtv/solid";

const Movie = () => {
  setGlobalBackground(" ");
  return (
    <View>
      <Text>Movie Page</Text>
    </View>
  );
};

export default Movie;
