import { Badge, Text } from "native-base";
import { Game } from "../context/games";


const statusTextMapping = {
  active: "Ativa",
  finished: "Finalizada",
  canceled: "Cancelada",
};

const statusColorMapping = {
  active: "info",
  finished: "success",
  canceled: "danger",
};

export default function GameStatusBadge({ status }: { status: Game["status"] }) {
    return (
      <Badge
        colorScheme={statusColorMapping[status]}
        borderRadius="full"
        mt="2"
      >
        <Text>{statusTextMapping[status]}</Text>
      </Badge>
    );
}