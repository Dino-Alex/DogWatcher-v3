import React from "react";
import styled from "styled-components";
import { Text, Flex, Button, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import { Wallet } from "components/Pancake-uikit"
import { GetTokenBalance } from "utils/getTokenBalance";
import tokens from "config/constants/tokens";
import { usePriceRunBusd } from "state/farms/hooks";
import { useTranslation } from "contexts/Localization";
import { FetchTotalVotingByUser, FetchUserUnStake, FetchDataVoting } from "../hook/fetchDataVoting";
import { useUnStake } from "../hook/useUnStake"

interface Props {
    votingId?:number
    refresh?:number
  }
const CardVote: React.FC<Props> = ({votingId, refresh}) => {
    const { t } = useTranslation()
    const runPriceUsd = usePriceRunBusd().toNumber()
    const { handleUnStake, requestedUnStake, pendingUnStake } = useUnStake(votingId)
    const { totalVoting } = FetchTotalVotingByUser(votingId, requestedUnStake, refresh)
    const { isUnStaked } = FetchUserUnStake(votingId, requestedUnStake)
    const { dataVoting } = FetchDataVoting(votingId, refresh)
    const currentTime = Date.now()
    const isTimeCanUnStake = currentTime > dataVoting.endDate*1000 
    return(
        <Container>
            <CustomFlex>
                <ColLeft>
                    <Text fontSize="14px" bold >Your RUN staked for vote</Text>
                    <Flex alignItems="center" style={{gap:"10px"}} width="100%" justifyContent="space-between">
                        <Text bold >{totalVoting.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                    </Flex>
                    <Text fontSize="14px" bold color="#B2B3BD">~ {(totalVoting*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD</Text>
                 </ColLeft>
            </CustomFlex>
            <Flex width="100%" justifyContent="center" mt="1rem">
                <CustomButton
                    disabled={pendingUnStake || totalVoting === 0 || isUnStaked === true || !isTimeCanUnStake}
                    onClick={handleUnStake}
                    endIcon={pendingUnStake ? <AutoRenewIcon spin color="textDisable" /> : null}
                >
                    {t("UnStake")}
                </CustomButton>
            </Flex>
        </Container>
    )
}

export default CardVote

const Container = styled(Flex)`
    border-radius:12px;
    flex-direction: column;
    width:550px;
    @media screen and (max-width: 768px){
        width:100%;
        padding: 20px 0px 0px 0px;
    }
`
export const ColLeft = styled.div`
    width: 100%;
    gap: 10px;
    display: grid;
`;
export const ColRight = styled(Flex)`
   width: 100%;
`;
export const CustomFlex = styled(Flex)`
    justify-content:space-between;
    width:100%;
    border:2px solid #5DCB83;
    border-radius: 20px;
    padding: 20px 20px;
`;
const CustomButton = styled(Button)`
    border-radius:90px;
    width:172px;
    box-shadow:none;
    background-color: rgb(255, 89, 44);
    color: #fff;
    @media screen and (max-width: 600px){
        width:100%;
    }
`