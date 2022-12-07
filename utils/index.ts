import { Section } from 'components/TreasuryBar'

export function portfolioToSections(portfolio?: any[]) {
  if (!portfolio) {
    return { total: 0, sections: [] };
  }

  let total = 0
  let other = 0
  const sections: Section[] = portfolio
    .map((item: any) => {
      total += item.value
      return {
        amount: item.value,
        name: item.symbol,
        unitAmount: item.amount,
        icon: item.icon,
        vesting: item.vesting,
      }
    })
    .filter((item: any) => {
      if (item.amount < total * 0.02) {
        other += item.amount
        return false
      }
      return true
    })
    .sort((a: any, b: any) => b.amount - a.amount)
  if (other > 0) {
    sections.push({ amount: other, name: 'Other' })
  }

  return { total, sections }
}