import { View } from "@lightningtv/solid";
import { createEffect } from "solid-js";
import { globalBackground } from "@/state"; // direktno signal

const GlobalBackground = () => {
  let bg1, bg2;
  let active = 0;
  let lastBg: string | null = null;

  const animationSettings = {
    duration: 600,
    easing: "ease-in-out",
  };

  createEffect(() => {
    const img = globalBackground();
    if (!img || img === lastBg) return;

    lastBg = img;

    const currentBg = active === 1 ? bg2 : bg1;
    const nextBg = active === 1 ? bg1 : bg2;

    nextBg.src = img;
    nextBg.alpha = 0.01;

    nextBg.animate({ alpha: 1 }, animationSettings).start();
    currentBg.animate({ alpha: 0.01 }, animationSettings).start();

    active = active === 1 ? 2 : 1;
  });

  return (
    <>
      <View width={1920} height={1080} color="#141217" />
      <View
        ref={bg1}
        width={1920}
        height={1080}
        alpha={0}
        textureOptions={{ resizeMode: { type: "cover" } }}
      />
      <View
        ref={bg2}
        width={1920}
        height={1080}
        alpha={0}
        textureOptions={{ resizeMode: { type: "cover" } }}
      />
    </>
  );
};

export default GlobalBackground;
