import { ChainId } from '@pancakeswap/sdk';
import { Button, Flex, PencilIcon, Text, useModal } from '@phamphu19498/runtogether-uikit';
import { BlockIcon, CloseIcon } from 'components/Pancake-uikit';
import UpdateToClipboard from 'components/Pancake-uikit/widgets/WalletModal/UpdateToClipboard';
import tokens from 'config/constants/tokens';
import React, { useState } from 'react';
import styled from 'styled-components';
import { formatAmount } from 'utils/formatInfoNumbers';
import { Tooltip } from 'views/Account/styles';
import { useComparisonLimit } from '../hook/useComparisonLimit';
import { GetBalance } from '../hook/usefetchBalance';
import DeleteModalAdmin from './DeleteModalAdmin';
import UpdateModalAdmin from './UpdateModalAdmin';

interface Props {
    walletName?: string
    walletAddress?: string
    limit?: any
    email?: any
    status?: boolean
    rowId?: number
}

const ListAdmin: React.FC<Props> = ({
    walletName,
    walletAddress,
    limit,
    email,
    status,
    rowId,
}) => {

    const [openUpdateModal] = useModal(<UpdateModalAdmin />)
    const [openDeleteModal] = useModal(<DeleteModalAdmin />)

    function setAddress(dataAddress) {
        if (dataAddress) {
            return `${dataAddress.substring(0, 4)}...${dataAddress.substring(dataAddress.length - 4)}`
        }
        return ""
    }

    function setEmail(dataEmail) {
        if (dataEmail) {
            return `${dataEmail.substring(0, 4)}...${dataEmail.substring(dataEmail.length - 4)}`
        }
        return ""
    }
    function compareBalance(balance, tokenLimit, name) {
        if (balance < tokenLimit) {
            return `${formatAmount(balance)} < ${formatAmount(tokenLimit)} ${name}`
        }
        if (balance > tokenLimit) {
            return <CsText color='#FF592C'>{`${formatAmount(balance)} > ${formatAmount(tokenLimit)} ${name}`}</CsText>
        }
        if (balance === tokenLimit && (balance !== 0 && tokenLimit !== 0)) {
            return <CsText color='#FF592C'>{`${formatAmount(balance)} = ${formatAmount(tokenLimit)} ${name}`}</CsText>
        }
        if (balance === 0 && tokenLimit === 0) {
            return <CsText>No Data</CsText>
        }
        return ''
    }

    const windownSize = window.screen.width
    const Color = Math.floor(Math.random() * 16777215).toString(16);
    const [isDisplay, setDisplay] = useState(false);
    const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);
    function displayTooltip() {
        setIsTooltipDisplayed(true);
        setTimeout(() => {
            setIsTooltipDisplayed(false);
        }, 10000);
    }

    const { balanceList } = GetBalance(walletAddress, limit)

    return (
        <Container>
            <BodyTable isActive={rowId % 2 === 0 ? !false : false}>
                <FlexData>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                        {walletName ?
                            <Flex width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                                <CsText>{walletName}</CsText>
                                <CsPencilIcon className='IconHiden' onClick={openUpdateModal} style={{ cursor: 'pointer' }} />
                            </Flex>
                            :
                            <Flex width='100%' justifyContent='center' alignItems='center'>
                                <CsText>No data</CsText>
                            </Flex>
                        }
                    </Flex>
                </FlexData>
                <FlexData>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                        {walletAddress ?
                            <Flex width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                                <CsText>{setAddress(walletAddress)}</CsText>
                                <CsPencilIcon className='IconHiden' onClick={openUpdateModal} style={{ cursor: 'pointer' }} />
                            </Flex>
                            :
                            <Flex width='100%' justifyContent='center' alignItems='center'>
                                <CsText>No data</CsText>
                            </Flex>
                        }
                    </Flex>
                </FlexData>
                <FlexData justifyContent='center' alignItems='center'>
                    {balanceList.length !== 0 ?
                        <Flex flexDirection='column' width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                            {balanceList.map((item) => {
                                return (
                                    <Flex width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                                        <CsText>{compareBalance(item.balance, item.limit, item.name)}</CsText>
                                        <CsPencilIcon className='IconHiden' onClick={openUpdateModal} style={{ cursor: 'pointer' }} />
                                    </Flex>
                                )
                            })}
                        </Flex>
                        :
                        <Flex width='100%' justifyContent='center' alignItems='center'>
                            <CsText>No data</CsText>
                        </Flex>
                    }
                </FlexData>
                <FlexData>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                        {email.length !== 0 ?
                            <>
                                <Flex flexDirection='column' width='100%' justifyContent='center' alignItems='center'>
                                    {email.map((item) => {
                                        return (
                                            <>
                                                <TextEmail textAlign='center' fontWeight='100'>{item.emailTime}</TextEmail>
                                                <CsText>{item.emailAddress}</CsText>
                                            </>
                                        )
                                    })}
                                </Flex>
                                <Flex>
                                    <CsPencilIcon className='IconHiden' onClick={openUpdateModal} style={{ cursor: 'pointer' }} />
                                </Flex>
                            </>
                            :
                            <Flex width='100%' justifyContent='center' alignItems='center'>
                                <CsText>No data</CsText>
                            </Flex>
                        }
                    </Flex>
                </FlexData>
                <FlexData width='100%' justifyContent='center' alignItems='center'>
                    {status !== null ?
                        <Flex width='100%' justifyContent='center' alignItems='center'>
                            <Flex width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                                {status === true ?
                                    <CsText>Enable</CsText>
                                    :
                                    <CsText>Disable</CsText>
                                }
                                <CsPencilIcon className='IconHiden' onClick={displayTooltip} style={{ cursor: 'pointer' }} />
                            </Flex>
                            <Flex  alignItems='center' justifyContent='center'>
                            <Tooltip isTooltipDisplayed={isTooltipDisplayed}>
                                <Button onClick={() => setDisplay(true)}>{status === true ? 'Enable' : 'Disable'}</Button>
                            </Tooltip>
                            </Flex>
                        </Flex>
                        :
                        <Flex width='100%' justifyContent='center' alignItems='center'>
                            <CsText>No data</CsText>
                        </Flex>
                    }
                </FlexData>
                <FlexData>
                    <Flex width='100%' justifyContent='center' style={{ gap: '10px' }}>
                        {/* <CsPencilIconV1 onClick={displayTooltip} style={{ cursor: 'pointer' }} /> */}
                        <CsPencilIcon style={{ cursor: 'pointer' }} />
                        <CsCloseIcon onClick={openDeleteModal} style={{ cursor: 'pointer' }} />
                        {/* <CsCloseIconV1 Color={Color} onClick={openDeleteModal} style={{ cursor: 'pointer' }} /> */}
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
const BodyTable = styled(Flex) <{ isActive: boolean }>`
    width: 100%;
    min-height: 80px;
    padding: 5px 0px 5px 0px;
    background: ${({ isActive }) => (isActive ? '#fff' : '#F2F2F2')};
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    gap: 10px;
    overflow: hidden;
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
        gap: 7px;
        padding-left: 10px;
        padding-right: 5px;
    }
`
const FlexData = styled(Flex)`
    width: 300px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 600px) {
        width: 90px;
    }
    @media screen and (max-width: 376px) {
        width: 80px;
    }
    .IconHiden{
        display: none;
    }
    :hover{
        .IconHiden{
            display: block;
        }
    }
`
const CsText = styled(Text)`
    font-weight: 600;
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
`
const TextEmail = styled(Text)`
    font-weight: 400;
    color: #029DA5;
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
`
const CsPencilIcon = styled(PencilIcon)`
    margin-bottom: 0.5rem;
    path{
        fill: #FF592C;
    }
`
const CsCloseIcon = styled(CloseIcon)`
    width: 26px;
    path{
        fill: #FF592C;
    }
`
const CsTextStatus = styled(Text) <{ isNone: boolean }>`
    font-weight: 600;
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
    display: ${({ isNone }) => (isNone ? 'none' : 'block')};
`
