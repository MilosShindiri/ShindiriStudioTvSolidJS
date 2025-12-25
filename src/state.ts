import { createSignal } from "solid-js";
import background from "/static/images/background.jpg";

export const [globalBackground, setGlobalBackground] = createSignal<string>(background);
