import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import React from 'react'
import MetaTags from 'react-meta-tags'
import styled from 'styled-components'


const PageMeta = () => {
  const pageMeta = getCustomMeta() || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  const pageTitle = title
  
  return (
    <MetaTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description}/>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
    </MetaTags>
  )
}

const PageFullWidth: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return (
        <Wrapper>
            <PageMeta />
            {children}
        </Wrapper>
  )
}

export default PageFullWidth

const Wrapper = styled.div`
    width:100%;
    height: auto;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
`