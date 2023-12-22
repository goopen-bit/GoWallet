import { Polygon } from '@thirdweb-dev/chains'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ConnectParams, SmartWallet, SmartWalletConnectionArgs } from '@thirdweb-dev/wallets'
import { providers, Wallet } from 'ethers'

/**
 * Types
 */
interface IInitArgs {
  mnemonic?: string
}

/**
 * Library
 */
export default class EIP155Lib {
  wallet: SmartWallet

  constructor(wallet: SmartWallet) {
    this.wallet = wallet
  }

  connect(connectOptions?: ConnectParams<SmartWalletConnectionArgs>) {
    return this.wallet.connect(connectOptions)
  }

  getAddress() {
    return this.wallet.getAddress()
  }

  signMessage(message: string) {
    return this.wallet.signMessage(message)
  }

  async signTypedData(domain: any, types: any, data: any) {
    const sdk = await ThirdwebSDK.fromWallet(this.wallet, Polygon)
    return sdk.wallet.signTypedData(domain, types, data)
  }

  async signTransaction(transaction: providers.TransactionRequest) {
    const signer = await this.wallet.getSigner()
    return signer.signTransaction(transaction)
  }

  async sendTransaction(transaction: providers.TransactionRequest) {
    return this.wallet.sendRaw(transaction)
  }
}
