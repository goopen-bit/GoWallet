import { Binance, Chain, Ethereum, Mumbai, Polygon } from "@thirdweb-dev/chains";
import { SmartWallet, EthersWallet } from "@thirdweb-dev/wallets";
import { ethers } from 'ethers'

function getChainById(chainId: string): Chain {
  switch (chainId) {
    case '0x1':
      return Ethereum;
    case '0x38':
      return Binance;
    case '0x89':
      return Polygon;
    case '0x13881':
      return Mumbai;
    default:
      throw new Error(`Chain with id ${chainId} not supported`);
  }
}

export async function getAndConnectSmartWallet(
  chainId: string,
  walletProvider: ethers.providers.ExternalProvider,
  accountAddress?: string
) {
  const provider = new ethers.providers.Web3Provider(walletProvider)
  const signer = provider.getSigner()
  const personalWallet = new EthersWallet(signer)

  // TODO: to env
  const config = {
    chain: getChainById(chainId),
    factoryAddress: "0x354cB3956f1afd85889aA8087Ab14f899D1dAFE3",
    clientId: '18076e906c89429c22578e210792fd3d',
    gasless: true, // enable or disable gasless transactions
  };
  
  const wallet = new SmartWallet(config);
  await wallet.connect({
    personalWallet,
    accountAddress,
  });
  return wallet;
}
