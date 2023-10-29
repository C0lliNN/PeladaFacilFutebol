import { Box, Button, Flex, Heading, Row, Text } from "native-base";
import { Game, GamesContext } from "../../context/games";
import { useContext, useState } from "react";
import CreateGamePlayerList from "../../components/CreateGamePlayerList";
import PaymentPlayerList from "../../components/PaymentPlayerList";
import TeamList from "../../components/TeamList";

type Props = {
  game: Game;
};

export default function ActiveGame({ game }: Props) {
  const { finishActiveGame, cancelActiveGame, handlePlayerPayment } =
    useContext(GamesContext);
  const [mode, setMode] = useState<"payment" | "draw">("payment");

  return (
    <Box>
      <Heading textAlign="center" size="2xl">
        Pelada Atual
      </Heading>
      <Flex direction="row" my="3">
        <Button
          w="50%"
          colorScheme={mode === "payment" ? "emerald" : "success"}
          borderRightRadius={0}
          onPress={() => setMode("payment")}
        >
          Pagamento
        </Button>
        <Button
          flexGrow="1"
          borderLeftRadius={0}
          colorScheme={mode === "draw" ? "darkBlue" : "info"}
          onPress={() => setMode("draw")}
        >
          Sorteio
        </Button>
      </Flex>
      {mode === "payment" && (
        <PaymentPlayerList players={game.players} onPay={handlePlayerPayment} />
      )}
      {mode === "draw" && <TeamList enableDraw game={game} />}
      <Flex
        direction="row"
        my="3"
        style={{ columnGap: 10 }}
        justifyContent="flex-end"
      >
        <Button onPress={finishActiveGame}>Concluir</Button>
        <Button onPress={cancelActiveGame} colorScheme="danger">
          Cancelar
        </Button>
      </Flex>
    </Box>
  );
}
