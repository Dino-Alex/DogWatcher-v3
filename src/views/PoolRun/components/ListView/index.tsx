import React from "react";
import { Text, Flex, Button } from "@thaihuuluong/dogwatcher-uikit";
import styled from "styled-components";
import ContainerRow from "./components/PoolRow"

const PoolList = () => {
    return (
        <ContainerList>
            <ContainerRow/>
        </ContainerList>
    )
} 
export default PoolList

const ContainerList = styled(Flex)`
    width:100%;
    flex-direction: column;
    height: auto;
    flex-wrap:wrap;
`