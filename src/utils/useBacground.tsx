import { createSignal } from "solid-js";
import { View } from "@lightningtv/solid";

export const useBackground = () => {
  let bg1: any, bg2: any;
  let active = 0;
  let lastBg: string | null = null;

  const animationSettings = {
    duration: 600,
    easing: "ease-in-out",
  };

  // Funkcija za promenu background-a
  function changeBackground(img: string) {
    if (!img || img === lastBg) return;
    lastBg = img;

    const currentBg = active === 1 ? bg2 : bg1;
    const nextBg = active === 1 ? bg1 : bg2;

    nextBg.src = img;
    nextBg.alpha = 0.01;

    nextBg.animate({ alpha: 1 }, animationSettings).start();
    currentBg.animate({ alpha: 0.01 }, animationSettings).start();

    active = active === 1 ? 2 : 1;
  }

  // Komponenta za render bg1 i bg2
  const BackgroundView = () => (
    <>
      <View width={1920} height={1080} color="#141217" />
      <View
        ref={bg1}
        width={1920}
        height={697}
        alpha={0}
        // textureOptions={{ resizeMode: { type: "cover" } }}
      />
      <View
        ref={bg2}
        width={1920}
        height={697}
        alpha={0}
        // textureOptions={{ resizeMode: { type: "cover" } }}
      />
    </>
  );

  return { changeBackground, BackgroundView };
};
