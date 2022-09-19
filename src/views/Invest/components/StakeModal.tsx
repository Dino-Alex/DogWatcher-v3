import React, { useState, useEffect } from "react";
import { Text, Flex, Button, Modal, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import { BalanceInput } from "components/Pancake-uikit";
import styled from "styled-components";
import { useStaked } from "../hook/useStake"

interface StakeModalProps {
    onDismiss?: () => void
    title?:string
    onRefresh?:(newValue) => void
    balanceTokenStake?:number
    contractAddress?:string
  }

const StakeModalPoolStore: React.FC<StakeModalProps> = ({onDismiss, title, onRefresh, balanceTokenStake, contractAddress}) => {
    const [stakeAmount, setStakeAmount] = useState('')
    const handleStakeInputChange = (input: string) => {
        setStakeAmount(input)
    }
    const [percent, setPercent ] = useState(0)
    function quickSelect (value:number){
        setPercent(value)
        setStakeAmount(((balanceTokenStake * value) / 100).toString())
    }
    const { handleStaked, requestedStake, pendingStaked } = useStaked(stakeAmount, contractAddress, onRefresh)
    return (
        <CustomModal title="" onDismiss={onDismiss}>
            <Container>
                <Text textAlign="center" fontSize="22px" bold>{title}</Text>
                <Flex width="100%" flexDirection="column" mt="1rem">
                    <Text>{title}</Text>
                    <BalanceInput
                        value={stakeAmount}
                        onUserInput={handleStakeInputChange}
                        decimals={18}
                    />
                </Flex>
                <Flex width="100%" mt="10px" mb="10px">
                    <Flex style={{gap:"4px"}}>
                        <Text>Balance:</Text>
                        <Text>{(Math.floor(balanceTokenStake * 100) / 100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    </Flex>
                </Flex>
                <Flex width="100%" justifyContent='space-between' flexWrap="wrap" style={{gap:"15px"}}>
                    <CustonButton isActive={percent === 25} onClick={()=>quickSelect(25)}>25%</CustonButton>
                    <CustonButton isActive={percent === 50} onClick={()=>quickSelect(50)}>50%</CustonButton>
                    <CustonButton isActive={percent === 75} onClick={()=>quickSelect(75)}>75%</CustonButton>
                    <CustonButton isActive={percent === 100} onClick={()=>quickSelect(100)}>100%</CustonButton>
                </Flex>
                <ConfirmButton 
                    onClick={handleStaked}
                    disabled={pendingStaked || Number(stakeAmount) === 0 || Number(stakeAmount) > balanceTokenStake}
                    endIcon={pendingStaked ? <AutoRenewIcon spin color="textDisable" /> : null}
                >
                    Confirm
                </ConfirmButton>
            </Container>
        </CustomModal>
    )
}
export default StakeModalPoolStore
const CustomModal = styled(Modal)`
    padding:0px;
`
const Container = styled(Flex)`
    width: 400px;
    flex-direction:column;
    @media screen and (max-width: 600px) {
        width: 300px !important;
    }
`
const CustonButton = styled(Button)<{isActive?:boolean}>`
    width: auto;
    height: 40px;
    box-shadow:none;
    background: ${({ isActive }) => isActive ? " #FF592C" : "transparent"};
    border: 2px solid ${({ isActive }) => isActive ? "transparent" : "#E6E8EC"};
    border-radius: 90px;
    color:${({ isActive }) => isActive ? " #FFF" : "#000"};
    @media screen and (max-width: 600px) {
        width: 45% !important;
    }
`
const ConfirmButton = styled(Button)`
    width:100%;
    border-radius:90px;
    background: #FF592C;
    color:#fff;
    margin-top:1.25rem;
    box-shadow:none;
`
