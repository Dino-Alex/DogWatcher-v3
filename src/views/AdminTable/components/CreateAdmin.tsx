import { Button, CloseIcon, Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import Select, { OptionProps } from 'components/Select/SelectV2';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios';
import { BASE_URL_DATA_ADMIN_CREATE } from 'config';

const CreateAdmin = () => {

    const [isNameWallet, setNameWallet] = useState('')
    const [isAddressWallet, setWalletAddress] = useState('')
    const [isEmailAddress, setEmailAdress] = useState([''])
    const [isTokenLimit, setTokenLimit] = useState(0)
    const [isTokenAddress, setTokenAddress] = useState('0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7')
    const [isTokenName, setTokenName] = useState('RUN')
    const [isStatus, setStatus] = useState(false)
    
    function convertEmail() {
        const emailPush = [];
        isEmailAddress.forEach(element => {
            const itemEmail = {
                emailTime: '',
                emailAddress: element
            }
            emailPush.push(itemEmail)
        });
       return emailPush;
    }
    function convertLimit() {
        const limitPush = [];
            const itemLimit = {
                tokenName: isTokenName,
                tokenLimit: isTokenLimit,
                tokenAddress: isTokenAddress
            }
            limitPush.push(itemLimit)

       return limitPush;
    }
 
    const handleChangeLimit = (option: OptionProps): void => {
        setTokenAddress(option.value)
        setTokenName(option.label)
    }
    const handleChangeStatus = (option: OptionProps): void => {
        setStatus(option.value)
    } 
  
    const handleSubmit = async (e) => {
        
        e.preventDefault()
        try {
            const idAdmin = isNameWallet+isAddressWallet
            const emailAdmin = convertEmail();
            const limitAdmin = convertLimit();
            const slack = []
          const resp = await axios.post(BASE_URL_DATA_ADMIN_CREATE,
            //   { idAdmin, isNameWallet, isAddressWallet, isStatus, limitAdmin, emailAdmin, slack},
            {
                "id":"projectHesman0x4B57F938d2Eb1C3b31F837618Af2f16CA8Aa4C1d",
                "walletName":"Hoang Hon",
                "walletAddress":"0x3B57F938d2Eb1C3b31F837618Af2f16CA8Aa4C1d",
                "status":true,
                "limit":[{
                    "name":"RUN",
                    "address":"0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7",
                    "limit":"1000"
                },
                {
                    "name":"BUSD",
                    "address":"0xe9e7cea3dedca5984780bafc599bd69add087d56",
                    "limit":"1000"
                }],
                "email":[
                {
                    "time":"18:00:00 22/9/2022",
                    "address":"cbhoanghon@gmail.com"
                }
                    ],
                "slack":[
                    "url1",
                    "url2",
                    "url3"]
            }
            )
            console.log("resp", resp);
            
        } catch (error) {
          console.log(error)
        }
      }


      const handleSubmitV1 = async (e) => {
        e.preventDefault()
            const idAdmin = isNameWallet+isAddressWallet
            const emailAdmin = convertEmail();
            const limitAdmin = convertLimit();
            const slack = []
          const resp = await  axios({
            method: "post",
            url: BASE_URL_DATA_ADMIN_CREATE,
            data: { idAdmin, isNameWallet, isAddressWallet, isStatus, limitAdmin, emailAdmin, slack},
            headers: { 
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "POST,GET,DELETE,PUT",
            "access-control-allow-credentials": "true",
            "content-type": "application/json"
        }
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (response) {
              console.log(response);
            });
      };
     

    return (
        <Container>
            <Flex flexDirection='column'>
                <Flex width='100%' mt={3} mb={3} justifyContent='center' alignItems='center'>
                    <Text fontSize='26px'>Create Admin</Text>
                </Flex>
                <FlexInput>
                    <Flex width='40%' flexDirection='column'>
                        <Text>Name Wallet</Text>
                        <CustomInput onChange={(e) => setNameWallet(e.target.value)}/>
                    </Flex>
                    <Flex width='40%' flexDirection='column'>
                        <Text>Address Wallet</Text>
                        <CustomInput onChange={(e) => setWalletAddress(e.target.value)}/>
                    </Flex>
                </FlexInput>
                <FlexInput>
                    <Flex width='40%' flexDirection='column'>
                        <Text>Limit</Text>
                        <CustomInput
                        pattern={`^[0-9]*[.,]?[0-9]{0,${18}}$`}
                        type="number" onChange={(e) => setTokenLimit(Number(e.target.value))}/>
                    </Flex>
                    <Flex width='40%' flexDirection='column'>
                        <Text>Email</Text>
                        {/* <CustomInput onChange={(e) => setEmailAdress(e.target.value)}/> */}
                        <TagsInput onChange={setEmailAdress}/>
                    </Flex>
                </FlexInput>
                <FlexInput>
                    <Flex width='40%' justifyContent='space-between' style={{ gap: '20px' }}>
                        <Flex flexDirection='column'>
                            <Text>Token</Text>
                            <Select
                                options={[
                                    {
                                        label: 'RUN',
                                        value: '0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7',
                                    },
                                    {
                                        label: 'BUSD',
                                        value: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
                                    },
                                    {
                                        label: 'BAMI',
                                        value: '0xe2d3486f46efbd4199ea087e9e466dcc35ee0248',
                                    },
                                    {
                                        label: 'LTD',
                                        value: '0xdbad544416df0677254645422bb560af8408cae7',
                                    }
                                ]}
                                onChange={handleChangeLimit}
                            />
                        </Flex>
                        <Flex flexDirection='column'>
                            <Text>Status</Text>
                            <Select
                                options={[
                                    {
                                        label: 'Enable',
                                        value: true,
                                    },
                                    {
                                        label: 'Disable',
                                        value: false,
                                    }
                                ]}
                                onChange={handleChangeStatus}
                            />
                        </Flex>
                    </Flex>
                    <Flex width='40%' justifyContent='space-between' style={{ gap: '20px' }}>
                        <Flex flexDirection='column'>
                            <Text>Submit</Text>
                            <Button type='submit' onClick={handleSubmit}>Submit</Button>
                        </Flex>
                        <Flex flexDirection='column'>
                            <Text>Cancel</Text>
                            <Button color='blue'>Cancel</Button>
                        </Flex>
                    </Flex>
                </FlexInput>
            </Flex>
        </Container>
    );
};

export default CreateAdmin;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 10px 100px 10px 100px;
`
const FlexInput = styled(Flex)`
    width: 100%;
    height: 100px;
    justify-content: space-around;
    align-items: center;
`
const CustomInput = styled(Input)`
    height: 50px;
`