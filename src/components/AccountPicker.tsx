import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { EventsControllerState } from '@web3modal/core'
import SettingsStore from '@/store/SettingsStore'
import { toHex } from 'viem'
import { getAndConnectSmartWallet } from '../data/thirdWebUtil'

export default function AccountPicker() {
  const polygon = {
    chainId: 137,
    name: 'Polygon',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: 'https://polygon.llamarpc.com'
  }

  const metadata = {
    name: 'Moralis Wallet',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }

  const modal = createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [polygon],
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
