import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalize(input: string): string {
  return (input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()).replace(
    /-/g,
    " "
  );
}
export function splitText(input: string, splitBy: string) {
  if (!input.includes(splitBy)) return input;
  return splitBy + input.split(splitBy).join(" ");
}
