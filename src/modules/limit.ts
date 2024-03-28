export const limit = <T>(arr: T[], limit: number, offset = 0) => {
  return arr.slice(offset, limit)
}
