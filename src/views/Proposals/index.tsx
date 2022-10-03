import { Flex, Text } from '@thaihuuluong/dogwatcher-uikit';
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity';
import HeaderProposals from 'components/HeaderProposals/HeaderProposals';
import PageFullWidth from 'components/Layout/PageFullWidth';
import { Button, ChevronRightIcon, Radio } from 'components/Pancake-uikit';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import Nav from 'views/Invest/components/SubNav';
import { Container, WrapAppBody, Wrapper } from 'views/Invest/styles';
import { GetTotalProposals, GetListProposals } from 'state/votingProposals';
import CardBanner from './components/CardBanner';
import VotingCard from './components/VotingCard';

const Proposals = () => {
    const { t } = useTranslation()
    const [isNow, setIsNow] = useState("true");
    const handleChange = (evt) => {
            const { value } = evt.target;
            setIsNow(value);
    };
    const [ totalProposals ] = GetTotalProposals()
    const [ listProposals ] = GetListProposals(totalProposals)
    const currentTime = Date.now()
    const listVotingNow = listProposals.filter(data => data.endTime*1000 > currentTime)
    const listVotingEnd = listProposals.filter(data => data.endTime*1000 < currentTime)
    return (
        <PageFullWidth>
             <HeaderLiquidity bgColor='#029DA5' namePlace='Invest Together' nameTitle='run together'/>
             <Nav />
             <Container>
                <WrapAppBody>
                    <Wrapper>
                        <HeaderProposals headerName='Proposals'/>
                        <CardBanner />
                        <VoteContainer>
                          <WrapRadio>
                            <Radio name="md" value="true" onChange={handleChange} checked={isNow === "true"} />
                            <CsText>Vote now</CsText>
                          </WrapRadio>
                          <WrapRadio>
                            <Radio name="md" value="false" onChange={handleChange} checked={isNow === "false"} />
                            <CsText>Close</CsText>
                          </WrapRadio>
                        </VoteContainer>
                    </Wrapper>
                    <OfferContainer>
                    { isNow === "true" ?
                        <>
                            {listVotingNow.length !== 0 ?
                                <>
                                    {listVotingNow.map((item) => {
                                        return (
                                            <VotingCard
                                                endTimeVoting={item.endTime}
                                                votingId={item.votingId}
                                            />
                                        )
                                    })}
                                </>
                            :
                                <Flex width="100%" justifyContent="center">
                                    <Text>{t("No Data")}</Text>
                                </Flex>
                            }
                        </>

                    :
                        <>
                            {listVotingEnd.length !== 0 ?
                                <>
                                    {listVotingEnd.map((item) => {
                                        return (
                                            <VotingCard
                                                endTimeVoting={item.endTime}
                                                votingId={item.votingId}
                                            />
                                        )
                                    })}
                                </>
                            :
                                <Flex width="100%" justifyContent="center">
                                    <Text>{t("No Data")}</Text>
                                </Flex>
                            }
                        </>
                    }
                    
                    </OfferContainer>
                </WrapAppBody>
             </Container>
        </PageFullWidth>
    );
};

export default Proposals;

const VoteContainer = styled(Flex)`
    justify-content: center;
    align-items: center;
    gap: 100px;
    padding: 30px 0px;
    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
    margin-bottom: 32px;
`
const CsText = styled(Text)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
`
const WrapRadio = styled(Flex)`
  gap: 10px;
`
const OfferContainer = styled(Flex)`
    flex-wrap:wrap;
    justify-content: space-around;
    align-items: center;
    margin-bottom:1rem;
    min-height: 40vh;
`
