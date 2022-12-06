import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Text } from '@thaihuuluong/dogwatcher-uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import useAuth from 'hooks/useAuth'
import React from 'react'
import styled from 'styled-components'
import { getBscScanLink } from 'utils'
import CopyAddress from './CopyAddress'

const CsButton = styled(Button)`
  background: #ff592c;
  border-radius: 25px;
  color: #FAFAFB;
`

interface WalletInfoProps {
  hasLowBnbBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowBnbBalance, onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const { logout } = useAuth()

  const handleLogout = () => {
    onDismiss()
    logout()
  }

  return (
    <>
      <Text color="primaryBright" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
        {t('Your Address')}
      </Text>
      <CopyAddress account={account} mb="24px" />
      {hasLowBnbBalance && (
        <Message variant="warning" mb="24px">
          <Box>
            <Text fontWeight="bold">{t('BNB Balance Low')}</Text>
            <Text as="p">{t('You need BNB for transaction fees.')}</Text>
          </Box>
        </Message>
      )}
      <Flex alignItems="center" justifyContent="end" mb="24px">
        <LinkExternal color="primaryBright" href={getBscScanLink(account, 'address')}>
          {t('View on BscScan')}
        </LinkExternal>
      </Flex>
      <CsButton variant="secondary" width="100%" onClick={handleLogout}>
        {t('Disconnect Wallet')}
      </CsButton>
    </>
  )
}

export default WalletInfo
