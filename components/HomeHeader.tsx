import { Column, Heading, Text, Center, Button } from "native-base";
import { useContext } from "react";
import { ManualInsertionContext } from "../context/manualInsertion";

export default function HomeHeader() {
  const { manualInsertion, toggleManualInsertion } = useContext(
    ManualInsertionContext
  );

  return (
    <Column mb="4">
      <Heading textAlign="center" size="2xl">
        Nova Pelada
      </Heading>

      <Text color="gray.500" textAlign="center">
        {manualInsertion
          ? "Insira os jogadores"
          : "Cole a lista de jogadores abaixo"}
      </Text>
      <Text color="gray.800" textAlign="center">
        ou
      </Text>
      <Center>
        <Button
          size="sm"
          colorScheme="success"
          variant="outline"
          onPress={toggleManualInsertion}
        >
          {manualInsertion ? "Colar lista" : "Inserir manualmente"}
        </Button>
      </Center>
    </Column>
  );
}
