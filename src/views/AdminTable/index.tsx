import { Flex, Text } from '@phamphu19498/runtogether-uikit';
import { useTranslation } from 'contexts/Localization';
import React from 'react';
import styled from 'styled-components';
import ListAdmin from './components/ListAdmin';
import { ConfigAdmin } from './config';

const AdminTable = () => {

  const { t } = useTranslation()

    return (
        <Container>
            <TitleTable>
                <Flex>
                    List Admin Table
                </Flex>
                <FlexListVotting width='100%' justifyContent='space-around'>
                    <TextListVotting justifyContent='center'>Contract/Wallet</TextListVotting>
                    <TextListVotting ml="-25px" justifyContent='center'>Balance</TextListVotting>
                    <TextListVotting justifyContent='center'>Limit</TextListVotting>
                    <TextListVotting justifyContent='center'>Email</TextListVotting>
                </FlexListVotting>
            </TitleTable>
            {ConfigAdmin ?
                <>
                    {ConfigAdmin.map((item, key) => {
                        return (
                            <ListAdmin
                                contract={item.contract}
                                balance={item.balance}
                                limit={item.limit}
                                tokenLimit={item.tokenLimit}
                                email={item.email}
                                rowId={key}
                            />
                        )
                    })}
                </>
                :
               <>
                <Flex width="100%" justifyContent="center" mt="1rem">
                    <Text mt="2rem">{t("No Data")}</Text>
                </Flex>
               </>
            }
        </Container>
    );
};

export default AdminTable;

const Container = styled.div`
position: relative;
  padding: 2rem 2rem 2rem 2rem;
  border-radius: 20px;
  box-shadow: 0px 10px 14px -48px rgb(31 47 70 / 12%);
  background: #FCFCFD;

  @media screen and (max-width: 1024px) {
    padding: 2rem 30px;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem 0px;    
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
    margin-top: 0.5rem;
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
    width: 250px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 600px) {
        margin-left: -1.5rem;
        width: 80px;
        word-break: break-all;
    }
`