import { JoinFunc, SimpleObject } from "../types";

export function innerJoin<T extends SimpleObject, U extends SimpleObject>(arr1: T[], arr2: U[], callback: JoinFunc<T, U>) {
  const result: [T, U][] = [];
  arr1.forEach((a) => {
    arr2.forEach((b) => {
      if (callback(a, b)) {
        result.push([a, b]);
      }
    });
  });
  return result;
}
