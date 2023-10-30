import {
  Box,
  Button,
  Column,
  Flex,
  SectionList,
  Select,
  Text,
  Toast,
} from "native-base";
import { useContext, useState } from "react";
import { Game, GamesContext } from "../context/games";

type Props = {
  game: Game;
  enableDraw: boolean;
};

export default function TeamList({ game, enableDraw }: Props) {
  const [numTeams, setNumTeams] = useState(3);
  const { drawTeams } = useContext(GamesContext);

  function handleDraw() {
    try {
        drawTeams(numTeams, );
    } catch(e) {
        Toast.show({
            title: "Não foi possível sortear os times",
            placement: "top",
            colorScheme: "danger",
            description: "O número de jogadores deve ser maior que o número de times"
        })
        console.log(e);
    }
  }

  return (
    <Box>
      <Column>
        {enableDraw && (
          <>
            <Flex direction="row" style={{ gap: 20 }} mb="3">
              <Select
                w="24"
                selectedValue={numTeams.toString()}
                defaultValue="3"
                onValueChange={(value) => setNumTeams(Number(value))}
              >
                <Select.Item label="2" value="2" />
                <Select.Item label="3" value="3" />
                <Select.Item label="4" value="4" />
                <Select.Item label="5" value="5" />
                <Select.Item label="6" value="6" />
              </Select>
              <Text fontSize="lg">times</Text>
            </Flex>
            <Button colorScheme="secondary" my="3" onPress={handleDraw}>
              Sortear
            </Button>
          </>
        )}
        {game.teams && game.teams.length ? (
          <>
            <SectionList
              mb="10"
              maxH="80"
              sections={game.teams.map((team, i) => ({
                title: `Time ${i + 1}`,
                data: team,
              }))}
              keyExtractor={(player) => player.id}
              renderItem={({ item: player }) => (
                <Box borderBottomColor="gray.300" borderBottomWidth="1">
                  <Text py="2" fontSize="lg">
                    {player.name}
                  </Text>
                </Box>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Box bgColor="gray.100">
                  <Text fontSize="lg" fontWeight="bold" my="2">
                    {title}
                  </Text>
                </Box>
              )}
            />
          </>
        ) : (
          <Text textAlign="center" my="5" fontSize="md" color="gray.500">
            Nenhum time sorteado
          </Text>
        )}
      </Column>
    </Box>
  );
}
