import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalize(input: string): string {
  console.log(input);
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
