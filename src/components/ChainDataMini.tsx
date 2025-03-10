import { EIP155_CHAINS } from '@/data/EIP155Data'
import { getChainData } from '@/data/chainsUtil'
import { Card, Row, styled, Image, Avatar } from '@nextui-org/react'
import { ReactNode, useMemo } from 'react'

interface Props {
  chainId?: string // namespace + ":" + reference
}

// const StyledLogo = styled(Image, {})

export default function ChainDataMini({ chainId }: Props) {
  const chainData = useMemo(() => getChainData(chainId), [chainId])
  console.log(chainData)

  if (!chainData) return <></>
  return (
    <>
      <Row>
        <Avatar size={'xs'} src={chainData.logo} />
        <span style={{ marginLeft: '5px' }}>{chainData.name}</span>
      </Row>
    </>
  )
}
