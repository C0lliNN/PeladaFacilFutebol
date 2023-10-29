import React, { createContext, useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Game = {
  id: string;
  players: string[];
  status: "active" | "canceled" | "finished";
  createdAt: string;
};

export const GamesContext = createContext<{
  games: Game[];
  activeGame?: Game;
  addGame: (players: string[]) => void;
  cancelActiveGame(): void;
  finishActiveGame(): void;
}>({
  games: [],
  activeGame: undefined,
  addGame: (players: string[]) => {},
  cancelActiveGame: () => {},
  finishActiveGame: () => {},
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
      id: uuidv4(),
      players,
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
    <GamesContext.Provider value={{ games, activeGame, addGame, cancelActiveGame, finishActiveGame }}>
      {children}
    </GamesContext.Provider>
  );
}
