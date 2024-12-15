import { Comparator } from "../types";


export const orderBy = <T>(arr: T[], comparator: Comparator<T> | Comparator<T>[]): T[] => {
  if (Array.isArray(comparator)) {
    return orderByMultiple(arr, comparator);
  } else {
    return orderBySingle(arr, comparator)
  }
}

export const orderBySingle = <T>(arr: T[], comparator: Comparator<T>): T[] => {
  return arr.slice().sort(comparator);
}

export const orderByMultiple = <T>(arr: T[], comparators: Comparator<T>[]): T[] => {
  return arr.slice().sort((a, b) => {
    for (const comparator of comparators) {
      const result = comparator(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  });
}

