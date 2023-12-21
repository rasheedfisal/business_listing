import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GetRandomNumber = () => {
  //generate 3 digit random numbers between 100 - 999
  return Math.floor(Math.random() * (999 - 100 + 1) + 100);
};
