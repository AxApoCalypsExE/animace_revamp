import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function stripHtmlTags(str: string | null | undefined): string {
  if (typeof str !== "string") {
    return "No description...";
  }
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

export const truncateWords = (str: string | null | undefined, maxWords: number): string => {
  if (!str) {
    return "No description...";
  }

  const words = stripHtmlTags(str).split(" ");
  if (words.length <= maxWords) {
    return stripHtmlTags(str);
  }
  return words.slice(0, maxWords).join(" ") + "...";
};
