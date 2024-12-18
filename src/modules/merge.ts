import { MergeFunc } from "../types";

export function merge<T>(arr: T[][], callback: MergeFunc<T>) {
  return arr.map(list => callback(list))
}