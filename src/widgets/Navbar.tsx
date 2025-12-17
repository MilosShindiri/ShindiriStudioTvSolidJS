import { View, Text } from "@lightningtv/solid";
import { Background } from "@/components/Background";
import { useNavigate } from "@solidjs/router";

const NAVBAR_HEIGHT = 0;

const Navbar = props => {
  const navigate = useNavigate();
  return (
    <View width={1920} height={1080}>
      <Background />

      <View y={0} height={NAVBAR_HEIGHT} width={1920}>
        <Text x={40} y={20} fontSize={32}>
          Navbar
        </Text>
      </View>

      <View
        x={300}
        y={20}
        width={200}
        height={40}
        autofocus
        onEnter={() => navigate("/movies")}
        onClick={() => navigate("/movies")}
      >
        <Text fontSize={28}>Movies</Text>
      </View>

      <View y={NAVBAR_HEIGHT}>{props.children}</View>
    </View>
  );
};

export default Navbar;
