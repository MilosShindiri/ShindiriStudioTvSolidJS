import { View } from "@lightningtv/solid";
import { createSignal, onCleanup } from "solid-js";
import spinner from "../../assets/spinner.svg";

const Spinner = (props: { size?: number }) => {
  let spinnerRef;
  const size = props.size ?? 64;
  let rafId: number;

  const rotate = () => {
    if (spinnerRef) {
      spinnerRef.rotation += 0.1; // brzina rotacije
    }
    rafId = requestAnimationFrame(rotate);
  };

  requestAnimationFrame(rotate);

  onCleanup(() => {
    cancelAnimationFrame(rafId);
  });

  return (
    <View ref={spinnerRef} width={size} height={size} x={960 - size / 2} y={540 - size / 2} src={spinner} />
  );
};

export default Spinner;
