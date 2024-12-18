import { WhereFunc } from "../types";

export const where = <T>(arr: T[], callback: WhereFunc<T>):T[] => {
  return arr.filter(item => callback(item));
}