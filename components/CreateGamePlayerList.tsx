import { Column, Text, FlatList, Flex, Center, Button, IconButton, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";


type Props = {
  players: string[];
  onRemovePlayer: (player: string) => void;
};

export default function CreateGamePlayerList(props: Props) {
    return (
      <Column borderColor="gray.300" p="2" borderWidth="1">
        {props.players.length === 0 ? (
          <Text color="gray.700" mb="4" textAlign="center">
            Sem jogadores
          </Text>
        ) : (
          <Column>
            <FlatList
              h="72"
              data={props.players}
              renderItem={({ item: player }) => (
                <Flex
                  py="2"
                  borderBottomWidth="1"
                  borderBottomColor="gray.400"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Text fontSize="lg">{player}</Text>
                  <IconButton
                    onPress={() => props.onRemovePlayer(player)}
                    icon={<Icon as={AntDesign} name="delete" />}
                    colorScheme="danger"
                    size="sm"
                  />
                </Flex>
              )}
              keyExtractor={(item) => item}
            />
          </Column>
        )}
      </Column>
    );
}