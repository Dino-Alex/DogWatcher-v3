import React from 'react';
import { useWeb3React } from '@web3-react/core';
import ConnectWalletButton from 'components/ConnectWalletButton';
import {
  Flex, UserMenu as UIKitUserMenu,
  UserMenuItem
} from 'components/Pancake-uikit';
import { useTranslation } from 'contexts/Localization';
import useAuth from 'hooks/useAuth';

const UserMenu = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const avatarSrc =  undefined
 
  if (!account) {
    return (
        <ConnectWalletButton scale="sm" />
    )
  }

  return (
    <UIKitUserMenu account={account} avatarSrc={avatarSrc}>
      {/* <WalletUserMenuItem hasLowBnbBalance={hasLowBnbBalance} onPresentWalletModal={onPresentWalletModal} /> */}
      <UserMenuItem as="button" onClick={logout}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {t('Disconnect')}
        </Flex>
      </UserMenuItem>
    </UIKitUserMenu>
  )
}

export default UserMenu
