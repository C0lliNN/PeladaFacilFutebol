import { Player } from "../context/games";
import { Icon, IconButton, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import BasePlayerList from "./BasePlayerList";

type Props = {
  players: Player[];
  onPay: (player: Player) => void;
};

export default function PaymentPlayerList({ players, onPay }: Props) {
  return (
    <BasePlayerList
      players={players}
      keyExtractor={(player) => player.id}
      renderItem={(player) => (
        <>
          <Text fontSize="lg">{player.name}</Text>
          {player.paid ? (
            <IconButton
              icon={<Icon as={FontAwesome} name="check" />}
              colorScheme="gray"
              disabled
              size="sm"
            />
          ) : (
            <IconButton
              icon={<Icon as={FontAwesome} name="money" />}
              colorScheme="success"
              onPress={() => onPay(player)}
              size="sm"
            />
          )}
        </>
      )}
    />
  );
}
