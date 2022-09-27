import { Button, Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import Select, { OptionProps } from 'components/Select/SelectV2';
import React, {useState } from 'react';
import styled from 'styled-components';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios';
import { BASE_URL_DATA_ADMIN_CREATE } from 'config';
import TokenInput from './Modal/component/TokenInput';

const walletInfo = { 
"id" : "project0x00000",
"name" : "Vo",
"walletAddress" : "0x00000" ,
"tokens" : [
    {"address" : "0x000" , "limit" : "0" },
],
"emails" : [
    "thuongvokg@gmail.com"
],
"project" : "project",
"slack" : [
    "url"
]
};

const CreateAdmin = () => {

    const [isNameWallet, setNameWallet] = useState('')
    const [isAddressWallet, setWalletAddress] = useState('')
    const [isEmailAddress, setEmailAdress] = useState([''])
    const [isTokenLimit, setTokenLimit] = useState([])
    const [isTokenAddress, setTokenAddress] = useState('')
    const [isTokenName, setTokenName] = useState('')
    const [isStatus, setStatus] = useState(true)


    const arrayLimit = []
    console.log('arrayLimit',arrayLimit);
    function inputTokenChangeEvent(value){
        const array = [
            {
                tokenAddress: value.tokenAddress,
                tokenName: value.tokenName,
                tokenLimit: value.limit
            }
        ]
        arrayLimit.push(array)
    }
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
    
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const idAdmin = isNameWallet+isAddressWallet
            const emailAdmin = convertEmail();
            const limitAdmin = convertLimit();
            const slack = []
            const resp = await axios.post(BASE_URL_DATA_ADMIN_CREATE,
            {
                "id" : idAdmin.toString(),
                "walletName": isNameWallet,
                "walletAddress": isAddressWallet,
                "status": isStatus,
                "limit":limitAdmin,
                "email":emailAdmin,
                "slack":slack
            })
        } catch (error) {
          console.log(error)
        }
      }

      
      const handleAddClick = () => {
        const newTokenLimit = {"address" : "0x000" , "limit" : "0" };
        walletInfo.tokens.push(newTokenLimit);
      };
      const handleDeleteClick = (id: any) => {
        walletInfo.tokens.splice(id, 1);
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
                        <CustomInput placeholder={walletInfo.name} onChange={(e) => setNameWallet(e.target.value)}/>
                    </Flex>
                    <Flex width='40%' flexDirection='column'>
                        <Text>Address Wallet</Text>
                        <CustomInput placeholder={walletInfo.walletAddress} onChange={(e) => setWalletAddress(e.target.value)}/>
                    </Flex>
                </FlexInput>
                <FlexInput>
                    <Flex width='40%' flexDirection='column'>
                        <Text>Project</Text>
                        {/* <CustomInput onChange={(e) => setEmailAdress(e.target.value)}/> */}
                        <CustomInput placeholder={walletInfo.project} onChange={(e) => setWalletAddress(e.target.value)}/>
                    </Flex>
                    <Flex width='40%' flexDirection='column'>
                        <Text>Email</Text>
                        {/* <CustomInput onChange={(e) => setEmailAdress(e.target.value)}/> */}
                        <TagsInput  onChange={setEmailAdress}/>
                    </Flex>
                </FlexInput>
                {
                    walletInfo.tokens.map((item, index) => (
                       <>
                        <TokenInput
                        rowId={index}
                        address={item.address}
                        limit={item.limit}
                        inputTokenChangeEvent={(newValue)=>inputTokenChangeEvent(newValue)}
                        />
                        {/* <Button onClick={() => handleDeleteClick(index)}>Xoa</Button> */}
                        </>

                    ))
                }
                <FlexInput>
                    <Flex>
                        <Button onClick={handleAddClick}>Add</Button>
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