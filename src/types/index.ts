export interface SimpleObject {
  [key: string | number]: any
}

export type Comparator<T> = (a: T, b: T) => number;

export type Filter<T> = (item: T) => boolean;