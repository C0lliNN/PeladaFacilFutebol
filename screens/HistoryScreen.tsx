import { useContext } from "react";
import { View, Button, Text } from "react-native";
import { GamesContext } from "../context/games";

export default function HistoryScreen({ navigation }: { navigation: any }) {
  const { games } = useContext(GamesContext);
  return (
    <View>
      <Text>History Screen</Text>
      {games.map((game) => (
        <Text>{game.id}</Text>
      ))}
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
