import { View, Text } from "@lightningtv/solid";
import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource, Show } from "solid-js";
import { getMovieDetails, getSeriesDetails } from "../../api/services/DetailsPageServices";
import BackButton from "./components/BackButton";
import { getImageUrl } from "@/api";
import WatchNowButton from "./components/WatchNowButton";
import { Column } from "@lightningtv/solid/primitives";
import { setBackgroundHeight, setBackgroundWidth, setGlobalBackground } from "@/state";

const MetaDataStyle = {
  fontFamily: "Inter",
  fontWeight: 400,
  fontSize: 20,
  lineHeight: 29,
  letterSpacing: 0,
};

const Details = () => {
  const { id, mediaType } = useParams();
  const [data] = createResource(() => id, mediaType === "movies" ? getMovieDetails : getSeriesDetails);
  const navigate = useNavigate();
  setBackgroundWidth(1920);
  setBackgroundHeight(1080);
  setGlobalBackground(" a");
  const goBack = () => {
    navigate(-1);
    return true;
  };
  return (
    <View onBack={goBack} onBackspace={goBack}>
      <Show when={data()}>
        <Column
          width={1083}
          height={700}
          x={69}
          y={65}
          gap={44}
          display="flex"
          flexDirection="column"
          forwardFocus={1}
        >
          <BackButton />
          <View
            width={1083}
            height={592}
            gap={25}
            display="flex"
            flexDirection="column"
            id="data"
            forwardFocus={1}
            autofocus
          >
            <View id="metaData" width={1083} height={82} display="flex" flexDirection="column">
              <Text style={MetaDataStyle}>Drama</Text>
              <Text style={MetaDataStyle}>98 Minutes</Text>
              <Text style={MetaDataStyle}>US - 1987 - PG - IMDb: 7.7</Text>
            </View>
            <View id="generalData" width={1083} height={485} display="flex" gap={60} forwardFocus={1}>
              <View width={325} height={485} src={getImageUrl(data()?.poster_path, "w342")} />
              <View
                id="baseInfo"
                width={698}
                height={435}
                gap={37}
                display="flex"
                flexDirection="column"
                alignSelf="center"
                forwardFocus={2}
              >
                <View
                  id="titleAndDescription"
                  width={698}
                  height={182}
                  gap={40}
                  display="flex"
                  flexDirection="column"
                >
                  {" "}
                  <Text fontFamily="Inter" fontWeight={600} fontSize={28} letterSpacing={0} contain="width">
                    {data()?.title}
                  </Text>
                  <Text
                    fontFamily="Inter"
                    fontWeight={600}
                    fontSize={22}
                    lineHeight={31}
                    letterSpacing={0}
                    contain="width"
                    maxLines={4}
                  >
                    {data()?.overview}
                  </Text>
                </View>
                <View id="castAndCrew" width={698} height={101} gap={8} display="flex" flexDirection="column">
                  <View display="flex" width={698}>
                    <Text fontFamily="Inter" fontWeight={400} fontSize={22} contain="width" maxLines={2}>
                      Director: Enzo G. Castellari, Enzo G. Castellari, Enzo G. Castellari, Enzo G.
                      Castellari, Enzo G. Castellari, Enzo G. Castellari, Enzo G. Castellari, Enzo G.
                      Castellari
                    </Text>
                  </View>
                  <View display="flex" width={698}>
                    <Text fontFamily="Inter" fontWeight={400} fontSize={22} contain="width" maxLines={2}>
                      Cast: Enzo G. Castellari, Enzo G. Castellari, Enzo G. Castellari, Enzo G. Castellari,
                      Enzo G. Castellari, Enzo G. Castellari, Enzo G. Castellari, Enzo G. Castellari, Enzo G.
                      Castellari
                    </Text>
                  </View>
                </View>
                <WatchNowButton />
              </View>
            </View>
          </View>
        </Column>
      </Show>
    </View>
  );
};

export default Details;
