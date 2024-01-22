import SettingsStore from '@/store/SettingsStore'
import { createOrRestoreEIP155Wallet } from '@/utils/EIP155WalletUtil'
import { createWeb3Wallet, web3wallet } from '@/utils/WalletConnectUtil'
import { createWeb3Modal, defaultConfig, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'

function initWeb3Modal() {
  const polygon = {
    chainId: 137,
    name: 'Polygon',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: 'https://polygon.llamarpc.com'
  }
  const bsc = {
    chainId: 56,
    name: 'Binance Chain',
    currency: 'BSC',
    explorerUrl: 'https://bscscan.com',
    rpcUrl: 'https://rpc.ankr.com/bsc'
  }

  const metadata = {
    name: 'Moralis Wallet',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }

  const modal = createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [polygon, bsc],
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  })
}

export default function useInitialization() {
  const [initialized, setInitialized] = useState(false)
  const prevRelayerURLValue = useRef<string>('')

  initWeb3Modal()
  
  const { chainId } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const { relayerRegionURL } = useSnapshot(SettingsStore.state)

  const onInitialize = useCallback(async () => {
    try {
        if (walletProvider && chainId) {
          const { eip155Addresses } = await createOrRestoreEIP155Wallet(chainId, walletProvider)

          SettingsStore.setEIP155Address(eip155Addresses[0])
          await createWeb3Wallet(relayerRegionURL)
          setInitialized(true)
        }
    } catch (err: unknown) {
      alert(err)
    }
  }, [chainId, relayerRegionURL, walletProvider])

  // restart transport if relayer region changes
  const onRelayerRegionChange = useCallback(() => {
    try {
      web3wallet.core.relayer.restartTransport(relayerRegionURL)
      prevRelayerURLValue.current = relayerRegionURL
    } catch (err: unknown) {
      alert(err)
    }
  }, [relayerRegionURL])

  useEffect(() => {
    if (!initialized) {
      onInitialize()
    }
    if (prevRelayerURLValue.current !== relayerRegionURL) {
      onRelayerRegionChange()
    }
  }, [initialized, onInitialize, relayerRegionURL, onRelayerRegionChange])

  return initialized
}
