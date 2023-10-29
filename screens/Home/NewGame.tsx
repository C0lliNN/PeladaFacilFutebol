import { Box, Button, Center, Column, Text } from "native-base";
import PasteableTextArea from "../../components/PasteableTextArea";
import CreateGamePlayerList from "../../components/CreateGamePlayerList";
import { useContext, useState } from "react";
import { GamesContext } from "../../context/games";
import CreatePlayerModal from "../../components/CreatePlayerModal";
import { ManualInsertionContext } from "../../context/manualInsertion";

export default function NewGame() {
  const { manualInsertion } = useContext(ManualInsertionContext);
  const [pasteText, setPasteText] = useState("");
  const [showCreatePlayerModal, setShowCreatePlayerModal] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const { addGame } = useContext(GamesContext);

  function toggleCreatePlayerModal() {
    setShowCreatePlayerModal(!showCreatePlayerModal);
  }

  function addPlayer(player: string) {
    setPlayers([...players, player]);
  }

  function removePlayer(player: string) {
    setPlayers(players.filter((p) => p !== player));
  }

  function createNewGame() {
    addGame(players);
  }

  return (
    <Column>
      {manualInsertion ? (
        <Column>
          <CreateGamePlayerList
            players={players}
            onRemovePlayer={removePlayer}
            viewType="create"
          />
          <Center mt="4">
            <Button size="sm" onPress={toggleCreatePlayerModal}>
              Adicionar Jogador
            </Button>
          </Center>
        </Column>
      ) : (
        <PasteableTextArea text={pasteText} setText={setPasteText} />
      )}

      {players.length > 0 && (
        <Text fontSize="xs" color="gray.600" textAlign="center">
          Total: {players.length} jogador(es)
        </Text>
      )}

      <Center mt="5">
        <Button colorScheme="success" onPress={createNewGame}>
          Criar pelada
        </Button>
      </Center>

      <CreatePlayerModal
        show={showCreatePlayerModal}
        onClose={toggleCreatePlayerModal}
        addPlayer={addPlayer}
      />
    </Column>
  );
}
