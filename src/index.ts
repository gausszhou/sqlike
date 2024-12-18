import { groupBy } from "./modules/groupBy";
import { innerJoin } from "./modules/join";
import { limit } from "./modules/limit";
import { merge } from "./modules/merge";
import { orderBy } from "./modules/orderBy";
import { where } from "./modules/where";
import { Comparator, WhereFunc, MergeFunc, JoinFunc, SimpleObject } from "./types";

export * from "./modules/groupBy";
export * from "./modules/orderBy";

class SQLike<T extends SimpleObject> {
  list: T[] = [];

  constructor(list: T[]) {
    this.list = list;
  }

  static create<T extends SimpleObject>(list: T[]) {
    return new SQLike(list);
  }

  where(callback: WhereFunc<T>) {
    return new SQLike(where(this.list, callback))
  }

  orderBy(comparator: Comparator<T> | Comparator<T>[]) {
    return new SQLike(orderBy(this.list as T[], comparator));
  }

  groupBy(key: string | string[]) {
    return new SQLike(groupBy(this.list as T[], key));
  }

  innerJoin<U extends SimpleObject>(sqlike: SQLike<U>, callback: JoinFunc<T, U>) {
    return new SQLike(innerJoin(this.list as T[], sqlike.list as U[], callback));
  }

  merge(callback: MergeFunc<any>) {
    return new SQLike(merge(this.list as any[], callback));
  }

  limit(count: number = 1000, offset: number = 0) {
    return new SQLike(limit(this.list, count, offset))
  }

  value() {
    return this.list;
  }
}

export default SQLike;