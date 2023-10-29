import { Button, Center, Column, Text } from "native-base";
import PasteableTextArea from "../../components/PasteableTextArea";
import CreateGamePlayerList from "../../components/CreateGamePlayerList";
import { useContext, useEffect, useState } from "react";
import { GamesContext } from "../../context/games";
import CreatePlayerModal from "../../components/CreatePlayerModal";
import { ManualInsertionContext } from "../../context/manualInsertion";
import nlp from "compromise";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function NewGame() {
  const { manualInsertion, toggleManualInsertion } = useContext(
    ManualInsertionContext
  );
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

  function handlePaste(text: string) {
    const modifiedText = text
      .split("\n")
      .map((p) => capitalize(p))
      .join("\n");
    const doc = nlp(modifiedText);
    const names = doc.people().out("array");

    setPlayers(names);
    toggleManualInsertion();
  }

  function createNewGame() {
    addGame(players);
  }

  useEffect(() => {
    if (!manualInsertion) {
      setPasteText("");
    }
  }, [manualInsertion]);

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
        <PasteableTextArea
          text={pasteText}
          setText={setPasteText}
          onPaste={handlePaste}
        />
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
