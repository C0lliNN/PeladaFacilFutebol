import { Modal, Text, Box } from "native-base";
import { Game } from "../context/games"
import { formatDate } from "../utils/date";
import GameStatusBadge from "./GameStatusBadge";
import TeamList from "./TeamList";

type Props = {
    game: Game | null;
    show: boolean;
    onClose: () => void;
}


export default function GameDetailsModal({ game, show, onClose }: Props) {
    if (!game) return null;

    return (
      <Modal isOpen={show} onClose={onClose} size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Detalhes da Pelada</Modal.Header>
          <Box p="8">
            <Text fontSize="lg" color="gray.500">
              {formatDate(game.createdAt)}
            </Text>
            <Box width="24" mb="5">
              <GameStatusBadge status={game.status} />
            </Box>
            <TeamList game={game} enableDraw={false} />
          </Box>
        </Modal.Content>
      </Modal>
    );
}