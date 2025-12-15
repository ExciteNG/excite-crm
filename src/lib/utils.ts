import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const reportTemplates = [
  "airtel",
  "ardova",
  "batnf",
  "bua",
  "chevron",
  "chi",
  "citi-bank",
  "cowrywse",
  "danone",
  "dufil",
  "exxon",
  "first-bank",
  "first-holdings",
  "fmdq",
  "frontier-oil",
  "gb-foods",
  "gtbank",
  "ihs",
  "international-breweries",
  "lacasera",
  "lafarge",
  "mainone",
  "midwestern",
  "mtn",
  "nestlé",
  "nigerian-breweries",
  "nlng",
  "oando",
  "opay",
  "piggyvest",
  "seplat-energy",
  "shell",
  "shoreline",
  "stanbic",
  "promasidor",
  "tgi",
  "uac-foods",
  "uba",
  "zenith",
];

export const sectors = [
  "general",
  "public sector",
  "manufacturing",
  "oil & gas",
  "ICT",
  "Agriculture",
  "finance",
  "fmcg",
];

export const platforms = [
  "newsteon",
  "pollteon",
  "trendteon",
  "surveyteon",
  "teonengine",
  "precise",
  "business",
  "esgforum",
  "prcan",
];

export const months = [
  {
    id: 1,
    value: 1,
    text: "January",
  },
  {
    id: 2,
    value: 2,
    text: "February",
  },
  {
    id: 3,
    value: 3,
    text: "March",
  },
  {
    id: 4,
    value: 4,
    text: "April",
  },
  {
    id: 5,
    value: 5,
    text: "May",
  },
  {
    id: 6,
    value: 6,
    text: "June",
  },
  {
    id: 7,
    value: 7,
    text: "July",
  },
  {
    id: 8,
    value: 8,
    text: "August",
  },
  {
    id: 9,
    value: 9,
    text: "September",
  },
  {
    id: 10,
    value: 10,
    text: "October",
  },
  {
    id: 11,
    value: 11,
    text: "November",
  },
  {
    id: 12,
    value: 12,
    text: "December",
  },
];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const years = ["2025", "2024", "2023", "2022", "2021", "2020"];

// const customErrorMap: z.ZodErrorMap = (error, ctx) => {
//   switch (error.code) {
//     default:
//       return { message: ctx.defaultError };
//   }
// };

// export default customErrorMap;

export function toUtcMidnightISOString(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based (January = 0)
  const day = date.getDate();

  const utcMidnight = new Date(Date.UTC(year, month, day));
  return utcMidnight.toISOString();
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();

  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return "th"; // 11th–13th
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinal(day)} ${month}, ${year}`;
}

export function localDateFromUtcISOString(utcString: string): Date {
  const date = new Date(utcString);
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}
