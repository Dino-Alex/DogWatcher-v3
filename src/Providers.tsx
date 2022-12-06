import { light, ModalProvider } from '@thaihuuluong/dogwatcher-uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { LanguageProvider } from 'contexts/Localization'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ToastsProvider } from 'contexts/ToastsContext'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import store from 'state'
import { ThemeProvider } from 'styled-components'
import { getLibrary } from 'utils/web3React'

const ThemeProviderWrapper = (props) => {
  return <ThemeProvider theme={light} {...props} />
}

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <ThemeProviderWrapper>
              <LanguageProvider>
                <RefreshContextProvider>
                  <ModalProvider>{children}</ModalProvider>
                </RefreshContextProvider>
              </LanguageProvider>
            </ThemeProviderWrapper>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
