import { View } from "@lightningtv/solid";
import { createEffect, onCleanup } from "solid-js";
import { backgroundHeight, backgroundWidth, globalBackground } from "@/state";

const GlobalBackground = () => {
  let bg1, bg2;
  let active = 0;
  let lastBg: string | null = null;

  const animationSettings = {
    duration: 600,
    easing: "ease-in-out",
  };

  let currentAnim: any = null;
  let nextAnim: any = null;

  createEffect(() => {
    const img = globalBackground();
    if (!img || img === lastBg) return;

    lastBg = img;

    const currentBg = active === 1 ? bg2 : bg1;
    const nextBg = active === 1 ? bg1 : bg2;

    nextBg.src = img;
    nextBg.alpha = 0.01;

    if (currentAnim) currentAnim.stop();
    if (nextAnim) nextAnim.stop();

    nextAnim = nextBg.animate({ alpha: 1 }, animationSettings);
    nextAnim.start();

    currentAnim = currentBg.animate({ alpha: 0.01 }, animationSettings);
    currentAnim.start();

    active = active === 1 ? 2 : 1;
  });

  onCleanup(() => {
    currentAnim.stop();
    nextAnim.stop();
  });

  return (
    <View width={backgroundWidth()} height={backgroundHeight()}>
      <View width={backgroundWidth()} height={backgroundHeight()} color="#141217" />

      <View
        ref={bg1}
        width={backgroundWidth()}
        height={backgroundHeight()}
        alpha={0}
        // textureOptions={{ resizeMode: { type: "contain" } }}
      />
      <View
        ref={bg2}
        width={backgroundWidth()}
        height={backgroundHeight()}
        alpha={0}
        // textureOptions={{ resizeMode: { type: "contain" } }}
      />
    </View>
  );
};

export default GlobalBackground;
