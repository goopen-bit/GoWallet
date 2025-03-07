import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { EventsControllerState } from '@web3modal/core'
import SettingsStore from '@/store/SettingsStore'
import { toHex } from 'viem'
import { getAndConnectSmartWallet } from '../data/thirdWebUtil'

export default function AccountPicker() {
  const sepolia = {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.com',
    rpcUrl: 'https://sepolia.infura.io'
  }

  const baseSepolia = {
    chainId: 84532,
    name: 'Base Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://base-sepolia.com',
    rpcUrl: 'https://sepolia.base.org'
  }

  const arbitrumSepolia = {
    chainId: 421614,
    name: 'Arbitrum Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://arbitrum-sepolia.com',
    rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc'
  }

  const metadata = {
    name: 'Go Wallet',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }

  const modal = createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [sepolia, baseSepolia, arbitrumSepolia],
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  })

  modal.subscribeEvents(event => onEvent(event))

  async function onEvent(event: EventsControllerState) {
    // switch (event.data.event) {
    //   case 'CONNECT_SUCCESS':
    //   case 'MODAL_LOADED':
    //     break
    // }

    const walletProvider = modal.getWalletProvider()
    if (walletProvider) {
      const chainId = toHex(modal.getChainId() || 1)
      const wallet = await getAndConnectSmartWallet(chainId, walletProvider)
      const address = await wallet.getAddress()
      SettingsStore.setEIP155Address(address)
      SettingsStore.setActiveChainId(chainId)
    }
  }

  return (
    <w3m-button />
  )
}
