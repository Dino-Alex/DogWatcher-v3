import { Flex, PencilIcon } from '@phamphu19498/runtogether-uikit';
import { BlockIcon, CloseIcon } from 'components/Pancake-uikit';
import React from 'react';
import styled from 'styled-components';
import { formatAmount } from 'utils/formatInfoNumbers';

interface Props {
    contract?:string
    balance?:number
    limit?:number
    tokenLimit?: string
    email?:string
    rowId?:number
}

const ListAdmin:React.FC<Props> = ({
    contract,
    balance,
    limit,
    tokenLimit,
    email,
    rowId,
}) => {
   
    function setAddress (dataAddress) {
        if ( dataAddress ) {
            return `${dataAddress.substring(0, 4)}...${dataAddress.substring(dataAddress.length - 4)}`
        }
        return ""
    }

    function setEmail (dataEmail) {
        if ( dataEmail ) {
            return `${dataEmail.substring(0, 4)}...${dataEmail.substring(dataEmail.length - 4)}`
        }
        return ""
    }

    const windownSize = window.screen.width

    return (
        <Container>
            <BodyTable isActive={rowId % 2===0 ? !false : false}>
                <FlexData>
                    <Flex style={{cursor: 'pointer'}} width='100%' justifyContent='center' alignItems='center'>
                        {setAddress(contract)}
                    </Flex>
                </FlexData>
                <FlexData justifyContent='center'>
                <Flex width='100%' justifyContent='center' alignItems='center'>
                    {windownSize <= 768 ?
                        <>
                            {formatAmount(balance)}
                        </>
                    :
                        <>
                            {balance.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </>
                    }
                    </Flex>
                </FlexData>
                <FlexData>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                    {windownSize <= 768 ?
                        <>
                            {formatAmount(limit)}
                        </>
                    :
                        <>
                            {limit.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {tokenLimit}
                        </>
                    }
                    </Flex>
                </FlexData>
                <FlexData>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                        {windownSize <= 768 ?
                        <>
                            {setEmail(email)}
                        </>
                    :
                        <>
                            {email}
                        </>
                    }
                    </Flex>
                </FlexData>
                <FlexData>
                    <Flex width='100%' justifyContent='space-around'>
                        <PencilIcon/>
                        <CloseIcon/>
                    </Flex>
                </FlexData>
            </BodyTable>
        </Container>
    );
};

export default ListAdmin;

const Container = styled.div`
    width: 100%;
    flex-direction: column;
`
const BodyTable = styled(Flex)<{isActive: boolean}>`
    width: 100%;
    height: 80px;
    background: ${({ isActive }) => (isActive ? '#fff' : '#F2F2F2')};
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    gap: 10px;

    @media screen and (max-width: 1444px){
        padding-left: 20px;
    }
    @media screen and (max-width: 1024px){
        gap: 10px;
        padding-left: 10px;
        padding-right: 15px;
    }
    @media screen and (max-width: 768px){
        gap: 20px;
        padding-left: 10px;
    }
    @media screen and (max-width: 600px){
        gap: 5px;
        padding-left: 10px;
        padding-right: 5px;
    }
`
const FlexData = styled(Flex)`
    width: 150px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
`