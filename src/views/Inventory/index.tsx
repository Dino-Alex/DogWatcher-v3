import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PageFullWidth from 'components/Layout/PageFullWidth'
import { Flex, Text, Button } from "@phamphu19498/runtogether-uikit"
import { useTranslation } from "contexts/Localization";
import Select, { OptionProps } from 'components/Select/Select';
import { DecryptsUserInfo } from "config/api/decrypts";
import Header from "components/HeaderGlobal/Header";
import Card from "./components/Card";
import Inwallet from "./components/Inwallet"
import OnSale from "./components/OnSale";
import OffChainBox from "./components/OffChainBox";
import InventoryOnChain from "./components/InventoryOnChain";
import InventoryOffChain from "./components/InventoryOffChain"

 
const Inventory = () => {
    const { t } = useTranslation()
    const [ activeIndex, setActiveIndex ] = useState(0)
    const [ tabIndex, setTabIndex ] = useState(0)
    const [ isOnChain, setIsOnChain] = useState(true)
    const [ isBoxes, setIsBoxes ] = useState(true)
    const handleSelectChain = (option: OptionProps): void => {
        setIsOnChain(option.value)
    }
    const handleChainBoxes = (option: OptionProps): void => {
        setIsBoxes(option.value)
    }
    const data:any = DecryptsUserInfo() || "";
    useEffect(() => {
        setIsBoxes(true);
    }, [isOnChain]);
    return (
        <PageFullWidth>
             <Header 
              nameTitle="RUN TOGETHER"
              namePlace="Inventory"
              imgIcon="/images/runInventory/imgBanner.png"
              bgColor="#E6C63F"
            />
            <Flex width="100%" maxWidth="1300px" flexDirection="column" padding="0px 12px 0px 12px">
                <Row>
                    <FlexPrice alignItems="center">

                        <Select
                            options={[
                                    {
                                        label: t('On-Chain'),
                                        value: true,
                                    },
                                    {
                                        label: t('Off-Chain'),
                                        value: false,
                                    },
                                ]}
                            onChange={handleSelectChain}
                        />
                        { !isOnChain &&
                            <Select
                                options={[
                                    {
                                        label: t('Boxes'),
                                        value: true,
                                    },
                                    {
                                        label: t('Shoes'),
                                        value: false,
                                    },
                                    ]}
                                    onChange={handleChainBoxes}
                            />

                        }
                        
                    </FlexPrice>
                    <CustomRow>
                        <WrapperTabs>
                            <CotainerTabAll>
                                <CustomTabAll isActive={ tabIndex === 0 ? !false : false} onClick={()=>setTabIndex(0)}>
                                    All
                                </CustomTabAll>
                            </CotainerTabAll>
                            <CustomTab isActive={ tabIndex === 1 ? !false : false} onClick={()=>setTabIndex(1)}>
                                <Tags src="/images/martketplace/11.png" alt="tag box"/>
                                <Text ml="3px" color="#777E91" bold>MetaRush</Text>
                                </CustomTab>
                            <CustomTab isActive={ tabIndex === 2 ? !false : false} onClick={()=>setTabIndex(2)}>
                                <Tags src="/images/martketplace/22.png" alt="tag box"/>
                                <Text ml="3px" color="#777E91" bold>MetaRun</Text>
                            </CustomTab>
                            <CustomTab isActive={ tabIndex === 3 ? !false : false} onClick={()=>setTabIndex(3)}>
                                <Tags src="/images/martketplace/33.png" alt="tag box"/>
                                <Text ml="3px" color="#777E91" bold>MetaRace</Text>
                            </CustomTab>
                            <CustomTab isActive={ tabIndex === 4 ? !false : false} onClick={()=>setTabIndex(4)}>
                                <Tags src="/images/martketplace/44.png" alt="tag box"/>
                                <Text ml="3px" color="#777E91" bold>MetaRich</Text>
                            </CustomTab>
                        </WrapperTabs>
                        
                    </CustomRow>
                </Row>
                { isOnChain ?
                    <InventoryOnChain filter={tabIndex}/>
                :
                    <InventoryOffChain isListBoxes={isBoxes} filterType={tabIndex}/>
                    // <Flex width="100%" justifyContent="center" mt="1rem" height="100%" minHeight="50vh">
                    //     <Text>{t("No Data")}</Text>
                    // </Flex>
                }
                
           </Flex>
          
        </PageFullWidth>
    )
}
export default Inventory

const CustomTab = styled(Button)<{isActive?:boolean}>`
    width: auto;
    background:none;
    box-shadow: none;
    font-size:22px;
    display: flex;
    justify-content: flex-start;
    padding-left:10px;
    font-weight:bold;
    border-radius:0px;
    color:${({ isActive }) => isActive ? "#4B19F5" : "#B1B5C3"};
    border-bottom:${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"}; 
    @media only screen and (max-width: 600px) {
        width: 50%;
        padding: 0px;
        &:first-child {
            width: 100%;
        }
        margin-bottom:10px;
    }
`
const CustomTabAll = styled(Button)<{isActive?:boolean}>`
    width: auto;
    background:none;
    box-shadow: none;
    font-size:22px;
    display: flex;
    justify-content: flex-start;
    padding-left:10px;
    font-weight:bold;
    border-radius:0px;
    color:${({ isActive }) => isActive ? "#4B19F5" : "#B1B5C3"};
    border-bottom:${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"}; 
    @media only screen and (max-width: 600px) {
        width: 50%;
        justify-content: center;
        margin-bottom:10px;
    }
`
const Row = styled(Flex)`
  margin-top:1.25rem;
  width:100%;
  justify-content: space-between;
  flex-wrap:wrap;
  @media only screen and (max-width: 600px) {
    justify-content:flex-end;
    padding-right:10px;
    ${Flex}{
      width: 100%;
      justify-content: flex-start;
      margin-top:1rem;
    }
  }
`
const CustomButton = styled.div<{isActive:boolean}>`
  height:60px;
  width: 50%;
  padding:0px 10px 0px 10px;
  border-bottom: ${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"};
  font-weight:bold;
  color:#777E91;
  padding-bottom:10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
`
const Tags = styled.img`
    height: 35px;
    width: 35px;
    border-radius:50%;
    overflow:hidden;
`
const FlexPrice = styled(Flex)`
    flex-wrap:wrap;
    gap: 30px;
    @media only screen and (min-width: 600px) and (max-width: 1024px){
        width: 100%;
        justify-content: space-between;
        margin-bottom:1rem;
    }
    @media only screen and (max-width: 600px) {
        gap: 20px;
    }
` 
const CustomFlex = styled(Flex)`
    width: auto;
    @media only screen and (max-width: 600px) {
       width: 100%;
       justify-content: center !important;
       align-items: center !important;
    }
`
const WrapperTabs = styled(Flex)`
    width:auto;
    @media only screen and (min-width: 600px) and (max-width: 1080px) {
        width: 100%;
        justify-content: space-between;
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
        flex-wrap:wrap;
    }
`
const CotainerTabAll = styled.div`
    display: flex;
    width:auto;
    @media only screen and (max-width: 600px) {
        width: 100%;
        justify-content: center;
    }
`
const CustomRow = styled(Flex)`
    flex-wrap:wrap;
    @media only screen and (max-width:1080px) {
        width: 100%;
        justify-content: center;
    }
`