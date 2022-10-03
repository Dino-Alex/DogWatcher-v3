import React, { useState } from "react";
import styled from "styled-components";
import { Text, Flex, Button } from "@thaihuuluong/dogwatcher-uikit";
import { useTranslation } from "contexts/Localization";
import Inwallet from "./Inwallet"
import OnSale from "./OnSale"

interface Props {
    filter:number
}

const InventoryOnChain:React.FC<Props> = ({filter}) => {
    const { t } = useTranslation()
    const [ activeIndex, setActiveIndex ] = useState(0)
    return(
        <Flex width="100%" flexDirection="column">
            <Flex width="100%" justifyContent="center" alignItems="center" mt="1rem">
                <Flex width="100%">
                    <CustomButton onClick={()=>setActiveIndex(0)} isActive={activeIndex === 0 ? !false : false}>{t("ITEMS")}</CustomButton>
                    <CustomButton onClick={()=>setActiveIndex(1)} isActive={activeIndex === 1 ? !false : false}>{t("ON SALE")}</CustomButton>
                </Flex>
            </Flex>
            { activeIndex === 0 ?
                <Inwallet filterBoxType={filter}/>
            :
                <OnSale filterBoxType={filter}/>
            }
        </Flex>
    )
}
export default InventoryOnChain

const CustomButton = styled.div<{isActive:boolean}>`
  height:60px;
  width: 50%;
  padding:0px 10px 0px 10px;
  border-bottom: ${({ isActive }) => isActive ? "3px solid #E5C63F" : "none"};
  font-weight:bold;
  color:${({ isActive }) => isActive ? "#E5C63F" : "#B1B5C3"};
  padding-bottom:10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
`