import { activeElement, For, Text, View } from "@lightningtv/solid";
import { Column, Row } from "@lightningtv/solid/primitives";
import Card from "../Home/components/Card";
import { createEffect, createResource, on, Show } from "solid-js";
import { setGlobalBackground } from "@/state";
import background from "../../assets/background.jpg";
import { Background } from "@/components/Background";
// import { $t } from "../translate";
// import styles from "../styles";

const Home = props => {
  // createEffect(
  //   on(activeElement, () => {
  setGlobalBackground(background);
  //   }),
  // );
  return <View>{/* <Background /> */}</View>;
  // return (
  // <Column>
  //   <For each={props.data.rows}>
  //     {row =>
  //       (() => {
  //         return (
  //           <Row>
  //             <For each={row.items()}>
  //               {item => {
  //                 return <Card item={item} autofocus={item.id} />;
  //               }}
  //             </For>
  //           </Row>
  //         );
  //       })()
  //     }
  //   </For>
  // </Column>
  // );
};

export default Home;
