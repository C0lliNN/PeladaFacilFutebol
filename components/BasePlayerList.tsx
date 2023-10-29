import { FlatList, Flex } from "native-base";

type Props<T> = {
    players: T[];
    renderItem: (player: T) => JSX.Element;
    keyExtractor: (player: T) => string;
}

export default function BasePlayerList<T>(props: Props<T>) {
    return (
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
            {props.renderItem(player)}
          </Flex>
        )}
        keyExtractor={props.keyExtractor}
      />
    );
}