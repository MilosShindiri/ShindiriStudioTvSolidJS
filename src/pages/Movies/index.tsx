import {
  currentPath,
  globalOverview,
  globalTitle,
  setBackgroundHeight,
  setBackgroundWidth,
  setGlobalBackground,
  setGlobalOverview,
  setGlobalTitle,
  setLoading,
} from "@/state";
import { View, Text, For, activeElement } from "@lightningtv/solid";
import { removeKeepAlive, Row } from "@lightningtv/solid/primitives";
import { Accessor, createEffect, on, onMount, Show, Suspense } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import Card from "./components/Card";
import { moviesData } from "../../api/services/MediaServices";
import LoadingScreen from "../../components/loading/Spinner";
import { MovieItem } from "@/types/movie";
import { useAppNavigation } from "@/hooks/useAppNavigation";

interface MoviesProps {
  data: {
    movies: Accessor<MovieItem[] | undefined>;
  };
}

const MoviesStyles = {
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: 0.06,
  color: "#FFFFFF",
} as const;

const Movie = (props: MoviesProps) => {
  let bg1, bg2;
  let enabled = true;
  let wrapper, assetCARD;

  setBackgroundWidth(1920);
  setBackgroundHeight(697);
  setGlobalBackground(" ");
  const { toDetails } = useAppNavigation();
  const isActive = () => location.hash.endsWith("movies");

  const delayedBackground = debounce((img: string) => {
    if (isActive()) {
      setGlobalBackground(img);
    }
  }, 400);

  const delayedTextUpdate = debounce((title: string, overview: string) => {
    if (isActive()) {
      setGlobalTitle(title);
      setGlobalOverview(overview);
    }
  }, 400);
  onMount(async () => {
    setLoading(true);

    await moviesData();

    setLoading(false);
  });

  createEffect(
    on(
      activeElement,
      el => {
        console.log("asdf wrapper: ", assetCARD);
        if (currentPath() !== "/movies") return;
        if (!enabled) return;
        // if (!el) return;
        console.log("asdf upad u efekat ON, prevPath: ", currentPath());
        if (!el) return;
        console.log("asdf upad 2");
        const item = el.item as MovieItem | undefined;
        if (!item?.backdrop_path) return;

        setBackgroundWidth(1920);
        setBackgroundHeight(697);
        delayedBackground(`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`);
        delayedTextUpdate(item.title || item.name || "", item.overview || "");
      },
      { defer: true },
    ),
  );

  //   createEffect(
  //   on(
  //     () => (currentPath() === "/movies" ? activeElement() : null),
  //     el => {
  //       console.log("asdf upad u efekat ON, prevPath: ", currentPath());
  //       if (!el) return;

  //       const item = el.item as MovieItem | undefined;
  //       if (!item?.backdrop_path) return;

  //       setBackgroundWidth(1920);
  //       setBackgroundHeight(697);
  //       delayedBackground(`https://image.tmdb.org/t/p/w1920/${item.backdrop_path}`);
  //       delayedTextUpdate(item.title || item.name || "", item.overview || "");
  //     },
  //     { defer: true },
  //   ),
  // );

  /* createEffect(
    on(activeElement, el => {
      console.log("asdf upad u efekat ON");
      if (!enabled) return;
      const item = el?.item as MovieItem | undefined;
      if (!item?.backdrop_path) return;

      setBackgroundWidth(1920);
      setBackgroundHeight(697); // samo Movies
      const img = `https://image.tmdb.org/t/p/w1920/${item.backdrop_path}`;
      delayedBackground(img);

      delayedTextUpdate(item.title || item.name || "", item.overview || "");
    }),
  ); */

  return (
    <Show
      when={props.data.movies()?.length}
      fallback={
        <View width={1920} height={1080} rect color="#000000" zIndex={200} alpha={1}>
          <LoadingScreen />
        </View>
      }
    >
      <View forwardFocus={6}>
        {/* // <Show when={props.data.movies()?.length} fallback={<LoadingScreen />}> */}
        {/* <View forwardFocus={6} ref={wrapper}> */}
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

        {/* Gradient 1 – dijagonalni (82.93deg) */}
        <View
          width={1920}
          height={1080}
          colorTl="#151515"
          colorTr="rgba(21,21,21,0.6)"
          colorBl="#151515"
          colorBr="rgba(21,21,21,0.6)"
        />

        {/* Gradient 2 – top fade (357.53deg) */}
        <View
          width={1920}
          height={1080}
          colorTl="#151515"
          colorTr="#151515"
          colorBl="rgba(21,21,21,0)"
          colorBr="rgba(21,21,21,0)"
        />

        <Text x={69} y={258} fontSize={28} fontWeight={600} color="#FFFFFF" fontFamily="Inter">
          {globalTitle()}
        </Text>

        <Text
          width={698}
          height={124}
          x={69}
          y={316}
          fontSize={22}
          fontWeight={600}
          contain="width"
          fontFamily="Inter"
          lineHeight={31}
        >
          {globalOverview()}
        </Text>

        {/* <Show when={props.data.movies()?.length}> */}
        <Row y={697} x={64} gap={24} width={1241} autofocus scroll="edge" throttleInput={200}>
          <For each={props.data.movies() ?? []}>
            {item => (
              <Card
                item={item}
                style={MoviesStyles}
                onEnter={() => {
                  toDetails(item.id, "movies");
                }}
                ref={assetCARD}
              />
            )}
          </For>
        </Row>
        {/* </Show> */}
      </View>
    </Show>
  );
};

export default Movie;

/* You have also global throttling */

/* scroll atributes: 'auto' | 'always' | 'edge' | 'center' | 'none' */
