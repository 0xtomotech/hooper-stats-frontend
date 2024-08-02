"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PlayerStats = {
  playerName: string;
  allGames: {
    made: number;
    attempted: number;
    percentage: number;
  };
  wonGames: {
    made: number;
    attempted: number;
    percentage: number;
  };
  lostGames: {
    made: number;
    attempted: number;
    percentage: number;
  };
};

export function ComplexDataFetch() {
  const [stats, setStats] = useState<PlayerStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("player_stats_by_game")
        .select("*")
        .in("player_name", ["Devin Booker", "Kevin Durant"]);

      if (error) {
        setError("Could not fetch data");
        setIsLoading(false);
      } else {
        const processedStats = processData(data);
        setStats(processedStats);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const processData = (data: any[]): PlayerStats[] => {
    const playerStats: { [key: string]: PlayerStats } = {
      "Devin Booker": createEmptyPlayerStats("Devin Booker"),
      "Kevin Durant": createEmptyPlayerStats("Kevin Durant"),
    };

    data.forEach((game) => {
      const player = playerStats[game.player_name];
      const gameType = game.team_won ? "wonGames" : "lostGames";

      player.allGames.made += game.three_points_made;
      player.allGames.attempted += game.three_points_att;
      player[gameType].made += game.three_points_made;
      player[gameType].attempted += game.three_points_att;
    });

    // Calculate percentages
    Object.values(playerStats).forEach((player) => {
      calculatePercentage(player.allGames);
      calculatePercentage(player.wonGames);
      calculatePercentage(player.lostGames);
    });

    return Object.values(playerStats);
  };

  const createEmptyPlayerStats = (playerName: string): PlayerStats => ({
    playerName,
    allGames: { made: 0, attempted: 0, percentage: 0 },
    wonGames: { made: 0, attempted: 0, percentage: 0 },
    lostGames: { made: 0, attempted: 0, percentage: 0 },
  });

  const calculatePercentage = (stats: {
    made: number;
    attempted: number;
    percentage: number;
  }) => {
    stats.percentage =
      stats.attempted > 0 ? (stats.made / stats.attempted) * 100 : 0;
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Table>
      <TableCaption>Three-Point Percentage Statistics</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead>All Games</TableHead>
          <TableHead>Won Games</TableHead>
          <TableHead>Lost Games</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats.map((player) => (
          <TableRow key={player.playerName}>
            <TableCell className="font-medium">{player.playerName}</TableCell>
            <TableCell>{player.allGames.percentage.toFixed(2)}%</TableCell>
            <TableCell>{player.wonGames.percentage.toFixed(2)}%</TableCell>
            <TableCell>{player.lostGames.percentage.toFixed(2)}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
