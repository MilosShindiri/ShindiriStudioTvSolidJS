import { createRenderer, Config as LightningConfig, loadFonts } from "@lightningtv/solid";
import { Route } from "@solidjs/router";
import { HashRouter, useFocusManager } from "@lightningtv/solid/primitives";
import App from "./pages/App";
import fonts from "./fonts";
import { merge } from "lodash-es";
import { config } from "#devices/common";
import { tmdbData } from "./api/services/MediaServices";
import { getMovieDetails, getSeriesDetails } from "./api/services/DetailsPageServices";
import { moviesData } from "./api/services/MediaServices";
import Navbar from "./widgets/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Details from "./pages/Details";

merge(LightningConfig, config.lightning);

const { render } = createRenderer();
loadFonts(fonts);

render(() => {
  useFocusManager(config.keys, config.keyHoldOptions);
  return (
    <HashRouter root={App}>
      <Route path="" component={Navbar}>
        <Route path="/" component={Home} preload={tmdbData} />
        <Route path="/movies" component={Movies} preload={moviesData} />
      </Route>
      <Route path="/:mediaType/details/:id" component={Details} />
    </HashRouter>
  );
});
