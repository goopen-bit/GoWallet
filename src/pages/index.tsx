import AccountCard from '@/components/AccountCard'
import AccountPicker from '@/components/AccountPicker'
import PageHeader from '@/components/PageHeader'
import { EIP155_MAINNET_CHAINS, EIP155_TEST_CHAINS } from '@/data/EIP155Data'
import SettingsStore from '@/store/SettingsStore'
import { Text } from "@heroui/react"
import { Fragment } from 'react'
import { useSnapshot } from 'valtio'

export default function HomePage() {
  const {
    testNets,
    eip155Address,
    activeChainId
  } = useSnapshot(SettingsStore.state)

  return (
    <Fragment>
      <PageHeader title="Accounts">
        <AccountPicker data-testid="account-picker" />
      </PageHeader>
      {/* <Text h4 css={{ marginBottom: '$5' }}>
        Mainnets
      </Text>
      {Object.entries(EIP155_MAINNET_CHAINS).map(([caip10, { name, logo, rgb }]) => (
        <AccountCard
          key={name}
          name={name}
          logo={logo}
          rgb={rgb}
          address={eip155Address}
          chainId={caip10.toString()}
          data-testid={'chain-card-' + caip10.toString()}
        />
      ))} */}

      {/* {testNets ? ( */}
        <Fragment>
          <Text h4 css={{ marginBottom: '$5' }}>
            Testnets
          </Text>
          {Object.entries(EIP155_TEST_CHAINS).map(([caip10, { name, logo, rgb }]) => {
            return (
              <AccountCard
                key={name}
                name={name}
                logo={logo}
                rgb={rgb}
                address={eip155Address}
                chainId={caip10.toString()}
                data-testid={'chain-card-' + caip10.toString()}
              />
            )
          })}
        </Fragment>
      {/* ) : null} */}
    </Fragment>
  )
}
