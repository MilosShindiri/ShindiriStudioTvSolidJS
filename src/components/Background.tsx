import { globalBackground } from "../state";
import { View } from "@lightningtv/solid";

export function Background() {
  return <View id="background" width={1920} height={1080} src={globalBackground()} />;
}
