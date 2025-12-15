"use client";
// import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartStyle,
  type ChartConfig,
} from "@/src/components/ui/chart";
import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { type PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { GoDotFill } from "react-icons/go";


export const description = "A bar chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#A7CC48",
  },
} satisfies ChartConfig;


export function ChartBarDefault() {
const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month);

    const pieChartConfig = {
      visitors: {
        label: "Visitors",
      },
      desktop: {
        label: "Desktop",
      },
      mobile: {
        label: "Mobile",
      },
      january: {
        label: "January",
        color: "var(--chart-1)",
      },
      february: {
        label: "February",
        color: "var(--chart-2)",
      },
      march: {
        label: "March",
        color: "var(--chart-3)",
      },
      april: {
        label: "April",
        color: "var(--chart-4)",
      },
      may: {
        label: "May",
        color: "var(--chart-5)",
      },
    } satisfies ChartConfig;

    const months = React.useMemo(
      () => desktopData.map((item) => item.month),
      []
    );
  return (
    <Card className='w-full'>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Monthly Signups</CardTitle>
          <CardDescription>Signup breakdown</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className='ml-auto h-7 w-[130px] rounded-lg pl-2.5'
            aria-label='Select a value'
          >
            <SelectValue placeholder='Select month' />
          </SelectTrigger>
          <SelectContent align='end' className='rounded-xl'>
            {months.map((key) => {
              const config = pieChartConfig[key as keyof typeof pieChartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className='rounded-lg [&_span]:flex'
                >
                  <div className='flex items-center gap-2 text-xs'>
                    <span
                      className='flex h-3 w-3 shrink-0 rounded-xs'
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='w-full'>
        <ChartContainer config={chartConfig} className='h-[200px] w-full'>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='desktop' fill='var(--color-desktop)' radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 leading-none font-medium'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
};

//PIE CHART CODE
export const pieDescription = "An interactive pie chart";

const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
];

const pieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: `#A7CC48`,
  },
  february: {
    label: "February",
    color: "#A7CC48",
  },
  march: {
    label: "March",
    color: "#BDE84F",
  },
  april: {
    label: "April",
    color: "#D1F379",
  },
  may: {
    label: "May",
    color: "#DFF2AD",
  },
} satisfies ChartConfig;

export function ChartPieInteractive() {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month);
  
  //Clean this code later
  React.useEffect(() => {
    const history = false;
    if (history) setActiveMonth('')
  }, []);
  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  );

  return (
    <Card data-chart={id} className='flex flex-col'>
      <ChartStyle id={id} config={pieChartConfig} />
      <CardHeader className='flex-row items-start space-y-0 pb-0'>
        <div className='grid gap-1'>
          <CardTitle>Lead Sources</CardTitle>
          {/* <CardDescription>January - June 2024</CardDescription> */}
        </div>
      </CardHeader>
      <CardContent className='px-0 pb-0 flex items-center'>
        <ChartContainer
          id={id}
          config={pieChartConfig}
          className=' w-full max-w-[260px] h-[220px]'
        >
          <PieChart className=''>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey='desktop'
              nameKey='month'
              innerRadius={45}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <section>
          <ul className='space-y-2 text-slate-700'>
            <li className='flex items-center gap-2'>
              <GoDotFill className='text-[#A7CC48]' />{" "}
              <span className='text-xs'>Instagram</span>
            </li>
            <li className='flex items-center gap-2'>
              <GoDotFill className='text-[#A7CC48]' />{" "}
              <span className='text-xs'>Tiktok Ads</span>
            </li>
            <li className='flex items-center gap-2'>
              <GoDotFill className='text-[#BDE84F]' />{" "}
              <span className='text-xs'>Facebook Ads</span>
            </li>
            <li className='flex items-center gap-2'>
              <GoDotFill className='text-[#D1F379]' />{" "}
              <span className='text-xs'>Youtube Ads</span>
            </li>
            <li className='flex items-center gap-2'>
              <GoDotFill className='text-[#DFF2AD]' />{" "}
              <span className='text-xs'>WhatsApp Channel</span>
            </li>
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}

