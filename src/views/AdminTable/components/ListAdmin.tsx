import { Flex, Link, PencilIcon, Text, useModal } from '@thaihuuluong/dogwatcher-uikit';
import { CloseIcon } from 'components/Pancake-uikit';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import React from 'react';
import history from 'routerHistory';
import styled from 'styled-components';
import { getBscScanLink } from 'utils';
import { formatAmount } from 'utils/formatInfoNumbers';
import { GetBalance } from '../hook/usefetchBalance';
import DeleteModalAdmin from './Modal/DeleteModalAdmin';

interface Props {
    id?: string
    walletName?: string
    walletAddress?: string
    limit?: any
    email?: any
    project?: string
    status?: boolean
    rowId?: number
}

const ListAdmin: React.FC<Props> = ({
    id,
    walletName,
    walletAddress,
    limit,
    email,
    project,
    status,
    rowId,
}) => {
    const tokenAuth = localStorage.getItem("tokenAuth")
    const { chainId } = useActiveWeb3React()
    const [openDeleteModal] = useModal(<DeleteModalAdmin id={id}/>)
    // const [openUpdateWalletModal] = useModal(<UpdateWallet id={id}/>)
    
    function setAddress(dataAddress) {
        if (dataAddress) {
            return `${dataAddress.substring(0, 4)}...${dataAddress.substring(dataAddress.length - 4)}`
        }
        return ""
    }

    function setEmail(dataEmail) {
        if (dataEmail.length <= 22) {
            // return `${dataEmail.substring(0, 8)}...${dataEmail.substring(dataEmail.length - 5)}`
            return `${dataEmail}`
        }
        if (dataEmail.length > 22) {
            return `${dataEmail.substring(0, 9)}...${dataEmail.substring(dataEmail.length - 9)}`
            // return `${dataEmail}`
        }
        return ""
    }
    function setProject(dataProject) {
        if (dataProject) {
            return `${dataProject.slice(7)}`
        }
        return ""
    }
    function compareBalance(balance, tokenLimit, name) {
        if (balance < tokenLimit) {
            return <CsText color='#FF592C'>{`${formatAmount(balance)} < ${formatAmount(tokenLimit)} ${name}`}</CsText>
        }
        if (balance > tokenLimit) {
            return <CsText>{`${formatAmount(balance)} > ${formatAmount(tokenLimit)} ${name}`}</CsText>
        }
        if (balance === tokenLimit && (balance !== 0 && tokenLimit !== 0)) {
            return <CsText color='#FF592C'>{`${formatAmount(balance)} = ${formatAmount(tokenLimit)} ${name}`}</CsText>
        }
        if (balance === 0 && tokenLimit === 0) {
            return <CsText>No Data</CsText>
        }
        return ''
    }

    const { balanceList } = GetBalance(walletAddress, limit)
    
    const handleClickUpdate = () => {
        history.push(`/update/${id.toString()}`)
      }

    return (
        <Container>
            <BodyTable isActive={rowId % 2 === 0 ? !false : false}>
                <FlexDataProject>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                        {project ?
                            <Flex width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                                <CsText>{setProject(project)}</CsText>
                                {/* <CsPencilIcon className='IconHiden' onClick={openUpdateWalletModal} style={{ cursor: 'pointer' }} /> */}
                            </Flex>
                            :
                            <Flex width='100%' justifyContent='center' alignItems='center'>
                                <CsText>No data</CsText>
                            </Flex>
                        }
                    </Flex>
                </FlexDataProject>
                <FlexDataName>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                        {walletName ?
                            <Flex width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                                <Link href={getBscScanLink(walletAddress, 'address', chainId)} external>
                                    {walletName}
                                </Link>
                                {/* <CsPencilIcon className='IconHiden' onClick={openUpdateWalletModal} style={{ cursor: 'pointer' }} /> */}
                            </Flex>
                            :
                            <Flex width='100%' justifyContent='center' alignItems='center'>
                                <CsText>No data</CsText>
                            </Flex>
                        }
                    </Flex>
                </FlexDataName>
                <FlexDataName className='NoneWallet'>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                        {walletAddress ?
                            <Flex width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                                <Link href={getBscScanLink(walletAddress, 'address', chainId)} external>
                                    {setAddress(walletAddress)}
                                </Link>
                                {/* <CsPencilIcon className='IconHiden' onClick={openUpdateWalletModal} style={{ cursor: 'pointer' }} /> */}
                            </Flex>
                            :
                            <Flex width='100%' justifyContent='center' alignItems='center'>
                                <CsText>No data</CsText>
                            </Flex>
                        }
                    </Flex>
                </FlexDataName>
                <FlexData justifyContent='center' alignItems='center'>
                    {balanceList.length !== 0 ?
                        <Flex flexDirection='column' width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                            {balanceList.map((item) => {
                                return (
                                    <Flex width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                                        <CsText>{compareBalance(item.balance, item.limit, item.name)}</CsText>
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
                                                {/* <TextEmail textAlign='center' fontWeight='100'>{item.emailTime}</TextEmail> */}
                                                <CsText>{setEmail(item)}</CsText>
                                            </>
                                        )
                                    })}
                                </Flex>
                            </>
                            :
                            <Flex width='100%' justifyContent='center' alignItems='center'>
                                <CsText>No data</CsText>
                            </Flex>
                        }
                    </Flex>
                </FlexData>
                <FlexDataName className='NoneWallet' width='100%'>
                    {status !== null ?
                        <Flex width='100%' justifyContent='center' alignItems='center'>
                            <Flex width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                                {status === true ?
                                    <CsText>Enabled</CsText>
                                    :
                                    <CsText>Disabled</CsText>
                                }
                                {/* <CsPencilIcon className='IconHiden' onClick={displayTooltip} style={{ cursor: 'pointer' }} /> */}
                            </Flex>
                            {/* <Flex  alignItems='center' justifyContent='center'>
                            <Tooltip isTooltipDisplayed={isTooltipDisplayed}>
                                <Button onClick={() => setDisplay(true)}>{status === true ? 'Enable' : 'Disable'}</Button>
                            </Tooltip>
                            </Flex> */}
                        </Flex>
                        :
                        <Flex width='100%' justifyContent='center' alignItems='center'>
                            <CsText>No data</CsText>
                        </Flex>
                    }
                </FlexDataName>
                {tokenAuth ?
                <FlexDataV1>
                    <Flex width='100%' justifyContent='center' style={{ gap: '10px' }}>
                        {/* <CsPencilIconV1 onClick={displayTooltip} style={{ cursor: 'pointer' }} /> */}
                        <CsPencilIcon onClick={handleClickUpdate}  style={{ cursor: 'pointer' }} />
                        <CsCloseIcon onClick={openDeleteModal} style={{ cursor: 'pointer' }} />
                        {/* <CsCloseIconV1 Color={Color} onClick={openDeleteModal} style={{ cursor: 'pointer' }} /> */}
                    </Flex>
                </FlexDataV1>
                :
                    <></>
                }
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
const FlexDataName = styled(Flex)`
    width: 300px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 600px) {
        width: 100px;
        &.NoneWallet{
            display: none;
        }
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
const FlexDataProject = styled(Flex)`
    width: 200px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 600px) {
        width: 100px;
        &.NoneWallet{
            display: none;
        }
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
const FlexData = styled(Flex)`
    width: 300px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
        font-size: 4px;
    }
    @media screen and (max-width: 600px) {
        width: 400px;
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
const FlexDataV1 = styled(Flex)`
    width: 100px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 980px) {
        display: none;
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
    @media screen and (max-width: 768px) {
        font-size: 10px;
    }
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
`
// const TextEmail = styled(Text)`
//     font-weight: 400;
//     color: #029DA5;
//     @media screen and (max-width: 600px) {
//         font-size: 12px;
//     }
// `
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
// const CsTextStatus = styled(Text) <{ isNone: boolean }>`
//     font-weight: 600;
//     @media screen and (max-width: 600px) {
//         font-size: 12px;
//     }
//     display: ${({ isNone }) => (isNone ? 'none' : 'block')};
// `
