import {
  globalOverview,
  globalTitle,
  setBackgroundHeight,
  setBackgroundWidth,
  setGlobalBackground,
  setGlobalOverview,
  setGlobalTitle,
} from "@/state";
import { View, Text, For, activeElement } from "@lightningtv/solid";
import { Row } from "@lightningtv/solid/primitives";
import { createEffect, on, onMount, Show } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import Card from "./components/Card";

const MoviesStyles = {
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: 0.06,
  color: "#FFFFFF",
} as const;

const Movie = props => {
  let bg1, bg2;

  setBackgroundWidth(1920);
  setBackgroundHeight(697); // samo Movies
  setGlobalBackground(" ");

  const delayedBackground = debounce((img: string) => {
    setGlobalBackground(img);
  }, 400);

  const delayedTextUpdate = debounce((title: string, overview: string) => {
    setGlobalTitle(title);
    setGlobalOverview(overview);
  }, 400);

  createEffect(
    on(activeElement, el => {
      if (!el?.item?.backdrop_path) return;

      const img = `https://image.tmdb.org/t/p/w1920/${el.item.backdrop_path}`;
      delayedBackground(img);

      delayedTextUpdate(el.item.title || el.item.name || "", el.item.overview || "");
    }),
  );

  return (
    <View forwardFocus={4}>
      <View
        ref={bg1}
        width={1920}
        height={697}
        alpha={0}
        textureOptions={{ resizeMode: { type: "contain" } }}
      />
      <View
        ref={bg2}
        width={1920}
        height={697}
        alpha={0}
        textureOptions={{ resizeMode: { type: "contain" } }}
      />

      <Text x={69} y={258} fontSize={28} fontWeight={600} color="#FFFFFF">
        {globalTitle()}
      </Text>

      <Text width={698} height={124} x={69} y={316} fontSize={28} fontWeight={600} contain="width">
        {globalOverview()}
      </Text>

      <Show when={props.data.movies()?.length}>
        <Row y={697} x={64} gap={24} width={1241} autofocus scroll="edge" throttleInput={200}>
          <For each={props.data.movies() ?? []}>{item => <Card item={item} style={MoviesStyles} />}</For>
        </Row>
      </Show>
    </View>
  );
};

export default Movie;

/* You have also global throttling */

/* scroll atributes: 'auto' | 'always' | 'edge' | 'center' | 'none' */
