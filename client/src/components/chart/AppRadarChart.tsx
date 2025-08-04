"use client";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "A radar chart with a grid filled";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 285 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 203 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 264 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const AppRadarChart = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <h2 className="text-lg font-semibold">Radar Chart - Grid Filled</h2>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[350px] w-full"
      >
        <RadarChart data={chartData}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <PolarGrid className="fill-(--color-desktop) opacity-20" />
          <PolarAngleAxis dataKey="month" />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ChartContainer>
    </div>
  );
};

export default AppRadarChart;
