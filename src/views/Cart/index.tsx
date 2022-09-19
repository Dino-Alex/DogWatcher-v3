import { Button, Card, Checkbox, Flex, Table, Text } from '@phamphu19498/runtogether-uikit'
import Header from 'components/HeaderGlobal/Header'
import Container from 'components/Layout/Container'
import Row from 'components/Layout/Row'
import { ShoeCard, SuccessIcon, TokenRunIcon } from 'components/Pancake-uikit'
import { useTranslation } from 'contexts/Localization'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Page from 'views/Page'
import CartItem from './components/CartItem'
// import Header from './components/Header'

const Cart = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation()
  const priceBopx1 = "100"
  const priceBopx2 = "200"
  const priceBopx3 = "300"
  const priceBopx4 = "400"
  const [ totalPriceBuyItems, setTotalPriceBuyItems ] = useState(0)
  const [isBuy, setIsBuy] = useState(false)
  const [ totalBuyBox1, setTotalBuyBox1 ] = useState(0)
  const [ totalBuyBox2, setTotalBuyBox2 ] = useState(0)
  const [ totalBuyBox3, setTotalBuyBox3 ] = useState(0)
  const [ totalBuyBox4, setTotalBuyBox4 ] = useState(0)
  function renderTotalBuy (){
    return totalBuyBox1*Number(priceBopx1)+totalBuyBox2*Number(priceBopx2)+totalBuyBox3*Number(priceBopx4)+totalBuyBox4*Number(priceBopx4)
  }
  useEffect(() => {
    const totalPrice = renderTotalBuy()
    setTotalPriceBuyItems(totalPrice)
  }, [totalBuyBox1, totalBuyBox2, totalBuyBox3, totalBuyBox4]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header
        nameTitle="RUN TOGETHER"
        namePlace="Buy"
        imgIcon="./images/runMarketplace/imgBanner.png"
        bgColor="#FF8B27"
        // ImgShoe={<ShoeCard />}
      />

      <CustomPage>
        <CustomContainer width="100%">
          <Row>
            <CsFlex width="100%" flexWrap="wrap" alignItems="center" mt="1.25rem">
              <FlexGap>
                <TextAlign>{t('Box Type')}</TextAlign>
              </FlexGap>
              <FlexPc>
                <TextAlign>{t('Quantity')}</TextAlign>
              </FlexPc>
              <FlexPc>
                <TextAlign>{t('In Stock')}</TextAlign>
              </FlexPc>
              <FlexPc>
                <TextAlign>{t('Price')}</TextAlign>
              </FlexPc>
            </CsFlex>
          </Row>
          <CsRow mt="24px">
            <CartItem
              img="./images/runCard/boxYellow.png"
              instock="100"
              price={priceBopx1}
              shoeName="Effective training"
              shoeType="Training shoes"
              onUpdateTotalBuy={(newValue)=>setTotalBuyBox1(newValue)}
            />
          </CsRow>
          <ContainerBill>
            {!isBuy ? (
              <ContainerButtonClaim>
                <TotalPrice>
                  <Text color="#B2B3BD" bold>
                    TOTAL
                  </Text>
                  <WrapPrice>
                    <Text bold fontSize='20px'>{totalPriceBuyItems.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    <img
                      src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png"
                      alt="logo runtogether"
                      style={{ width: '30px', height: '30px' }}
                    />
                  </WrapPrice>
                </TotalPrice>
                <BtnContainer>
                  <ButtonBuy
                    disabled={totalPriceBuyItems === 0}
                  >
                    {t('Buy')}
                  </ButtonBuy>
                </BtnContainer>
              </ContainerButtonClaim>
            ) : (
              <ContainerClaim>
                <WrapHeadClaim>
                  <TextNumber>40</TextNumber>
                  <Text>Number of boxes not received</Text>
                </WrapHeadClaim>

                <WrapBodyClaim>
                  <WrapTitle>
                    <HeaderTitle>
                      <SuccessIcon />
                      <Text bold>You have successfully buy your boxes. Claim now</Text>
                    </HeaderTitle>
                    <Text color="#B1B5C3" fontSize="14px" marginLeft="30px">
                      The maximum number of boxes 1 time to receive is 120
                    </Text>
                  </WrapTitle>
                  <BtnContainer>
                    <ButtonCheckout>{t('Claim')}</ButtonCheckout>
                  </BtnContainer>
                </WrapBodyClaim>
              </ContainerClaim>
            )}
          </ContainerBill>
        </CustomContainer>
      </CustomPage>
    </>
  )
}

export default Cart

const CustomContainer = styled(Container)`
  @media only screen and (min-width: 600px) and (max-width: 1000px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`

const CustomPage = styled(Page)`
  margin-bottom: 1.25rem;
  min-height:50vh;
  @media only screen and (max-width: 600px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`

const CsRow = styled(Row)`
  display: flex;
  flex-direction: column;
`

const CsFlex = styled(Flex)`
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
`

const FlexGap = styled(Flex)`
  gap: 16px;
`

const FlexPc = styled(Flex)`
  @media screen and (max-width: 500px) {
    display: none;
  }
`

const TextAlign = styled(Text)`
  display: flex;
  align-items: center;
  color: #b1b5c3;
`
const TotalPrice = styled(Flex)`
  margin-right: 65px;
  align-items: center;
  justify-content: space-between;
  width: 220px;
  @media screen and (max-width: 500px) {
    margin-right: 0px;
    width: 100%;
  }
`

const BtnContainer = styled(Flex)`
  justify-content: flex-start;
  @media screen and (max-width:600px) {
    width:100%;
  }
`

const ContainerBill = styled(Row)`
  width: 100%;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #e4e4e4;
`
const ButtonCheckout = styled(Button)`
  background: #ff592c;
  border-radius: 90px;
  box-shadow: none;
  width: 120px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`
const WrapPrice = styled(Flex)`
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left:10px;
`

// Claim
const ContainerClaim = styled(Flex)`
  justify-content: space-between;
  flex-direction:row-reverse;
  width: 100%;
  margin-top:10px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 30px;
  }
`

const WrapHeadClaim = styled(Flex)`
  gap: 8px;
`

const TextNumber = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #23262f;
`

const WrapTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const HeaderTitle = styled.div`
  display: flex;
  gap: 10px;
`

const WrapBodyClaim = styled(Flex)`
  gap: 26px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`
const ButtonBuy = styled(Button)`
  background: #ff592c;
  border-radius: 90px;
  box-shadow: none;
  width: 180px;
  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top:10px;
  }
`
const ContainerButtonClaim = styled(Flex)`
  @media screen and (max-width: 600px) {
    width: 100%;
    flex-wrap:wrap;
  }
`