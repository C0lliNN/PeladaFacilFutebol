import { useContext, useState } from "react";
import { Game, GamesContext } from "../context/games";
import { View, Heading } from "native-base";
import GameList from "../components/GameList";
import GameDetailsModal from "../components/GameDetailsModal";

export default function HistoryScreen() {
  const { games } = useContext(GamesContext);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const sortedGames = games.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  function handleOpenDetails(game: Game) {
    setSelectedGame(game);
    setShowDetailsModal(true);
  }

  function handleCloseDetails() {
    setShowDetailsModal(false);
    setSelectedGame(null);
  }

  return (
    <View py="20" px="8">
      <Heading textAlign="center" size="2xl">
        Histórico de Peladas
      </Heading>

      <GameList games={sortedGames} onShowDetails={handleOpenDetails} />

      <GameDetailsModal
        game={selectedGame}
        show={showDetailsModal}
        onClose={handleCloseDetails}
      />
    </View>
  );
}
