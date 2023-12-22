import { Verify } from '@walletconnect/types'
import { proxy } from 'valtio'

/**
 * Types
 */
interface State {
  testNets: boolean
  eip155Address: string
  relayerRegionURL: string
  activeChainId: string
  currentRequestVerifyContext?: Verify.Context
}

/**
 * State
 */
const state = proxy<State>({
  testNets: typeof localStorage !== 'undefined' ? Boolean(localStorage.getItem('TEST_NETS')) : true,
  activeChainId: '1',
  eip155Address: '',
  relayerRegionURL: ''
})

/**
 * Store / Actions
 */
const SettingsStore = {
  state,

  setEIP155Address(eip155Address: string) {
    state.eip155Address = eip155Address
  },

  setRelayerRegionURL(relayerRegionURL: string) {
    state.relayerRegionURL = relayerRegionURL
  },

  setActiveChainId(value: string) {
    state.activeChainId = value
  },

  setCurrentRequestVerifyContext(context: Verify.Context) {
    state.currentRequestVerifyContext = context
  },

  toggleTestNets() {
    state.testNets = !state.testNets
    if (state.testNets) {
      localStorage.setItem('TEST_NETS', 'YES')
    } else {
      localStorage.removeItem('TEST_NETS')
    }
  },
}

export default SettingsStore
