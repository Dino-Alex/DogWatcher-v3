import { Button, Flex, PencilIcon, Text, useModal } from '@phamphu19498/runtogether-uikit';
import { BlockIcon, CloseIcon } from 'components/Pancake-uikit';
import UpdateToClipboard from 'components/Pancake-uikit/widgets/WalletModal/UpdateToClipboard';
import React, { useState } from 'react';
import styled from 'styled-components';
import { formatAmount } from 'utils/formatInfoNumbers';
import { Tooltip } from 'views/Account/styles';
import { useComparisonLimit } from '../hook/useComparisonLimit';
import DeleteModalAdmin from './DeleteModalAdmin';
import UpdateModalAdmin from './UpdateModalAdmin';

interface Props {
    nameWallet?: string
    contract?: string
    totalBalance?: any
    email?: string
    timeEmail?: string
    dateEmail?: string
    rowId?: number
}

const ListAdmin: React.FC<Props> = ({
    nameWallet,
    contract,
    totalBalance,
    email,
    timeEmail,
    dateEmail,
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

    // const [isWarning, setWarning] = useState(false)
    // function warningBalance(key: number) {
    //     if (balance[key] >= limit[key]) {
    //         return true
    //     }
    //     return false
    // }
    
    const windownSize = window.screen.width
    const Color = Math.floor(Math.random()*16777215).toString(16);
    const [isDisplay, setDisplay] = useState(false);
    const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);
    function displayTooltip() {
        setIsTooltipDisplayed(true);
        setTimeout(() => {
        setIsTooltipDisplayed(false);
        }, 2000);
    }

    
    return (
        <Container>
            <BodyTable isActive={rowId % 2 === 0 ? !false : false}>
                <FlexData>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                        {nameWallet ?
                            <Flex width='100%' justifyContent='center' alignItems='center' style={{gap: '10px'}}>
                                <CsText>{nameWallet}</CsText>
                                <CsPencilIcon isDisplay={isDisplay} onClick={openUpdateModal} style={{ cursor: 'pointer' }} />
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
                        {contract ?
                            <Flex width='100%' justifyContent='center' alignItems='center' style={{gap: '10px'}}>
                                <CsText>{setAddress(contract)}</CsText>
                                <CsPencilIcon isDisplay={isDisplay} onClick={openUpdateModal} style={{ cursor: 'pointer' }} />
                            </Flex>
                            :
                            <Flex width='100%' justifyContent='center' alignItems='center'>
                                <CsText>No data</CsText>
                            </Flex>
                        }
                    </Flex>
                </FlexData>
                <FlexData justifyContent='center' alignItems='center'>
                    <Flex width='100%' justifyContent='center' alignItems='center' style={{gap: '10px'}}>
                            <CsText>{`10M < 20M RUN`}</CsText>
                            <CsPencilIcon isDisplay={isDisplay} onClick={openUpdateModal} style={{ cursor: 'pointer' }} />
                    </Flex>
                </FlexData>
                <FlexData>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                        <Flex flexDirection='column' width='100%' justifyContent='center' alignItems='center'>
                            <TextEmail textAlign='center' fontWeight='100'>14:28 AM 21/09/2022</TextEmail>
                            <CsText>thaihuuluong@gmail.com</CsText>
                        </Flex>
                        <Flex>
                            <CsPencilIcon isDisplay={isDisplay} onClick={openUpdateModal} style={{ cursor: 'pointer' }} />
                        </Flex>
                    </Flex>
                </FlexData>
                <FlexData>
                    <Flex width='100%' justifyContent='center' style={{gap: '10px'}}>
                        <CsPencilIconV1 onClick={displayTooltip} style={{ cursor: 'pointer' }} />
                        {/* <UpdateToClipboard toCopy='abc' /> */}
                        {/* <CsCloseIcon onClick={openDeleteModal} style={{ cursor: 'pointer' }} /> */}
                        <CsCloseIconV1 Color={Color} onClick={openDeleteModal} style={{ cursor: 'pointer' }} />
                    </Flex>
                    <Tooltip isTooltipDisplayed={isTooltipDisplayed}>
                        <Flex flexDirection='column' style={{gap: '10px'}}>
                            <Button onClick={() => setDisplay(true)}>Update</Button>
                            <Button>Update All</Button>
                        </Flex>
                    </Tooltip>
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

const CsPencilIcon = styled(PencilIcon)<{isDisplay: boolean}>`
    margin-bottom: 0.5rem;
    display: ${({ isDisplay }) => (isDisplay === true ? 'block' : 'none')};
    path{
        fill: #FF592C;
    }
`
const CsPencilIconV1 = styled(PencilIcon)`
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
const CsCloseIconV1 = styled(CloseIcon)<{ Color: any }>`
    width: 26px;
    path{
        fill: ${({ Color }) => (`#${Color}`)};
    }
`