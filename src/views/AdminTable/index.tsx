import { Button, Flex, Input, InputGroup, SearchIcon, Text } from '@phamphu19498/runtogether-uikit';
import { useTranslation } from 'contexts/Localization';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { GetDataDogWatcher } from 'state/dogwatcher';
import styled from 'styled-components';
import { latinise } from 'utils/latinise'
import ListAdmin from './components/ListAdmin';

const AdminTable = () => {

    const { t } = useTranslation()
    const [listDataDog] = GetDataDogWatcher()
    const tokenAuth = localStorage.getItem("tokenAuth")
    const history = useHistory();

    function handleClick() {
        history.push(`/create`)
    }

    // panigate
    function MovetoTop() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    const itemsPerPage = 5
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [saleArray, setSaleArray] = useState([]);
    const [query, setQuery] = useState('')
    const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listDataDog.length;
        setItemOffset(newOffset);
    };
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(saleArray.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(saleArray.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, saleArray]);

    useEffect(() => {
        function SearchItem() {
            const lowercaseQuery = latinise(query.toLowerCase())
            setSaleArray(listDataDog.filter((data) => {
                return latinise(data.walletName.toLowerCase()).includes(lowercaseQuery)
            }))
        }
        if (listDataDog || saleArray || query) {
            SearchItem()
        }
    }, [listDataDog, query]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Container>
            <Flex mb={4} mt={1} justifyContent='center'>
                <Text fontWeight='700' fontSize='26px'> TABLE ADMIN </Text>
            </Flex>
            <Flex justifyContent='space-between'>
                <Flex mb={1} mt={1} mr={2} justifyContent='center'>
                    <Flex width='98%'>
                        <InputGroup startIcon={<SearchIcon width="24px" />} scale="md">
                            <Input type="text" placeholder={t("Search...")} onChange={handleChangeQuery} />
                        </InputGroup>
                    </Flex>
                </Flex>
                {tokenAuth ?
                    <Flex mb={1} mt={1} mr={2} justifyContent='flex-end'>
                        <Button onClick={handleClick}>Create</Button>
                    </Flex>
                    :
                    <></>
                }
            </Flex>

            <TitleTable>
                <FlexListVotting width='100%' justifyContent='space-around'>
                    <TextListVotting justifyContent='center'>Name</TextListVotting>
                    <TextListVotting className='NoneWallet' id='Wallet' justifyContent='center'>Wallet</TextListVotting>
                    <TextListVotting justifyContent='center' id='Balance'>Balance/Limit</TextListVotting>
                    <TextListVotting justifyContent='center'>Email</TextListVotting>
                    <TextListVotting className='NoneWallet' id='Status' justifyContent='center'>Status</TextListVotting>
                    {tokenAuth ?
                        <TextListVottingV1 justifyContent='center' id='Action'>Action</TextListVottingV1>
                        :
                        <></>
                    }
                </FlexListVotting>
            </TitleTable>
            {currentItems ?
                <>
                    {currentItems.map((item, key) => {
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
            <CustomFlex width="100%" mt="1rem" justifyContent="center" height="62px">
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    onClick={MovetoTop}
                />
            </CustomFlex>
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
    @media screen and (max-width: 2560px) {
        &#Wallet{
            padding-right: 130px;
        }
        &#Balance{
            padding-right: 130px;
        }
        &#Action{
            padding-right: 130px;
        }
        &#Status{
            padding-left: 0px;
        }
    }
    @media screen and (max-width: 1444px) {
        &#Wallet{
            padding-right: 80px;
        }
        &#Balance{
            padding-right: 80px;
        }
        &#Action{
            padding-right: 80px;
        }
        &#Status{
            padding-left: 30px;
        }
    }
    @media screen and (max-width: 1024px) {
        &#Wallet{
            padding-right: 80px;
        }
        &#Balance{
            padding-right: 80px;
        }
        &#Action{
            padding-right: 80px;
        }
    }
    @media screen and (max-width: 768px) {
        font-size: 12px;
        width: 100px;
        &#Wallet{
            padding-right: 80px;
        }
        &#Balance{
            padding-right: 80px;
        }
    }
    @media screen and (max-width: 600px) {
        margin-left: -1.5rem;
        width: 80px;
        word-break: break-all;
        &.NoneWallet{
            display: none;
        }
    }
`
const TextListVottingV1 = styled(Flex)`
    width: 130px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 1024px) {
        &#Action{
            padding-right: 20px;
        }
    }
    @media screen and (max-width: 980px) {
       display: none;
    }
`
const CustomFlex = styled(Flex)`
    margin-bottom:1.5rem;
    .pagination{
        display:flex;
        flex-direction: row;
        width:500px;
        justify-content:space-around;
        align-items:center;
        @media screen and (max-width: 600px){
            width: 100%;
        }
        *{
            list-style-type: none;
        }
    }
    .page-link {
        background:${({ theme }) => theme.colors.tertiary};
        padding:12px;
        border-radius:5px !important;
        border:none !important;
        color:${({ theme }) => theme.colors.text};
        &:focus {
            box-shadow:none !important;
        }
        &:hover{
            background:${({ theme }) => theme.colors.backgroundTab};
        }
    }
    .page-item.disabled .page-link{
        background:${({ theme }) => theme.colors.disabled};
        cursor: not-allowed! important;
        opacity: 0.7;
        pointer-events:none;
    }
    .page-item.active .page-link{
        background:${({ theme }) => theme.colors.primaryBright};
        color:#fff;
    }
`