import EIP155Lib from '@/lib/EIP155Lib'
import { ethers } from 'ethers'
import { getAndConnectSmartWallet } from '../data/thirdWebUtil'
import { toHex } from 'viem'

export let wallet: EIP155Lib
export let eip155Wallets: Record<string, EIP155Lib>
export let eip155Addresses: string[]

let address: string

/**
 * Utilities
 */
export async function createOrRestoreEIP155Wallet(chainId: number, walletProvider: ethers.providers.ExternalProvider) {
  const chainHexId = toHex(chainId || 1)
  const smartWallet = await getAndConnectSmartWallet(chainHexId, walletProvider)
  wallet = new EIP155Lib(smartWallet)

  address = await wallet.getAddress()

  eip155Wallets = {
    [address]: wallet,
  }
  eip155Addresses = Object.keys(eip155Wallets)

  return {
    eip155Wallets,
    eip155Addresses
  }
}
