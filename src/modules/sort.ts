type Comparator<T> = (a: T, b: T) => number;

export const sortBy = <T>(arr: T[], comparator: Comparator<T>): T[] => {
  return arr.slice().sort(comparator);
}

export const sortByMultiple = <T>(arr: T[], comparators: Comparator<T>[]): T[] => {
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

