import { Flex } from '@thaihuuluong/dogwatcher-uikit'
import RegisterModal from 'components/Menu/GlobalSettings/RegisterModal'
import React from 'react'
import styled from 'styled-components'

const Register = () => {
  return (
    <Container>
      <RegisterModal />
    </Container>
  )
}

export default Register

const Container = styled(Flex)`
  align-items: center;
  justify-content: center;
`
