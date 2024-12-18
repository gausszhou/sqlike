export interface SimpleObject {
  [key: string | number]: any
}

export type Comparator<T> = (a: T, b: T) => number;

export type WhereFunc<T> = (item: T) => boolean;

export type MergeFunc<T> =  (list: T[]) => any;

export type JoinFunc<T, U> = (a: T ,b: U) => boolean;