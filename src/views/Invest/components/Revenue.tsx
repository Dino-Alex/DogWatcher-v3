import React, { useState } from "react";
import { Text, Flex, Button, useModal, AutoRenewIcon } from "@thaihuuluong/dogwatcher-uikit";
import styled from "styled-components";
import { useTranslation } from "contexts/Localization";
import { GetDataUser, GetDataUserStaked } from "state/poolrun";
import { useWeb3React } from "@web3-react/core";
import { useHavest } from "views/PoolRun/hook/useHavert";
import { simpleRpcProvider } from 'utils/providers'
import { useGetBlockNumber } from "utils/getBlock";
import { useWithdrawPoolStore } from "../hook/useWithdrawPoolStore";
import { TextCard } from "../styles";
import { GetPendingReward, GetPendingRewardProposal } from "../hook/fetchDataPoolStore"
import { GetStakeAmountByBlock } from "../hook/fetchStakeAmountByBlock";


interface RenvenueProps {
    refresh?:number
    contractAddressPoolStore?:string
    contractAddressPoolProposals?:string
    onRefresh?:(newValue) => void
}
const RevenueAction: React.FC<RenvenueProps> = ({refresh, contractAddressPoolStore, contractAddressPoolProposals, onRefresh}) => {
    const { t } = useTranslation()
    const { block } = useGetBlockNumber()
    const { account } = useWeb3React()
    const { handleWithdraw, requestedWithdraw, pendingWithdraw } = useWithdrawPoolStore(account, contractAddressPoolStore, onRefresh)
    const { pendingReward } = GetPendingReward(contractAddressPoolStore,refresh,requestedWithdraw);
    const {stakeAmountByBlock} = GetStakeAmountByBlock(contractAddressPoolStore,block,requestedWithdraw)
    const {pendingProposal} = GetPendingRewardProposal(contractAddressPoolProposals,requestedWithdraw);
    return (
        <Flex width="100%" justifyContent="space-between" mt="10px" alignItems="center">
            <Flex flexDirection="column">
               <Flex flexDirection="column">
                    <TextCard><span style={{color:"#000"}}>{t("ERANED REVENUE")}</span></TextCard>
                    <TextCard color="#B2B3BD">{stakeAmountByBlock ? '0': pendingReward.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }</TextCard>
               </Flex>
               <Flex flexDirection="column">
                    <TextCard><span style={{color:"#000"}}>{t("ERANED BUSD")}</span></TextCard>
                    <TextCard color="#B2B3BD">{pendingProposal.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TextCard>
               </Flex>

            </Flex>
            <HarvestButton
                disabled={pendingWithdraw || stakeAmountByBlock || pendingProposal === 0 && pendingReward === 0 }
                onClick={handleWithdraw}
                endIcon={pendingWithdraw ? <AutoRenewIcon spin color="textDisable" /> : null  }
            > 
                Harvest
            </HarvestButton>
        </Flex>
    )
}
export default RevenueAction

const HarvestButton = styled(Button)`
    background: transparent;
    height: 50px;
    border: 2px solid #E6E8EC;
    border-radius: 90px;
    color: #000;
    box-shadow:none;
`