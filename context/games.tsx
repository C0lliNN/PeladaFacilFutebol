import React, { createContext, useState, useEffect, useMemo } from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Player = {
  id: string;
  name: string;
  paid: boolean;
};

export type Game = {
  id: string;
  players: Player[];
  status: "active" | "canceled" | "finished";
  createdAt: string;
};

export const GamesContext = createContext<{
  games: Game[];
  activeGame?: Game;
  addGame: (players: string[]) => void;
  cancelActiveGame(): void;
  finishActiveGame(): void;
  handlePlayerPayment(player: Player): void;
}>({
  games: [],
  activeGame: undefined,
  addGame: (players: string[]) => {},
  cancelActiveGame: () => {},
  finishActiveGame: () => {},
  handlePlayerPayment: (player: Player) => {},
});

type Props = {
  children: JSX.Element;
};

export default function GamesProvider({ children }: Props): JSX.Element {
  const [games, setGames] = useState<Game[]>([]);

  const activeGame = useMemo(
    () => games.find((game) => game.status === "active"),
    [games]
  );

  function addGame(players: string[]) {
    const newGame: Game = {
      id: uuid.v4().toString(),
      players: players.map((p) => ({
        id: uuid.v4().toString(),
        name: p,
        paid: false,
      })),
      status: "active",
      createdAt: new Date().toISOString(),
    };
    setGames([...games, newGame]);
  }

  function cancelActiveGame() {
    const newGames = [...games];
    const game = newGames.find((game) => game.status === "active");
    if (!game) {
      return;
    }

    game.status = "canceled";
    setGames(newGames);
  }

  function finishActiveGame() {
    const newGames = [...games];
    const game = newGames.find((game) => game.status === "active");
    if (!game) {
      return;
    }

    game.status = "finished";
    setGames(newGames);
  }

  function handlePlayerPayment(player: Player) {

    if (!activeGame) {
      return;
    }

    const newActiveGame = { ...activeGame };
    const newPlayers = [...newActiveGame.players];
    const playerIndex = newPlayers.findIndex((p) => p.id === player.id);

    newPlayers[playerIndex].paid = true;
    newActiveGame.players = newPlayers;
    setGames([...games.filter((g) => g.id !== activeGame?.id), newActiveGame]);
  }

  useEffect(() => {
    const loadGames = async () => {
      const games = await AsyncStorage.getItem("@games");
      if (games) {
        setGames(JSON.parse(games));
      }
    };
    loadGames();
  }, []);

  useEffect(() => {
    const saveGames = async () => {
      await AsyncStorage.setItem("@games", JSON.stringify(games));
    };
    saveGames();
  }, [games]);

  return (
    <GamesContext.Provider
      value={{
        games,
        activeGame,
        addGame,
        cancelActiveGame,
        finishActiveGame,
        handlePlayerPayment,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
