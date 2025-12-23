import { View, Text, For } from "@lightningtv/solid";
import { Background } from "@/components/Background";
import { useNavigate } from "@solidjs/router";
import logo from "../assets/logo.png";
import Button from "../components/Button/Button";
import { Row } from "@lightningtv/solid/primitives";
import menuItems from "@/constants/menuItems";

const Navbar = props => {
  const navigate = useNavigate();

  return (
    <View>
      <Background />

      <View x={32} y={32} src={logo} width={301} height={60} />

      <Row x={400} y={37} gap={20} autofocus>
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

      <View y={0}>{props.children}</View>
    </View>
  );
};

export default Navbar;
