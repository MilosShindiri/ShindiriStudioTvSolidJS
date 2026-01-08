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

  const goBack = () => {
    navigate(-1);
    return true;
  };

  const location = useLocation();
  const announcer = useAnnouncer();
  announcer.debug = false;
  announcer.enabled = false;
  createEffect(() => {
    setPrevPath(currentPath());
    setCurrentPath(location.pathname);
  });

  return (
    <View
      ref={window.APP}
      onAnnouncer={() => (announcer.enabled = !announcer.enabled)}
      onLast={() => history.back()}
      // onLeft={() => console.log("LEFT")}
      // onRight={() => console.log("RIGHT")}
      // onUp={() => console.log("UP")}
      // onDown={() => console.log("DOWN")}
      // onEnter={() => console.log("ENTER")}
      onBack={goBack}
    >
      {/* Global background uvek prvi */}
      <GlobalBackground />
      {/* Ostali UI */}
      {props.children}
    </View>
  );
};

export default App;
