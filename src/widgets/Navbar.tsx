import { View, Text, For } from "@lightningtv/solid";
import { Background } from "@/components/Background";
import { useNavigate } from "@solidjs/router";
import logo from "../assets/logo.png";
import Button from "../components/Button/Button";
import { removeKeepAlive, Row } from "@lightningtv/solid/primitives";
import menuItems from "@/constants/menuItems";
import { createEffect } from "solid-js";
import { currentPath } from "@/state";

const Navbar = props => {
  const navigate = useNavigate();

  let navbar, pageContainer;
  const focusNavbar = () => {
    return navbar.setFocus();
  };

  const focusPageContainer = () => {
    return pageContainer.setFocus();
  };

  // createEffect(() => {
  //   if (currentPath() !== "/movies") {
  //     removeKeepAlive("movies");
  //   }
  // });

  return (
    <View onUp={focusNavbar} onDown={focusPageContainer}>
      {/* <Background /> */}

      <View x={32} y={32} src={logo} width={301} height={60} zIndex={200} />

      <Row x={400} y={37} gap={20} ref={navbar} zIndex={200}>
        <For each={menuItems}>
          {item => (
            <Button
              {...props}
              width={118}
              height={49}
              onEnter={() => navigate(item.path)}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          )}
        </For>
      </Row>

      <View y={0} ref={pageContainer} forwardFocus={0}>
        {props.children}
      </View>
    </View>
  );
};

export default Navbar;
