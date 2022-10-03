import React, { useState } from "react";
import { Flex, Button, useModal, Text, AutoRenewIcon } from "@thaihuuluong/dogwatcher-uikit";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { Token } from "config/constants/types";
import { useTranslation } from 'contexts/Localization'
import { IconButton } from "views/PoolRun/style";
import { MinusIcon, PlusIcon } from "components/Pancake-uikit";
import StakeModalPoolStore from "./StakeModal";
import UnStakeModalPoolStore from "./UnStakeModal";
import { GetDataUser } from "../hook/fetachDataUser";
import { useApprove } from "../hook/useApproveStake"


interface StaketActionProps {
    tokenStakeSymbol?:any
    tokenStakeAddress?: any
    contractAddress?:any
    onRefresh?:(newValue) => void
    refresh?:number
    totalStaked?:number
}
const StakeAction: React.FC<StaketActionProps> = ({
    tokenStakeSymbol, 
    tokenStakeAddress, 
    contractAddress, 
    onRefresh, 
    refresh,
    totalStaked
}) => {
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const { handleApprove, requestedApproval, pendingTxApproval } = useApprove(tokenStakeAddress, contractAddress, onRefresh)
    const { dataUser } = GetDataUser(tokenStakeAddress, contractAddress, refresh)
    const [ openModalStake ] = useModal(
        <StakeModalPoolStore
            title="Stake"
            balanceTokenStake={dataUser.balance}
            contractAddress={contractAddress}
            onRefresh={onRefresh}
        />,
        true,
        true,
        'StakeModalPoolStore',
    )
    const [ openModalUnStake ] = useModal(
        <UnStakeModalPoolStore
            title="UnStake"
            totalStaked={totalStaked}
            contractAddress={contractAddress}
            onRefresh={onRefresh}
        />,
        true,
        true,
        'UnStakeModalPoolStore',
    )
    return (
        <Flex width="100%" flexDirection="column" mt="1rem">
            <Flex width="100%" mt="1rem" flexDirection="column">
                { dataUser.allowance !== 0 ?
                    <>
                        <Container width="100%" justifyContent="space-between" mb="1rem">
                            <Flex flexDirection="column">
                                <Text><span style={{color:"#FF592C"}}>{tokenStakeSymbol}</span> Staked</Text>
                                <Text mt="6px" fontSize="18px" bold>{((Math.floor(totalStaked * 100) / 100)).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                            </Flex>
                            <Flex style={{gap:"15px"}}>
                                <CustomIconButton
                                    onClick={openModalUnStake}
                                >
                                    <MinusIcon/>
                                </CustomIconButton>
                                <CustomIconButton
                                    onClick={openModalStake}
                                >
                                    <PlusIcon/>
                                </CustomIconButton>
                            </Flex>
                        </Container>
                    </>
                :
                    <ApprovedButton
                        disabled={pendingTxApproval}
                        onClick={handleApprove}
                        endIcon={pendingTxApproval ? <AutoRenewIcon spin color="textDisable" /> : null}
                    >
                        {t("Approve")}
                    </ApprovedButton>
                }
               

                
            </Flex>
        </Flex>
    )
}
export default StakeAction

const StakeButton = styled(Button)`
    width: 100%;
    background: #FF592C;
    border-radius: 90px;
    color:#fff;;
    box-shadow:none;
    height:55px;
`
const CustomIconButton = styled(IconButton)`
    background: #FF592C;
    box-shadow:none;
    display: flex;
    justify-content:center;
    align-items:center;
`
const Container = styled(Flex)`
    border: 2px solid #E6E8EC;
    border-radius: 12px;
    padding:20px;
`
const ApprovedButton = styled(Button)`
    width: 100%;
    background: #FF592C;
    border-radius: 90px;
    color:#fff;;
    box-shadow:none;
    height:55px;
`
