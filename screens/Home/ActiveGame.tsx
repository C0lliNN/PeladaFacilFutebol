import { Box, Button, Text } from "native-base";
import { Game, GamesContext } from "../../context/games";
import { useContext } from "react";

export default function ActiveGame({ route }: any) {
  const game = route.params.game as Game;

  const { finishActiveGame } = useContext(GamesContext);
  return (
    <Box>
      <Text>Active Game</Text>
      {game.players.map((player) => (
        <Text>{player}</Text>
      ))}
      <Button onPress={finishActiveGame}>Finish</Button>
    </Box>
  );
}
