import {
  globalOverview,
  globalTitle,
  moviesSelectedIndex,
  setBackgroundHeight,
  setBackgroundWidth,
  setGlobalBackground,
  setGlobalOverview,
  setGlobalTitle,
  setMoviesSelectedIndex,
  setLoading,
} from "@/state";

import { View, Text, For } from "@lightningtv/solid";
import { Row } from "@lightningtv/solid/primitives";
import { Accessor, onMount, Show } from "solid-js";
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

const Movies = (props: MoviesProps) => {
  const { toDetails } = useAppNavigation();

  // ---- GLOBAL PAGE SETUP ----
  setBackgroundWidth(1920);
  setBackgroundHeight(697);
  setGlobalBackground(" ");

  // ---- DEBOUNCED UPDATES ----
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
  // ---- INITIAL LOAD ----
  onMount(() => {
    setMoviesSelectedIndex(0); // resetujemo na prvi element svaki put kada se mountuje

    const list = props.data.movies?.();
    if (!list?.length) return;

    const item = list[0]; // prvi film
    if (!item?.backdrop_path) return;

    setBackgroundWidth(1920);
    setBackgroundHeight(697);
    setGlobalBackground(`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`);
    setGlobalTitle(item.title || item.name || "");
    setGlobalOverview(item.overview || "");
  });

  return (
    <Show when={props.data.movies()?.length} fallback={<LoadingScreen />}>
      <View forwardFocus={4} focusable>
        {/* ---- GRADIENTS ---- */}
        <View
          width={1920}
          height={1080}
          colorTl="#151515"
          colorTr="rgba(21,21,21,0.6)"
          colorBl="#151515"
          colorBr="rgba(21,21,21,0.6)"
        />

        <View
          width={1920}
          height={1080}
          colorTl="#151515"
          colorTr="#151515"
          colorBl="rgba(21,21,21,0)"
          colorBr="rgba(21,21,21,0)"
        />

        {/* ---- TEXT ---- */}
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

        {/* ---- MOVIES ROW ---- */}
        <Row
          y={697}
          x={64}
          gap={24}
          width={1241}
          scroll="center"
          throttleInput={50}
          autofocus
          selected={moviesSelectedIndex()}
          onSelectedChanged={(index, row, active, lastSelected) => {
            console.log("ROW SELECTED:", index);
            setMoviesSelectedIndex(index);

            const el = row.children[index];
            const item = el?.item as MovieItem | undefined;
            if (!item?.backdrop_path) return;

            setBackgroundWidth(1920);
            setBackgroundHeight(697);

            delayedBackground(`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`);
            delayedTextUpdate(item.title || item.name || "", item.overview || "");
          }}
        >
          <For each={props.data.movies() ?? []}>
            {item => <Card item={item} style={MoviesStyles} onEnter={() => toDetails(item.id, "movies")} />}
          </For>
        </Row>
      </View>
    </Show>
  );
};

export default Movies;
