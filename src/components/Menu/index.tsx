import React from 'react'
import { Menu as UikitMenu } from '@thaihuuluong/dogwatcher-uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { useLocation } from 'react-router-dom'
import { useProfile } from 'state/profile/hooks'
import { configIsConnect } from './config'
import GlobalSettings from './GlobalSettings'
import UserMenu from './UserMenu'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
 
const Menu = (props) => {
  const {toggleTheme } = useTheme()
  const { profile } = useProfile()
  const { setLanguage, t } = useTranslation()
  const location = useLocation()
  const {pathname} = location
  const activeMenuItem = getActiveMenuItem({ menuConfig: configIsConnect(t), pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })
  return (
    <UikitMenu
      userMenu={<UserMenu/>}
      isDark={!true}
      toggleTheme={toggleTheme}
      currentLang="en"
      langs={languageList}
      setLang={setLanguage}
      globalMenu={<GlobalSettings />}
      links={configIsConnect(t)}
      activeItem={activeMenuItem?.href}
      activeSubItem={activeSubMenuItem?.href}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
