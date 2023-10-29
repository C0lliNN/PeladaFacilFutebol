import { Column, Text, IconButton, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import BasePlayerList from "./BasePlayerList";


type Props = {
  players: string[];
  onRemovePlayer: (player: string) => void;
  viewType: "create" | "payment" | "draw";
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
            <BasePlayerList
              players={props.players}
              keyExtractor={(item) => item}
              renderItem={(player) => (
                <>
                  <Text fontSize="lg">{player}</Text>

                  <IconButton
                    onPress={() => props.onRemovePlayer(player)}
                    icon={<Icon as={AntDesign} name="delete" />}
                    colorScheme="danger"
                    size="sm"
                  />
                </>
              )}
            />
          </Column>
        )}
      </Column>
    );
}