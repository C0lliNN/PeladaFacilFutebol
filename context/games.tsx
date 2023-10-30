import React, { createContext, useState, useEffect, useMemo } from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Player = {
  id: string;
  name: string;
  paid: boolean;
};

export type Team = Player[];

export type Game = {
  id: string;
  players: Player[];
  teams?: Team[];
  status: "active" | "cancelled" | "finished";
  createdAt: string;
};

export const GamesContext = createContext<{
  games: Game[];
  activeGame?: Game;
  addGame: (players: string[]) => void;
  cancelActiveGame(): void;
  finishActiveGame(): void;
  handlePlayerPayment(player: Player): void;
  drawTeams(numTeams: number): void;
}>({
  games: [],
  activeGame: undefined,
  addGame: () => {},
  cancelActiveGame: () => {},
  finishActiveGame: () => {},
  handlePlayerPayment: () => {},
  drawTeams: () => {}
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
    changeActiveGameStatus("cancelled");
  }

  function finishActiveGame() {
    changeActiveGameStatus("finished");
  }

  function changeActiveGameStatus(newStatus: Game["status"]) {
    const newGames = [...games];
    const game = newGames.find((game) => game.status === "active");
    if (!game) {
      return;
    }

    game.status = newStatus;
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

  function drawTeams(numTeams: number) {
    if (!activeGame) {
      return;
    }

    if (activeGame.players.length < numTeams) {
      throw new Error("Not enough players");
    }

    const newActiveGame = { ...activeGame };
    const newPlayers = [...newActiveGame.players];
    const shuffledPlayers = newPlayers.sort(() => Math.random() - 0.5);

    const teams: Team[] = [];
    for (let i = 0; i < numTeams; i++) {
      teams.push([]);
    }

    let teamIndex = 0;
    for (let i = 0; i < shuffledPlayers.length; i++) {
      teams[teamIndex].push(shuffledPlayers[i]);
      teamIndex = (teamIndex + 1) % numTeams;
    }

    newActiveGame.teams = teams;
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
        drawTeams,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
