import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text, Flex, Button } from "@thaihuuluong/dogwatcher-uikit";
import ReactPaginate from 'react-paginate'
import { useTranslation } from 'contexts/Localization'
import { GetTotalSellItems, GetListItems } from "state/marketplace/index"
import { usePriceRunBusd } from "state/farms/hooks";
import ConditionCard from "./ConditionCard";
import CardAdmin from "./AdminCard"

const dataAdmin = [
    {
        id: 1,
        name: 'Athele Box'
    },
    {
        id: 2,
        name: 'Traning Box'
    },
    {
        id: 3,
        name: 'Competitor Box'
    },
    {
        id: 4,
        name: 'Running Box'
    },
]

interface Props {
    sortprice:string
    filterBoxType:number
}
const BOXESSTORE:React.FC<Props> = ({sortprice, filterBoxType}) => {
    const { t } = useTranslation()
    
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const [ totalSell ] = GetTotalSellItems()
    const [ listItems ] = GetListItems(totalSell)
    const [currentItems, setCurrentItems] = useState([...listItems])
    const [listNftItem, setListNftItem] = useState([])
    const itemsPerPage = 9
    const runBusdPrice = usePriceRunBusd().toNumber()
    useEffect(() => {
        const object = [...listItems]
        if (sortprice==="highest"){
            if ( filterBoxType !== 0 ) {
                return setListNftItem(
                    object.sort((obj1, obj2) => Number(obj2.priceListing) - Number(obj1.priceListing)).filter((data) => data.boxType === filterBoxType),
                )
            } 
            return setListNftItem(
                object.sort((obj1, obj2) => Number(obj2.priceListing) - Number(obj1.priceListing)),
            )
        } if (sortprice === 'lowest') {
            if ( filterBoxType !== 0 ) {
                return setListNftItem(
                    object.sort((obj1, obj2) => Number(obj1.priceListing) - Number(obj2.priceListing)).filter((data) => data.boxType === filterBoxType),
                )
            }
            return setListNftItem(
              object.sort((obj1, obj2) => Number(obj1.priceListing) - Number(obj2.priceListing)),
            )
        }
        return setListNftItem([...listItems])
    }, [sortprice, listItems, filterBoxType])
    
    // panigate
    function MovetoTop() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listNftItem.length
        setItemOffset(newOffset)
    }
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(listNftItem.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(listNftItem.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, listNftItem, sortprice])
    useEffect(() => {
        setItemOffset(0)
    }, [sortprice])
    return (
        <Flex width="100%" flexDirection="column" mt="1rem" height="auto" minHeight="50vh">
            <Flex width="100%" justifyContent="space-around" flexWrap="wrap">
                { currentItems.length !== 0 ?
                    <>
                        {currentItems.map((item) => {
                            return (
                            <ConditionCard
                                isStore={!false}
                                nftId={item.nftId}
                                saleId={item.saleId}
                                nftType={item.boxType}
                                price={item.priceListing}
                                seller={item.seller}
                                runBusdPrice={runBusdPrice}
                            />
                            )
                        })}
                    </>
                :
                    <Text>{t('No Data')}</Text>
                }
            </Flex>
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
        </Flex>
    )
}
export default BOXESSTORE

const CustomFlex = styled(Flex)`
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
