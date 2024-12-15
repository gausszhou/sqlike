import { groupBy } from "./modules/groupBy";
import { limit } from "./modules/limit";
import { orderBy } from "./modules/orderBy";
import { where } from "./modules/where";
import { Comparator, Filter, SimpleObject } from "./types";

export * from "./modules/groupBy";
export * from "./modules/orderBy";

class SQLike<T> {
  list: T[] = [];

  constructor(list: T[]) {
    this.list = list;
  }

  static create(list: any[]) {
    return new SQLike(list);
  }

  where(callback: Filter<T>) {
    return new SQLike(where(this.list, callback))
  }

  orderBy(comparator: Comparator<T> | Comparator<T>[]) {
    return new SQLike(orderBy(this.list as T[], comparator));
  }

  groupBy(key: string | string[]) {
    return new SQLike(groupBy(this.list as any[], key));
  }

  limit(count: number = 1000, offset: number = 0) {
    return new SQLike(limit(this.list, count, offset))
  }

  value() {
    return this.list;
  }
}

export default SQLike;