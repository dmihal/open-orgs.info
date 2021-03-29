export type Category = 'l1' | 'app' | 'l2'

export interface OrganizationData {
  id: string
  name?: string
  category: Category
  treasury: number
}
