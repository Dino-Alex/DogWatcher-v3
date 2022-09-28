import { Button, Flex, Text } from '@phamphu19498/runtogether-uikit';
import { useTranslation } from 'contexts/Localization';
import React from 'react';
import { GetDataDogWatcher } from 'state/dogwatcher';
import styled from 'styled-components';
import ListAdmin from './components/ListAdmin';


const AdminTable = () => {

  const { t } = useTranslation()
  const [listDataDog] = GetDataDogWatcher(true)
  
    return (
        <Container>
            <Flex mb={1} mt={1} justifyContent='center'>
                <Text fontWeight='700' fontSize='26px'>List Admin Table</Text>
            </Flex>
            <Flex mb={1} mt={1} mr={2} justifyContent='flex-end'>
                {/* <Button onClick={openCreateModal}>Create</Button> */}
            </Flex>
            <TitleTable>
                <FlexListVotting width='100%' justifyContent='space-around'>
                    <TextListVotting justifyContent='center'>Name</TextListVotting>
                    <TextListVotting justifyContent='center'>Wallet</TextListVotting>
                    <TextListVotting justifyContent='center'>Balance/Limit</TextListVotting>
                    <TextListVotting justifyContent='center'>Email</TextListVotting>
                    <TextListVotting justifyContent='center'>Status</TextListVotting>
                    <TextListVotting justifyContent='center'>Action</TextListVotting>
                </FlexListVotting>
            </TitleTable>
            {listDataDog ?
                <>
                    {listDataDog.map((item, key) => {
                        return (
                            <ListAdmin
                                id={item.id}
                                walletName={item.walletName}
                                walletAddress={item.walletAddress}
                                limit={item.limit}
                                email={item.email}
                                status={item.status}
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
    width: 300px;
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