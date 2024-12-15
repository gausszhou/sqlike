import { Filter } from "../types";

export const where = <T>(arr: T[], callback: Filter<T>):T[] => {
  return arr.filter(item => callback(item));
}