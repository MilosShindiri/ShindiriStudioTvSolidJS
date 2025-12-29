import { useLocation, useNavigate } from "@solidjs/router";
import { View, ElementNode } from "@lightningtv/solid";
import { useAnnouncer, useMouse } from "@lightningtv/solid/primitives";
import GlobalBackground from "@/components/GlobalBackground";
import { createEffect } from "solid-js";
import { currentPath, setCurrentPath, setPrevPath } from "@/state";

declare module "@lightningtv/solid/primitives" {
  interface KeyMap {
    Announcer: string | number | (string | number)[];
    Menu: string | number | (string | number)[];
    Text: string | number | (string | number)[];
    Escape: string | number | (string | number)[];
    Backspace: string | number | (string | number)[];
  }
}

declare global {
  interface Window {
    APP: ElementNode;
  }
}

const App = props => {
  // useMouse();
  const navigate = useNavigate();
  const location = useLocation();
  const announcer = useAnnouncer();
  announcer.debug = false;
  announcer.enabled = false;
  createEffect(() => {
    setPrevPath(currentPath());
    setCurrentPath(location.pathname);
  });

  return (
    <View ref={window.APP} onAnnouncer={() => (announcer.enabled = !announcer.enabled)}>
      {/* Global background uvek prvi */}
      <GlobalBackground />
      {/* Ostali UI */}
      {props.children}
    </View>
  );
};

export default App;
