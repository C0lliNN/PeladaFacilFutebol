import { Flex } from "native-base";
import { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { GamesContext } from "../../context/games";
import ActiveGame from "./ActiveGame";
import HomeHeader from "../../components/HomeHeader";
import NewGame from "./NewGame";

export default function HomeScreen() {
  const { activeGame } = useContext(GamesContext);

  return (
    <Flex py="20" px="8">
      <HomeHeader />
      {activeGame ? <ActiveGame /> : <NewGame />}
    </Flex>
  );
}
