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

const chartDataByYear = {
  2022: [
    { month: "January", users: 0 },
    { month: "February", users: 0 },
    { month: "March", users: 0 },
    { month: "April", users: 0 },
    { month: "May", users: 0 },
    { month: "June", users: 0 },
    { month: "July", users: 189 },
    { month: "August", users: 356 },
    { month: "September", users: 489 },
    { month: "October", users: 401 },
    { month: "November", users: 298 },
    { month: "December", users: 156 },
  ],
  2023: [
    { month: "January", users: 142 },
    { month: "February", users: 98 },
    { month: "March", users: 67 },
    { month: "April", users: 45 },
    { month: "May", users: 32 },
    { month: "June", users: 24 },
    { month: "July", users: 18 },
    { month: "August", users: 14 },
    { month: "September", users: 12 },
    { month: "October", users: 10 },
    { month: "November", users: 8 },
    { month: "December", users: 6 },
  ],
  2024: [
    { month: "January", users: 4 },
    { month: "February", users: 3 },
    { month: "March", users: 2 },
    { month: "April", users: 2 },
    { month: "May", users: 1 },
    { month: "June", users: 1 },
    { month: "July", users: 1 },
    { month: "August", users: 0 },
    { month: "September", users: 0 },
    { month: "October", users: 0 },
    { month: "November", users: 5 },
    { month: "December", users: 0 },
  ],
  2025: [
    { month: "January", users: 0 },
    { month: "February", users: 0 },
    { month: "March", users: 2 },
    { month: "April", users: 0 },
    { month: "May", users: 6 },
    { month: "June", users: 0 },
    { month: "July", users: 0 },
    { month: "August", users: 1 },
    { month: "September", users: 5 },
    { month: "October", users: 0 },
    { month: "November", users: 0 },
    { month: "December", users: 3 },
  ],
  2026: [
    { month: "January", users: 1 },
    { month: "February", users: 0 },
    { month: "March", users: 0 },
    { month: "April", users: 0 },
    { month: "May", users: 0 },
    { month: "June", users: 0 },
    { month: "July", users: 0 },
    { month: "August", users: 0 },
    { month: "September", users: 0 },
    { month: "October", users: 0 },
    { month: "November", users: 0 },
    { month: "December", users: 0 },
  ],
};

const chartConfig = {
  users: {
    label: "Users",
    color: "#A7CC48",
  },
} satisfies ChartConfig;

export function ChartBarDefault() {
  const [activeYear, setActiveYear] = React.useState("2022");
  const chartData =
    chartDataByYear[activeYear as unknown as keyof typeof chartDataByYear];
  const years = Object.keys(chartDataByYear);

  return (
    <Card className='w-full'>
      <CardHeader className='flex justify-between items-center'>
        <div className='space-y-1.5'>
          <CardTitle>Monthly Sign-ups</CardTitle>
          <CardDescription>Signup breakdown</CardDescription>
        </div>
        <Select value={activeYear} onValueChange={setActiveYear}>
          <SelectTrigger
            className='ml-auto h-7 w-[130px] rounded-lg pl-2.5'
            aria-label='Select a year'
          >
            <SelectValue placeholder='Select year' />
          </SelectTrigger>
          <SelectContent align='end'>
            {years.map((year) => (
              <SelectItem key={year} value={year} className='rounded-lg'>
                <div className='flex items-center gap-2 text-xs'>
                  <span
                    className='flex h-3 w-3 shrink-0 rounded-xs'
                    style={{
                      backgroundColor: "#A7CC48",
                    }}
                  />
                  {year}
                </div>
              </SelectItem>
            ))}
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
            <Bar dataKey='users' fill='var(--color-users)' radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

//PIE CHART CODE
export const pieDescription = "An interactive pie chart";

type Lead = {
  name: {
    firstname: string;
    lastname: string;
    fullname: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  email: string;
  phoneNumber: string;
  language: string;
  country: string;
  businessName: string;
  businessCategory: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
};

const sourceColors: Record<string, string> = {
  "online-event": "#A7CC48",
  "physical-event": "#BDE84F",
  facebook: "#D1F379",
  instagram: "#DFF2AD",
  twitter: "#E8F7A0",
  linkedin: "#F0F9CE",
  referral: "#A7CC48",
  "excite-app": "#BDE84F",
  "excite-website": "#D1F379",
  other: "#999999",
};

const sourceLabels: Record<string, string> = {
  "online-event": "Online Event",
  "physical-event": "Physical Event",
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  referral: "Referral",
  "excite-app": "Excite App",
  "excite-website": "Excite Website",
  other: "Other",
};

export function ChartPieInteractive({ leads }: { leads?: Lead[] }) {
  const id = "pie-interactive";

  const pieData = React.useMemo(() => {
    if (!leads || leads.length === 0) return [];

    const sourceCount: Record<string, number> = {};
    leads.forEach((lead) => {
      const source = lead.source.toLowerCase();
      sourceCount[source] = (sourceCount[source] || 0) + 1;
    });

    return Object.entries(sourceCount)
      .map(([source, count]) => ({
        source,
        count,
        fill: sourceColors[source] || "#999999",
      }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  const [activeSource, setActiveSource] = React.useState(
    pieData[0]?.source || ""
  );

  const pieChartConfig = React.useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {
      count: {
        label: "Count",
        color: "",
      },
    };

    pieData.forEach((item) => {
      config[item.source] = {
        label: sourceLabels[item.source] || item.source,
        color: item.fill,
      };
    });

    return config;
  }, [pieData]) satisfies ChartConfig;

  const activeIndex = React.useMemo(
    () => pieData.findIndex((item) => item.source === activeSource),
    [activeSource, pieData]
  );

  React.useEffect(() => {
    if (pieData.length > 0 && !activeSource) {
      setActiveSource(pieData[0].source);
    }
  }, [pieData, activeSource]);

  if (!pieData || pieData.length === 0) {
    return (
      <Card className='flex flex-col'>
        <CardHeader className='flex-row items-start space-y-0 pb-0'>
          <div className='grid gap-1'>
            <CardTitle>Lead Sources</CardTitle>
          </div>
        </CardHeader>
        <CardContent className='px-0 pb-0 flex items-center justify-center h-[220px]'>
          <p className='text-muted-foreground'>No leads data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-chart={id} className='flex flex-col'>
      <ChartStyle id={id} config={pieChartConfig} />
      <CardHeader className='flex-row items-start space-y-0 pb-0'>
        <div className='grid gap-1'>
          <CardTitle>Lead Sources</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='p-5 flex items-center gap-4 h-[220px]'>
        <ChartContainer
          id={id}
          config={pieChartConfig}
          className='w-full max-w-[180px] h-40'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey='count'
              nameKey='source'
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
                    const count = pieData[activeIndex]?.count || 0;
                    const source = pieData[activeIndex]?.source || "";
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
                          {count.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground text-xs'
                        >
                          {sourceLabels[source] || source}
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
          <ul className='space-y-2 text-slate-700 max-h-[220px] overflow-y-auto'>
            {pieData.map((item) => (
              <li key={item.source} className='flex items-center gap-2'>
                <GoDotFill className='shrink-0' style={{ color: item.fill }} />
                <span className='text-xs'>
                  {sourceLabels[item.source] || item.source} ({item.count})
                </span>
              </li>
            ))}
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
