import { ethers } from 'ethers'

export const TOKENS = {
  UNI: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
}

const abi = [
  'function balanceOf(address holder) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
]

export async function getTokenBalance(token: string, holder: string): Promise<number> {
  const provider = ethers.getDefaultProvider()
  const erc20 = new ethers.Contract(token, abi, provider);
  const balance = await erc20.balanceOf(holder);
  const decimals = await erc20.decimals();

  return parseFloat(balance.toString()) / (10 ** parseFloat(decimals));
}
