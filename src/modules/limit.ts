export const limit = <T>(arr: T[], count: number, offset = 0) => {
  return arr.slice(offset, count)
}
