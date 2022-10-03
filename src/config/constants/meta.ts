import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'



export const DEFAULT_META: PageMeta = {
  title: 'STAY ONE STEP AHEAD.',
  // description:
  //   'A multi-chain platform that allows continuous flows between digital and traditional financial assets. This is where values are connected and best exploited.',
  
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  return {
    title: `Delta Labs - DogWatcher`,
    image: 'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fdeltalabsjsc.com%2Fwp-content%2Fuploads%2F2022%2F07%2FHomepage.jpg',
    description:"STAY ONE STEP AHEAD."
  }
} 
