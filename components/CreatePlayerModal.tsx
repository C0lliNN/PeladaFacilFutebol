import { Button, FormControl, Input, Modal } from "native-base";
import { useState } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  addPlayer: (player: string) => void;
};

export default function CreatePlayerModal(props: Props) {
  const [name, setName] = useState("");

  function handleAddPlayer() {
    props.addPlayer(name);
    setName("");
    props.onClose();
  }

  return (
    <Modal isOpen={props.show} onClose={props.onClose} safeAreaTop>
      <Modal.Content style={{ marginBottom: "auto", marginTop: 60 }}>
        <Modal.CloseButton />
        <Modal.Header>Adicionar Jogador</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Nome</FormControl.Label>
            <Input
              autoFocus
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={props.onClose}
            >
              Cancelar
            </Button>
            <Button onPress={handleAddPlayer}>Adicionar</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
