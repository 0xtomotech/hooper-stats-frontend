"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";

const chartConfig = {
  booker: {
    label: "Booker",
    color: "hsl(var(--chart-1))",
  },
  durant: {
    label: "Durant",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const filterOptions = [
  { value: "all", label: "All Season" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
];

type GameData = {
  team_game_number: number;
  date: string;
  booker: number | null;
  durant: number | null;
};

export function AreaChartComponent() {
  const [chartData, setChartData] = React.useState<GameData[]>([]);
  const [filteredData, setFilteredData] = React.useState<GameData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState("all");

  React.useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("player_stats_by_game")
        .select("*")
        .in("player_name", ["Devin Booker", "Kevin Durant"])
        .order("team_game_number", { ascending: true });

      if (error) {
        console.error("Error fetching data:", error);
        setError("Could not fetch data");
        setIsLoading(false);
      } else if (!data) {
        setError("No data received");
        setIsLoading(false);
      } else {
        const processedData = processData(data);
        setChartData(processedData);
        setFilteredData(processedData);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    setFilteredData(filterChartData(chartData, filter));
  }, [chartData, filter]);

  const processData = (data: any[]): GameData[] => {
    return data.reduce((acc: GameData[], game: any) => {
      const existingGame = acc.find(
        (g) => g.team_game_number === game.team_game_number,
      );
      const playerKey = game.player_name.split(" ")[1].toLowerCase() as
        | "booker"
        | "durant";

      if (existingGame) {
        existingGame[playerKey] = game.three_points_pct;
      } else {
        acc.push({
          team_game_number: game.team_game_number,
          date: game.date,
          booker: playerKey === "booker" ? game.three_points_pct : null,
          durant: playerKey === "durant" ? game.three_points_pct : null,
        });
      }
      return acc;
    }, []);
  };

  const filterChartData = (data: GameData[], filter: string): GameData[] => {
    if (filter === "all") return data;

    return data.filter((item) => {
      const date = new Date(item.date);
      return (
        date.toLocaleString("default", { month: "long" }).toLowerCase() ===
        filter
      );
    });
  };

  if (isLoading) return <p>Loading chart data...</p>;
  if (error) return <p>Error loading chart data: {error}</p>;

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Three-Point Percentage Comparison</CardTitle>
          <CardDescription>
            Booker vs Durant throughout the season
          </CardDescription>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillBooker" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDurant" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="team_game_number"
              type="number"
              domain={["dataMin", "dataMax"]}
              tickCount={10}
              tickFormatter={(value) => Math.round(value).toString()}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Game ${value}`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="booker"
              type="monotone"
              fill="url(#fillBooker)"
              stroke="hsl(var(--chart-1))"
            />
            <Area
              dataKey="durant"
              type="monotone"
              fill="url(#fillDurant)"
              stroke="hsl(var(--chart-2))"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
