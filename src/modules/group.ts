import { SimpleObject } from "./type";

/**
 * 单字段分组
 * @param arr 
 * @param key 
 * @returns 
 */
export const groupBy = <T extends SimpleObject>(arr: T[], key: string) => {
  const map: Record<string | number, T[]> = {};
  arr.forEach(item => {
    const groupKey = item[key as keyof typeof item];
    map[groupKey] = map[groupKey] || []
    map[groupKey].push(item)
  })
  return map
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
  return map
}
