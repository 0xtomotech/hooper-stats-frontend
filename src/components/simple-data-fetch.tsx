"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

export function SimpleDataFetch() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("player_stats_by_game")
        .select("*")
        .in("player_name", ["Devin Booker", "Kevin Durant"])
        .order("date", { ascending: false })
        .limit(10); // Last 5 games for each player

      if (error) {
        setError("Could not fetch data");
        setIsLoading(false);
      } else {
        setData(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Last 5 games for Booker and Durant</h2>
      <ul>
        {data.map((game, index) => (
          <li key={index}>
            {game.player_name}: {game.three_points_pct}% -
            {game.team_won ? "Won" : "Lost"}
          </li>
        ))}
      </ul>
    </div>
  );
}
