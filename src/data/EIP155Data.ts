/**
 * @desc Refference list of eip155 chains
 * @url https://chainlist.org
 */

/**
 * Types
 */
export type TEIP155Chain = keyof typeof EIP155_CHAINS

export type EIP155TestChain = {
  chainId: number
  name: string
  logo: string
  rgb: string
  rpc: string
  namespace: string
}

/**
 * Chains
 */
export const EIP155_MAINNET_CHAINS = {
  'eip155:1': {
    chainId: 1,
    name: 'Ethereum',
    logo: '/chain-logos/eip155-1.png',
    rgb: '99, 125, 234',
    rpc: 'https://cloudflare-eth.com/',
    namespace: 'eip155'
  },
  'eip155:56': {
    chainId: 56,
    name: 'Binance Smart Chain',
    logo: '/chain-logos/eip155-56.png',
    rgb: '130, 71, 229',
    rpc: 'https://rpc.ankr.com/bsc/',
    namespace: 'eip155'
  },
  'eip155:43114': {
    chainId: 43114,
    name: 'Avalanche C-Chain',
    logo: '/chain-logos/eip155-43113.png',
    rgb: '232, 65, 66',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    namespace: 'eip155'
  },
  'eip155:137': {
    chainId: 137,
    name: 'Polygon',
    logo: '/chain-logos/eip155-137.png',
    rgb: '130, 71, 229',
    rpc: 'https://polygon-rpc.com/',
    namespace: 'eip155'
  },
  'eip155:10': {
    chainId: 10,
    name: 'Optimism',
    logo: '/chain-logos/eip155-10.png',
    rgb: '235, 0, 25',
    rpc: 'https://mainnet.optimism.io',
    namespace: 'eip155'
  },
  'eip155:324': {
    chainId: 324,
    name: 'zkSync Era',
    logo: '/chain-logos/eip155-324.svg',
    rgb: '242, 242, 242',
    rpc: 'https://mainnet.era.zksync.io/',
    namespace: 'eip155'
  }
}

export const EIP155_TEST_CHAINS: Record<string,EIP155TestChain> = {
  'eip155:11155111': {
    chainId: 11155111,
    name: 'Ethereum Sepolia',
    logo: '/chain-logos/eip155-1.png',
    rgb: '99, 125, 234',
    rpc: 'https://sepolia.infura.io',
    namespace: 'eip155',
  },
  'eip155:84532': {
    chainId: 84532,
    name: 'Base Sepolia',
    logo: '/chain-logos/eip155-8453.png',
    rgb: '0, 64, 255',
    rpc: 'https://sepolia.base.org',
    namespace: 'eip155',
  },
  'eip155:421614': {
    chainId: 421614,
    name: 'Arbitrum Sepolia',
    logo: '/chain-logos/eip1155-42161.png',
    rgb: '40, 160, 220',
    rpc: 'https://sepolia-rollup.arbitrum.io/rpc',
    namespace: 'eip155',
  }
}

export const EIP155_CHAINS = { /*...EIP155_MAINNET_CHAINS,*/ ...EIP155_TEST_CHAINS }

/**
 * Methods
 */
export const EIP155_SIGNING_METHODS = {
  PERSONAL_SIGN: 'personal_sign',
  ETH_SIGN: 'eth_sign',
  ETH_SIGN_TRANSACTION: 'eth_signTransaction',
  ETH_SIGN_TYPED_DATA: 'eth_signTypedData',
  ETH_SIGN_TYPED_DATA_V3: 'eth_signTypedData_v3',
  ETH_SIGN_TYPED_DATA_V4: 'eth_signTypedData_v4',
  ETH_SEND_RAW_TRANSACTION: 'eth_sendRawTransaction',
  ETH_SEND_TRANSACTION: 'eth_sendTransaction'
}
