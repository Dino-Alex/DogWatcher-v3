/* eslint-disable react/no-unescaped-entities */
import { Flex, LinkExternal, Text, useModal, Skeleton } from '@thaihuuluong/dogwatcher-uikit';
import TransactionsModal from 'components/App/Transactions/TransactionsModal';
import { Link, useParams } from 'react-router-dom';
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity';
import HeaderProposals from 'components/HeaderProposals/HeaderProposals';
import PageFullWidth from 'components/Layout/PageFullWidth';
import { BASE_BSC_URL } from 'config';
import { Button, ChevronRightIcon, Progress, Radio } from 'components/Pancake-uikit';
import { useTranslation } from 'contexts/Localization';
import React, { useState } from 'react';
import { GetTotalProposals, GetListProposals, GetSnapShortVoting } from 'state/votingProposals';
import styled from 'styled-components';
import Nav from 'views/Invest/components/SubNav';
import { Container, WrapAppBody, Wrapper } from 'views/Invest/styles';
import CardVote from './components/CardVote';
import VoteModal from './components/VoteModal';
import { FetchDataVoting } from './hook/fetchDataVoting';
import ListVote from './components/ListVote';
import { DataVote } from './config';


const Vote = () => {
  const { votingId }: { votingId: string } = useParams()
  const [ listVotingData ] = GetSnapShortVoting(Number(votingId))
  const [ refresh, setRefresh ] = useState(0)
  const { t } = useTranslation()
  const [totalProposals] = GetTotalProposals()
  const [listProposals] = GetListProposals(totalProposals)
  const votingDetails = listProposals.filter(data => data.votingId === Number(votingId))[0]
  function convertDate(date) {
    if (date) {
      return new Date(date * 1000).toLocaleDateString("vi-VN")
    } return <Skeleton width={60} />
  }
  function sAccount(dataAddress) {
    if (dataAddress) {
      return `${dataAddress.substring(0, 4)}...${dataAddress.substring(dataAddress.length - 4)}`
    }
    return <Skeleton width={60} />
  }
  function renderLink(address) {
    return `${BASE_BSC_URL}/address/${address}`
  }
  const [radio, setRadio] = useState(true);

  const handleChange = (value: boolean) => {
    setRadio(value);
  };
  const { dataVoting } = FetchDataVoting(votingId, refresh)
  const [openModalVoting] = useModal(
    <VoteModal
      votingAgree={dataVoting.agree}
      votingRefuse={dataVoting.refuse}
      totalVoting={dataVoting.totalVote}
      isAgree={radio}
      votingId={Number(votingId)}
      onRefresh={(newValue)=>setRefresh(newValue)}
      startTimeVoting={dataVoting.startDate}
      endTimeVoting={dataVoting.startDate}
      chairPerson={dataVoting.chairPerson}
    />,
    true,
    true,
    'VoteModal',
  )
  function renderPercent(agree: number, refuse: number, isAgree: boolean) {
    let renderValues = 0
    let values = 0
    if (isAgree === true) {
      renderValues = agree / (agree + refuse) * 100
    }
    else {
      renderValues = refuse / (agree + refuse) * 100
    }
    if (Number.isNaN(renderValues)) {
      values = 0
    } else {
      values = renderValues
    }
    return values
  }
  const currentTime = Date.now()
  const isTimeCanUnStake = currentTime > dataVoting.endDate*1000
  return (
    <PageFullWidth>
      <HeaderLiquidity bgColor='#029DA5' namePlace='Invest Together' nameTitle='run together' />
      <Nav />
      <Container>
        <WrapAppBody>
          <Wrapper>
            <HeaderProposals headerName='Vote' />
            <WrapTextDes>
              <TextProposal fontWeight="900" fontSize='24px'>{t("Proposal to open a run shoe showroom")}</TextProposal>
              <PdText>
                <CustomTextUser>{t("Users who own ")}<Textbold>{t("1,000,000 RUN ")}</Textbold>{t("tokens have the right to propose to open the store owner.")}</CustomTextUser>
                <CustomTextStore>
                  {t("When the pool reaches ")}<Textbold>2.5M </Textbold>{t("amount of RUN tokens staked. RunTogether will open a shoe showroom, ")}
                  {t("users will receive ")}<Textbold>30%</Textbold>{t("of the store's sales profit and an annual stake interest of ")}<Textbold>20%.</Textbold>
                </CustomTextStore>
              </PdText>

            </WrapTextDes>
            <Divider />
            <TextTitle fontWeight="bold">{t("Details")}</TextTitle>
            <WrapDetail>
              <CustomWidth>
                <CsFlex>
                  <Text>{t("Createtor")}</Text>
                  {votingDetails?.ownerAddress ?
                    <StyledLinkExternal href={renderLink(votingDetails?.ownerAddress)}>{sAccount(votingDetails?.ownerAddress)}</StyledLinkExternal>
                    :
                    <Skeleton width={60} />
                  }
                </CsFlex>
                <CsFlex/>
                </CustomWidth>
              <CustomWidth>
                <CsFlex>
                  <Text>{t("Start date")}</Text>
                  <Text fontWeight='600'>{convertDate(votingDetails?.startTime)}</Text>
                </CsFlex>
                <CsFlex>
                  <Text>{t("End date")}</Text>
                  <Text fontWeight='600' >{convertDate(votingDetails?.endTime)}</Text>
                </CsFlex>
              </CustomWidth>
            </WrapDetail>
            <Divider />
            <TextTitle fontWeight="bold">{t("Current Results")}</TextTitle>
            <WrapCurrentResult>
              <CustomWidthResult>
                <Text color="#B2B3BD">{t("Agree")}</Text>
                <Progress variant="round" primaryStep={(dataVoting.agree / dataVoting.totalVote) * 100} scale="sm" />
                <WrapPercent>
                  <Text fontSize='14px'>{dataVoting.agree.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Votes</Text>
                  <Text fontSize='14px' color="#5DCB83;">
                    {renderPercent(dataVoting.agree, dataVoting.refuse, true).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                  </Text>
                </WrapPercent>
              </CustomWidthResult>
              <CustomWidthResult>
                <Text color="#B2B3BD">{t("Refuse")}</Text>
                <Progress bgcolor="#E75243" variant="round" primaryStep={(dataVoting.refuse / dataVoting.totalVote) * 100} scale="sm" />
                <WrapPercent>
                  <Text fontSize='14px'>{dataVoting.refuse.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Votes</Text>
                  <Text fontSize='14px' color="#E75243">
                    {renderPercent(dataVoting.agree, dataVoting.refuse, false).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                  </Text>
                </WrapPercent>
              </CustomWidthResult>
            </WrapCurrentResult>
            <Divider />
            <TextTitle fontWeight="bold">{t("Cast your vote")}</TextTitle>
            <WrapCast>
              <WrapTotalRadio>   
                <WrapRadio>
                  <Radio name="md" onChange={()=>handleChange(true)} checked={radio === !false} />
                  <Text>{t("Agree")}</Text>
                </WrapRadio>
                <WrapRadio>
                  <Radio name="md" onChange={()=>handleChange(false)} checked={radio === false} />
                  <Text>{t("Refuse")}</Text>
                </WrapRadio>
              </WrapTotalRadio>      
              <WrapBtnCast>
                <Button style={{ borderRadius: "90px", backgroundColor: "#FF592C", boxShadow: 'none', color: '#fff' }} onClick={openModalVoting}>Cast vote</Button>
              </WrapBtnCast>
            </WrapCast>
            <WrapBtnCastMobile>
              <CsButtonMobile style={{ borderRadius: "90px", backgroundColor: "#FF592C", boxShadow: 'none', color: '#fff' }} onClick={openModalVoting}>Cast vote</CsButtonMobile>
            </WrapBtnCastMobile>  
            <WrapCard>
              { !isTimeCanUnStake &&
                  <CardVote 
                    votingId={Number(votingId)}
                    refresh={refresh}
                  />
              }
            </WrapCard>
          </Wrapper>
          <Wrapper>
          {listVotingData.length !== 0 ?
              <>
            <TitleTable>
                <Flex>
                  VOTES ({listVotingData.length}) 
                </Flex>
                <FlexListVotting width='100%' justifyContent='space-around'>
                  <TextListVotting>TX Hash</TextListVotting>
                  <TextListVotting ml="-25px" justifyContent='center'>Status</TextListVotting>
                  <TextListVotting justifyContent='center'>Amount</TextListVotting>
                </FlexListVotting>
            </TitleTable>
                {listVotingData.map((item, key) => {
                  return (
                    <ListVote
                      address={item.voter}
                      status={item.option}
                      balance={item.amount}
                      txAddress={item.transactionHash}
                      rowId={key}
                    />
                  )
                })}
              </>
              :
              <Flex width="100%" justifyContent="center" mt="1rem">
                <Text mt="2rem">{t("No Data")}</Text>
              </Flex>
            }
          </Wrapper>
        </WrapAppBody>
      </Container>
    </PageFullWidth>
  );
};

export default Vote;

export const Textbold = styled.span`
  font-weight:900;
`;

export const WrapTextDes = styled(Text)`
 text-align:center;
`;

export const Divider = styled.hr`
 width:100%;
 text-align: center;
 border:1px solid #ddd;
 margin: 50px 0px;
`
const TextTitle = styled(Text)`
font-size:24px;
font-weight:bold;
margin:20px 0;
`
export const WrapDetail = styled(Flex)`
  @media (max-width:600px) {
    flex-direction:column;
  }
`;
export const CsFlex = styled(Flex)`
  justify-content: space-between;
  margin-bottom:10px;

`;
const CustomWidth = styled(Flex)`
    flex-direction:column;
    &:first-child {
      padding-right:5rem;
      @media (max-width:600px) {
        padding:0 
    }
   }
   &:nth-child(2) {   
      padding-left:5rem;
      padding-right:5rem;
      @media (max-width:600px) {
        padding:0 
    }
   }
    width:50%;
    @media screen and (max-width: 1080px) {
        width: 100%;
        padding:0;
    }
`
const CustomWidthResult = styled(CustomWidth)`
   &:first-child {
      padding-right:1rem;
   }
   &:nth-child(2) {   
      padding-left:1rem;
   }
   gap:10px;
   
`
const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 600;
  justify-content: center;
  color: #11142D;
  /* > svg{
    fill: #A95EEA;
  } */
  :hover{
    color: #9127ee !important;
    > svg {
    color: #9127ee !important;
      fill: #9127ee ;
    }
  }
`
export const WrapCurrentResult = styled(Flex)`
  /* display: flex; */
`;
export const CsFlexResult = styled(Flex)`
  flex-direction:column;
`;

const WrapRadio = styled(Flex)`
  gap: 10px;
`
const WrapTotalRadio = styled.div`
display:flex;
gap: 40px;
@media (max-width:600px){
     gap:100px;
}
`
export const WrapCast = styled(Flex)`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin: 20px 0;
    @media (max-width:600px){
      margin:0;
    }
`;
export const Wrap = styled(Flex)`
  
`;
export const WrapBtnCast = styled(Flex)`
   justify-content:flex-end;
   @media (max-width:600px) {
       justify-content:flex-start;
       margin:30px 0;
       display:none;
    }
`;
const WrapBtnCastMobile = styled(Flex)`
   justify-content:flex-end;
   display:none;
   @media (max-width:600px) {
       justify-content:flex-start;
       margin:30px 0;
       display:block;

    }
`;
export const PdText = styled.div`
  padding: 0 60px;
  @media (max-width:600px) {
        padding:0 ;
        text-align:center;
    }
`;
const CustomTextUser = styled(Text)`
@media (max-width:1024px) and (min-width:769px){
  font-size:14px;
}
@media (max-width:600px){
  font-size:12px;
  padding-bottom:10px;
}
@media (max-width:500px) and (min-width:400px){
  font-size:10px;
}
`
const CustomTextStore = styled (Text)`
@media (max-width:1024px) and (min-width:769px){
  font-size:14px;
}
@media (max-width:600px){
  font-size:12px;
}
@media (max-width:500px) and (min-width:400px){
  font-size:10px;
}
`
const TextProposal = styled(Text)`
padding:0 0 20px;
@media (max-width:600px){
  padding-bottom:10px;
}
`
const WrapPercent = styled(Flex)`
   justify-content:space-between;
`
const WrapCard = styled.div`
 display:flex;
 justify-content: center;
 margin-top:15px;
 @media (max-width:600px){
   margin:0;
 }
`
const TitleTable = styled(Flex)`
    width: 100%;
    height: 80px;
    background: #029DA5;
    border-radius: 20px 20px 0px 0px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    padding-left: 40px;
    color: #FFFFFF;
    flex-direction: column;
    align-items: left;
    justify-content: center;
`

const FlexListVotting = styled(Flex)`
    width: 100%;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    gap: 10px;

    @media screen and (max-width: 768px){
        gap: 20px;
        padding-left: 15px;
    }
    @media screen and (max-width: 600px){
        gap: 0px;
        padding-left: 0;
    }
`
const TextListVotting = styled(Flex)`
    width: 150px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
`
const CsButtonMobile= styled(Button)`
 @media (max-width:600px){
    padding: 0 40px!important;
 }
 
`