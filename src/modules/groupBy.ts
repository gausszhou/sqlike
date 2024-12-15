import { SimpleObject } from "../types";

export const groupBy = <T extends SimpleObject>(arr: T[], key: string | string[]) => {  
  if (Array.isArray(key)) {
    return groupByMultiple(arr, key);
  } else {
    return groupBySingle(arr, key)
  }
}

/**
 * 单字段分组
 * @param arr 
 * @param key 
 * @returns 
 */
export const groupBySingle = <T extends SimpleObject>(arr: T[], key: string) => {
  const map: Record<string | number, T[]> = {};
  arr.forEach(item => {
    const groupKey = item[key as keyof typeof item];
    map[groupKey] = map[groupKey] || []
    map[groupKey].push(item)
  })
  return Object.values(map)
}

/**
 * 多字段分组
 * @param arr 
 * @param keys 
 * @returns 
 */
export const groupByMultiple = <T extends SimpleObject>(arr: T[], keys: string[]) => {
  const map: Record<string, T[]> = {};
  arr.forEach(item => {
    const groupKey = keys.map(key => item[key]).join('-');
    map[groupKey] = map[groupKey] || []
    map[groupKey].push(item)
  })
  return Object.values(map)
}
