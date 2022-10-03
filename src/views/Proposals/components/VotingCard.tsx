import { Flex, Text } from '@thaihuuluong/dogwatcher-uikit';
import { Button, ChevronRightIcon, Radio } from 'components/Pancake-uikit';
import { useTranslation } from 'contexts/Localization';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

interface VotingProps {
    endTimeVoting?:number
    votingId:number
}
const VotingCard: React.FC<VotingProps> = ({endTimeVoting, votingId}) => {
    const { t } = useTranslation()
    const convertDate = (props:number) => new Date(props*1000).toLocaleDateString("vi-VN")
    function handleClick () {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    const linkDetailsVoting = `/vote/${votingId}`
    return (
            <OfferCard>
                <Flex>
                    <TextTitle >{t("Proposal to open a run shoe showroom")}</TextTitle>
                    <CustomButtonDetail as={Link} to={linkDetailsVoting} onClick={handleClick}>Detail <ChevronRightIcon /></CustomButtonDetail>
                </Flex>
                                
                <Flex>
                    <TextDate mr='20px'>End date:</TextDate>
                    <Text fontSize='14px' lineHeight='20px' color='#FF592C'>{convertDate(endTimeVoting)}</Text>
                </Flex>
                <Flex>
                    <Button style={{borderRadius:"90px",backgroundColor:"#FF592C",boxShadow:'none',color:'#fff'}} as={Link} to={linkDetailsVoting} onClick={handleClick}>Vote now</Button>
                </Flex>
            </OfferCard>
    )
}
export default VotingCard

const OfferCard = styled(Flex)`
  border: 1px solid #ccc;
  border-radius: 10px;
  flex-direction: column;
  padding: 20px 35px;
  @media (max-width:600px) {
    padding: 20px 15px;
    }
  gap: 10px;  
  margin-bottom:1.5rem; 
`

const TextTitle = styled(Text)`
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
    display: flex;
    justify-content: center;
    margin-right:50px;
    @media (max-width:600px) {
        margin-right:10px;
    }
`

const TextDate = styled(Text)`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #11142D;
`
const CsButton = styled(Button)`
    background-color: #FF592C;
    color: #FFFFFF;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    border-radius: 90px;
`
const CustomButtonDetail = styled(Button)`
    background:none;
    border:none;
    cursor:pointer;
    display:flex;
    align-items:center;
    font-weight:900;
    font-size: 18px;
`