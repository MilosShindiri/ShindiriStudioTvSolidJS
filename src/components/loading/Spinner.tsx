import { View, Text } from "@lightningtv/solid";
import { onMount, onCleanup } from "solid-js";
import spinnerSrc from "/static/images/zabrinutiMita.png";

interface LoadingScreenProps {
  xPos?: number;
  yPos?: number;
  width?: number;
  height?: number;
}

const LoadingScreen = (props: LoadingScreenProps) => {
  const xPos = props.xPos ?? 960;
  const yPos = props.yPos ?? 540;
  const width = props.width ?? 1920;
  const height = props.height ?? 1080;

  let spinnerRef: any;
  let rafId: number;

  /* const spin = () => {
    if (spinnerRef) {
      spinnerRef.rotationZ += 0.05; // kontrola brzine rotacije
    }
    rafId = requestAnimationFrame(spin);
  };

  onMount(() => {
    rafId = requestAnimationFrame(spin);
  });

  onCleanup(() => {
    cancelAnimationFrame(rafId);
  }); */

  onMount(() => {
    spinnerRef
      .animate(
        { rotation: Math.PI * 2 },
        {
          duration: 1000,
          repeat: -1, // infinite
          easing: "linear",
        },
      )
      .start();
  });

  return (
    <>
      <View
        ref={spinnerRef}
        src="/static/images/zabrinutiMita.png"
        width={120}
        height={120}
        zIndex={200}
        x={960}
        y={540}
        mountX={0.5}
        mountY={0.5}
      />
      {/* <View
        ref={spinnerRef}
        src={spinnerSrc}
        width={100}
        height={100}
        x={xPos - 50} // centriranje mount 0.5
        y={yPos - 50}
        alpha={1}
        mountX={0.5} // centriranje po X
        mountY={0.5} // centriranje po Y
      /> */}
      <Text x={880} y={620}>
        Loading...
      </Text>
    </>
  );
};

export default LoadingScreen;
