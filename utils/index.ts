import { Section } from 'components/TreasuryBar'
import { PortfolioItem } from 'data/adapters/types';

export function portfolioToSections(portfolio: PortfolioItem[], filters: {native?: boolean, vesting?: boolean}) {
  let total = 0
  let other = 0
  const sections: Section[] = portfolio
    .filter(item => {
      if (filters.native !== undefined && item.native != filters.native) return false;
      if (filters.vesting !== undefined && item.vesting != filters.vesting) return false;
      return true
    })
    .map((item) => {
      total += item.value
      return {
        amount: item.value,
        name: item.symbol,
        unitAmount: item.amount,
        icon: item.icon,
        vesting: item.vesting,
      }
    })
    .filter((item) => {
      if (item.amount < total * 0.02) {
        other += item.amount
        return false
      }
      return true
    })
    .sort((a, b) => b.amount - a.amount)
  if (other > 0) {
    sections.push({ amount: other, name: 'Other' })
  }

  return { total, sections }
}

export function filteredTreasuryValue(protocol: any, native: boolean, vesting: boolean): number {
  const {currentTreasuryUSD, currentLiquidTreasuryUSD, currentTreasuryPortfolio } = protocol.results
  if (native) return vesting ? currentTreasuryUSD : currentLiquidTreasuryUSD
  return vesting
    ? currentTreasuryUSD - filteredPortfolioValue(currentTreasuryPortfolio, { native: true })
    : currentLiquidTreasuryUSD - filteredPortfolioValue(currentTreasuryPortfolio, { native: true, vesting: false })
}

export function filteredPortfolioValue(portfolio: PortfolioItem[], filters: {native?: boolean, vesting?: boolean}): number {
  return portfolio
    .filter(item => {
      if (filters.native !== undefined && item.native != filters.native) return false;
      if (filters.vesting !== undefined && item.vesting != filters.vesting) return false;
      return true
    })
    .reduce((totalValue: number, item: any) => totalValue + item.value, 0)
}