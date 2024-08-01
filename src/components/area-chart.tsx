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
import { createClient } from "@/utils/supabase/client";

const chartConfig = {
  booker: {
    label: "Booker",
    color: "hsl(var(--chart-3))",
  },
  durant: {
    label: "Durant",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaChartComponent() {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("player_stats_by_game")
        .select("*")
        .in("player_name", ["Devin Booker", "Kevin Durant"])
        .order("team_game_number", { ascending: true });

      if (error) {
        setError("Could not fetch data");
        setIsLoading(false);
      } else {
        // Process the data for the chart
        const processedData = data.reduce((acc: any[], game: any) => {
          const existingGame = acc.find(
            (g) => g.team_game_number === game.team_game_number,
          );
          if (existingGame) {
            existingGame[game.player_name.split(" ")[1].toLowerCase()] =
              game.three_points_pct;
          } else {
            acc.push({
              team_game_number: game.team_game_number,
              [game.player_name.split(" ")[1].toLowerCase()]:
                game.three_points_pct,
            });
          }
          return acc;
        }, []);

        setChartData(processedData);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillBooker" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-booker)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-booker)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDurant" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-durant)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-durant)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="team_game_number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
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
              stroke="var(--color-booker)"
            />
            <Area
              dataKey="durant"
              type="monotone"
              fill="url(#fillDurant)"
              stroke="var(--color-durant)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
