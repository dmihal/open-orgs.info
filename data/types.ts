export type Category = 'l1' | 'app' | 'l2'

export interface IssuanceData {
  id: string
  name?: string
  category: Category
  sevenDayMA: number
  oneDay: number
}
