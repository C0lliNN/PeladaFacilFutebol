import {
  Badge,
  Button,
  Column,
  FlatList,
  Flex,
  Spacer,
  Text,
} from "native-base";
import { Game } from "../context/games";
import { formatDate } from "../utils/date";
import GameStatusBadge from "./GameStatusBadge";

type Props = {
  games: Game[];
  onShowDetails: (game: Game) => void;
};

export default function GameList({ games, onShowDetails }: Props) {
  return (
    <FlatList
      data={games}
      maxH="md"
      keyExtractor={(game) => game.id}
      renderItem={({ item: game }) => (
        <Flex
          direction="row"
          bgColor="white"
          borderRadius="lg"
          p="5"
          my="3"
          shadow="2"
        >
          <Column w="32">
            <Text fontSize="lg" color="gray.500">
              {formatDate(game.createdAt)}
            </Text>
            <GameStatusBadge status={game.status} />
          </Column>
          <Flex flexGrow="1" alignItems="flex-end" justifyContent="center">
            <Button
              colorScheme="info"
              size="sm"
              w="20"
              onPress={() => onShowDetails(game)}
            >
              Visualizar
            </Button>
          </Flex>
        </Flex>
      )}
    />
  );
}
