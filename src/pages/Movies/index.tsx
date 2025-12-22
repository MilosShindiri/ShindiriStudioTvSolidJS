import { setGlobalBackground } from "@/state";
import { View, Text, For } from "@lightningtv/solid";
import { Row } from "@lightningtv/solid/primitives";
import Card from "./components/Card";

const MoviesStyles = {
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: 0.06,
  color: "#FFFFFF",
} as const;

const Movie = props => {
  setGlobalBackground(" ");
  return (
    <View forwardFocus={0}>
      <Row y={697} x={64} gap={24} width={1241} forwardFocus={0} scroll="edge" throttleInput={200}>
        <For each={props.data.movies()}>{item => <Card item={item} style={MoviesStyles} />}</For>
      </Row>
    </View>
  );
};

export default Movie;

/* You have also global throttling */

/* scroll atributes: 'auto' | 'always' | 'edge' | 'center' | 'none' */
