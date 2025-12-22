import { createSignal } from "solid-js";
import background from "/static/images/background.jpg";

console.log(background);
export const [globalBackground, setGlobalBackground] = createSignal<string>(background);
