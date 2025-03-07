// import { Binance, Chain, Ethereum, Mumbai, Polygon } from "@thirdweb-dev/chains";
import { ArbitrumSepolia, BaseSepoliaTestnet, Chain, Sepolia  } from "@thirdweb-dev/chains";
import { SmartWallet, EthersWallet } from "@thirdweb-dev/wallets";
import { ethers } from 'ethers'

function getChainById(chainId: string): Chain {
  console.log('chainId', chainId)
  switch (chainId) {
    case '0xaa36a7':
      return Sepolia;
    case '0x14a34':
      return BaseSepoliaTestnet;
    case '0x66eee':
      return ArbitrumSepolia;
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
    factoryAddress: "0xf090b349e8dac9976f7a16018d1455309ef142e0",
    clientId: '462c1089d53dea32288f614af4a9749d',
    gasless: true, // enable or disable gasless transactions
  };
  
  const wallet = new SmartWallet(config);
  await wallet.connect({
    personalWallet,
    accountAddress,
  });
  return wallet;
}
