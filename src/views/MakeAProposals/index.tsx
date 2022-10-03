import { Flex, Input, Text, AutoRenewIcon } from '@thaihuuluong/dogwatcher-uikit'
import { useWeb3React } from '@web3-react/core'
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity'
import HeaderProposals from 'components/HeaderProposals/HeaderProposals'
import PageFullWidth from 'components/Layout/PageFullWidth'
import { Button, OpenNewIcon } from 'components/Pancake-uikit'
import { BASE_BSC_SCAN_URL, MIN_CREATE_VOTING_PROPOSALS } from "config/index"
import { useTranslation } from 'contexts/Localization'
import React, { useState, useEffect } from 'react'
import tokens from 'config/constants/tokens'
import TextField from '@mui/material/TextField';
import { GetTokenBalance } from "utils/getTokenBalance";
import { GetAllowanceVoting } from 'state/votingProposals'
import styled from 'styled-components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useToast from "hooks/useToast";
import { useApprove } from "views/Vote/hook/useApprove"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Nav from 'views/Invest/components/SubNav'
import { GetAmountMintToVote } from 'state/poolProposals'
import { Container, WrapAppBody, Wrapper } from 'views/Invest/styles'
import { useCreateVoting } from "./hook/useCreateVoting"

const MakeAProposals = () => {
  function getDateNow() {
    let today:any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const yyyy = today.getFullYear();
    today = `${mm}/${dd}/${yyyy}`;
    return today;
}

  function getTheNextDay() {
    const today = new Date()
    let thenextday:any = new Date(today)
    thenextday.setDate(thenextday.getDate() + 14)
    const dd = String(thenextday.getDate()).padStart(2, '0');
    const mm = String(thenextday.getMonth() + 1).padStart(2, '0'); 
    const yyyy = thenextday.getFullYear();
    thenextday  = `${mm}/${dd}/${yyyy}`;
    return thenextday ;
}

  type optionDay = {
      year?:any,
      month?:any,
      day?:any
  }
  const configOptionDay:optionDay = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
  } 
  const onKeyDown = (e) => {
      e.preventDefault();
  };
  const { t } = useTranslation()
  const [ minAmountToVote ] = GetAmountMintToVote()
  const [showBtn, setShowBtn] = useState(true)
  const { toastError, toastSuccess } = useToast()
  const [ startDate, setStartDate ] = useState(getDateNow())
  const [ endDate, setEndDate ] = useState(getTheNextDay())
  const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
  const { account } = useWeb3React()
  function renderAccount (address) {
      let sAccount = ""
      if ( account ) {
        if ( windowSize < 1080 ) {
          sAccount =`${address.substring(0, 4)}...${address.substring(address.length - 4)}`
        } else {
          sAccount = address
        }
      }
      return sAccount
  }
  const openBSC = () => {
    window.open(`${BASE_BSC_SCAN_URL}/address/${account}`);
  }
  const { handleApprove, requestedApproval, pendingTx } = useApprove()
  const [ allowanceVoting ] = GetAllowanceVoting(account, requestedApproval)
  const { handleVoting, requestedVoting, pendingVoting } = useCreateVoting()
  
  const { balance } = GetTokenBalance(tokens.Run.address, requestedVoting)
  const handleStartDate = (event: any) => {
    const start = new Date(event).toLocaleDateString('en',configOptionDay);
    setStartDate(start)
  }
  const handleEndDate = (event:any) => {
      const end = new Date(event).toLocaleDateString('en',configOptionDay);
      setEndDate(end) 
  }
  return (
    <PageFullWidth>
      <HeaderLiquidity bgColor="#029DA5" namePlace="Invest Together" nameTitle="run together" />
      <Nav />
      <Container>
        <WrapAppBody>
            <Wrapper>
              <HeaderProposals headerName='Make a Proposals'/>
              <Content>
                <Flex paddingLeft='20px'>
                  <Text bold fontSize='24px' paddingBottom='40px'>Action</Text>
                </Flex>
                <Form>
                  <Row style={{ marginBottom: '20px' }}>
                     <Col>
                        <WrapInput>
                          <Label>{t("Start date")}</Label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <CustomCalendar
                                // label="Date desktop"
                                disabled
                                inputFormat="DD/MM/YYYY"
                                value={startDate}
                                onChange={handleStartDate}
                                renderInput={(params) => <TextField {...params} onKeyDown={onKeyDown} />}
                              />
                          </LocalizationProvider>
                         
                        </WrapInput>
                     </Col>
                     <Col>
                        <WrapInput>
                          <Label>{t("End date")}</Label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <CustomCalendar
                                  // label="Date desktop"
                                  disabled
                                  inputFormat="DD/MM/YYYY"
                                  value={endDate}
                                  onChange={handleEndDate}
                                  renderInput={(params) => <TextField {...params} onKeyDown={onKeyDown} />}
                              />
                          </LocalizationProvider>         
                        </WrapInput>
                     </Col>
                  </Row>
                  <Row>
                    <Col>
                      <WrapInput>
                        <Label>Creator</Label>
                        <Flex position='relative'>
                          <CsInput type='text' readOnly value={account ? renderAccount(account) : 'No Data'}/>
                          { account &&
                            <CsOpenNewIcon onClick={openBSC} />
                          }
                        </Flex>
                      </WrapInput>
                    </Col>

                    { balance >= minAmountToVote ?
                          <ColBtn>
                            {allowanceVoting !==0 ?
                              <CustomButton
                                onClick={handleVoting}
                                disabled={pendingVoting}
                                endIcon={pendingVoting ? <AutoRenewIcon spin color="textDisable" /> : null}
                              >
                                Publish
                              </CustomButton>
                            :
                              <CustomButton
                                onClick={handleApprove}
                                disabled={pendingTx}
                                endIcon={pendingTx ? <AutoRenewIcon spin color="textDisable" /> : null}
                              >
                                Approve
                              </CustomButton>
                            }
                          </ColBtn>
                          :
                          <ColBtn>
                            <Flex flexDirection="column">
                              <Text>Your RUN balance: {balance.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </Text>
                              <Text fontSize='16px' lineHeight='21px'>You need at least 1,000,000 RUN to publish a proposal.</Text>
                            </Flex>
                          </ColBtn>
                    }
                  </Row>
                </Form>
              </Content>
            </Wrapper>
        </WrapAppBody>
      </Container>
    </PageFullWidth>
  )
}

