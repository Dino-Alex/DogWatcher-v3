
import { Button, Card, Checkbox, Flex, Table, Td, Text, Th, useModal } from '@thaihuuluong/dogwatcher-uikit'
import { TokenRunIcon } from 'components/Pancake-uikit'
import { MinusIcon, PlusIcon } from 'components/Pancake-uikit/widgets/Menu/icons'
import { useTranslation } from 'contexts/Localization'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { renderBoxName, renderImgBox } from "utils/renderBGCard";
import ModalSelctBoxType from "./ModalSelectBoxType"

interface Props{
  price?:string,
  instock?:string,
  img?:string,
  shoeName?:string,
  shoeType?:string
  onUpdateTotalBuy?:(newValue) => void
}
const CartItem: React.FC<Props> = ({ price, instock, img, shoeName, shoeType, onUpdateTotalBuy }) => {
  const { t } = useTranslation()
  const [ selectedBoxType, setSelectedBoxType ] = useState(1)
  const [ openModal ] = useModal(<ModalSelctBoxType onSelectBoxType={(newValue)=>setSelectedBoxType(newValue)} activeIndex={selectedBoxType} />)
  const [totalQuanlity, setTotalQuanlity] = useState(0) 


  const handlePlus = () => {
    if (totalQuanlity < Number(instock)) {
      setTotalQuanlity(totalQuanlity + 1)
    }
  }

  const handleMinus = () => {
    if (totalQuanlity > 0) {
      setTotalQuanlity(totalQuanlity - 1)
    }
  }
  useEffect(() => {
    onUpdateTotalBuy(totalQuanlity)
  }, [totalQuanlity]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ContainerCart>
      <ItemProcuct>
        <ColProduct>
          <ContainerFlex onClick={openModal}>
              <Img width="96px" src={renderImgBox(selectedBoxType)} />
              <WrapInfo>
                <TextName color="#23262F" fontWeight="600" fontSize="18px">
                  {renderBoxName(selectedBoxType)}
                </TextName>
              </WrapInfo>
          </ContainerFlex>
        </ColProduct>
        <ColQuantity>
          <TitleMobile>{t('Quantity')}</TitleMobile>
          <ButtonQuanlity onClick={handleMinus}>
            <MinusIcon />
          </ButtonQuanlity>
          <Text bold width="30px" textAlign="center">{totalQuanlity}</Text>
          <ButtonQuanlity onClick={handlePlus}>
            <PlusIcon />
          </ButtonQuanlity>
        </ColQuantity>
        <ColInStock>
          <TitleMobile>{t('In Stock')}</TitleMobile>
          <Text bold>{instock}</Text>
        </ColInStock>
        <ColPrice>
          <TitleMobile>{t('Price')}</TitleMobile>
          <Text bold style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {price}
            <img
              src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png"
              alt="logo runtogether"
              style={{ width: '30px', height: '30px' }}
            />
          </Text>
        </ColPrice>
      </ItemProcuct>
    </ContainerCart>
  )
}

export default CartItem

const ContainerCart = styled.div`
  width: 100%;
  /* margin-top: 24px; */
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 500p) {
    margin-top: 0px;
  }
`

const ItemProcuct = styled(Flex)`
  justify-content: space-between;
  border-top: 1px solid #e4e4e4;
  padding-top: 30px;
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;

  &:last-child {
    padding-bottom: 30px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
    display: flex;
    flex-direction: column;
  }
`

const ColProduct = styled(Flex)`
  gap: 16px;
  align-items: center;
`

const ColQuantity = styled(Flex)`
  gap: 10px;
  align-items: center;
  @media screen and (max-width: 600px) {
    justify-content: space-between;
  }
`

const ColInStock = styled(Flex)`
  display: flex;
  align-items: center;
  @media screen and (max-width: 600px) {
    justify-content: space-between;
  }
`

const TitleMobile = styled(Text)`
  display: none;
  @media screen and (max-width: 600px) {
    display: block;
    color: #b1b5c3;
  }
`

const ColPrice = styled(Flex)`
  gap: 10px;
  align-items: center;
  @media screen and (max-width: 600px) {
    justify-content: space-between;
  }
`
const WrapInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`

const Img = styled.img``

export const CsCheckbox = styled(Checkbox)`
  border: 2px solid #e4e4e4;
  width: 20px;
  height: 20px;
  border: 2px solid #e4e4e4;
  border-radius: 4px;
`
export const CsButton = styled(Button)`
  background: transparent;
  box-shadow: none;
  border: 2px solid #e6e8ec;
  border-radius: 90px;
  color: #23262f;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`
const TextName = styled(Text)`
  font-size: 16px;
`
const ButtonQuanlity = styled(Button)`
  background: transparent;
  box-shadow: none;
  border: 2px solid #E6E8EC;
  border-radius: 100px;
  width: 32px;
  height: 32px;
  padding: 4px;
`
const ContainerFlex = styled(Flex)`
  gap:20px;
  cursor:pointer;
`