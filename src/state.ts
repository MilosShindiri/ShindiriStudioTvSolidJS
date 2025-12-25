import { createSignal } from "solid-js";

export const [globalBackground, setGlobalBackground] = createSignal<string>("");

export const [globalTitle, setGlobalTitle] = createSignal<string>("");

export const [globalOverview, setGlobalOverview] = createSignal<string>("");

export const [backgroundWidth, setBackgroundWidth] = createSignal<number>(1920);

export const [backgroundHeight, setBackgroundHeight] = createSignal<number>(1080);