export default MakeAProposals


const Content = styled(Flex)`
  flex-direction: column;
  padding-top: 70px;
  border-top: 1px solid #E4E4E4;
  padding-bottom: 50px;
`

const Form = styled.form``

export const Row = styled.div`
  width: 100%;
  display: flex;
  /* padding-bottom: 40px; */
  @media (max-width: 600px) {
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }
`

export const Col = styled.div`
  max-width: 50%;
  width: 50%;
  margin: 0 20px;
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
    padding-left: 10px;
    max-width: 100%;
  }
`

export const ColSingle = styled(Col)`
  padding-right: 40px;
  @media screen and (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    padding-right: 0px;
  }
`

export const WrapInput = styled.div`
  position: relative;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #b2b3bd;
`

export const CustomInput = styled(Input)`
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-weight: 600;
  border-radius: 8px;
  padding: 22px;
  color: #11142d !important;

  @media (max-width: 600px) {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 24px; 
    max-height: 72px; 
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
    font-size: 12px;
  }
`

const CustonCalendar = styled.input`
    border: none;
    border-radius: 5px;
    height: 48px; 
    width: 100%;
    padding-left:10px;
    padding-right:10px;
    cursor: pointer;
    background-color: #dfe0e1;
    box-shadow: inset 0px 2px 2px -1px rgb(74 74 104 / 10%);
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`

const CsInput = styled(Input)`
   height: 48px;
   font-weight: 600;
`

const CustomButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  width: 172px;
  height: 48px;
  background: #FF592C;
  border-radius: 90px;
  color: #FFFFFF;
`

const CsOpenNewIcon = styled(OpenNewIcon)`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 5px;
  cursor: pointer;
`

const ColBtn = styled(Col)`
  display: flex;
  align-items: center;
  margin-top: 20px;
  @media screen and (max-width: 600px) {
    margin-top: 20px;
  }
`
const CustomCalendar = styled(DesktopDatePicker)`        
    cursor: pointer;      
    height: 48px!important; 
    width: 100%!important;  
    @media only screen and (max-width: 600px) {
        width: 100%!important;
    }       
    > div {       
        border-radius: 12px!important;
        height:100%!important; 
        width: 100%!important; 
        border:1px solid rgb(230, 232, 236)!important; 
        position: relative;
        box-sizing:border-box;
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`