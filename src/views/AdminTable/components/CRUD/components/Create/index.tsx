import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import { DeleteIcon } from 'components/Pancake-uikit';
import { PlusIcon } from 'components/Pancake-uikit/widgets/Menu/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import InputEmail from './InputEmail';
import NameWallet from './InputNameWallet';
import InputProject from './InputProject';
import InputToken from './InputToken';
import WalletAddress from './InputWalletAddress';

const walletInfo = { 
"id" : "project0x00000",
"name" : "Vo",
"walletAddress" : "0x00000" ,
"tokens" : [
    {"address" : "0x000" , "name" : "run", "limit" : "0" },
],
"emails" : [
    "thuongvokg@gmail.com"
],
"project" : "project",
"slack" : [
    "url"
]
};

const Create = () => {

    const [nameWallet, setNameWallet] = useState('')
    const [walletAddress, setWalletAddress] = useState('')
    const [projectName, setProjectName] = useState('')
    const [tokenLimit, setTokenLimit] = useState([{"address" :"0x00" ,"name": "project", "limit" : 0}])
    const [emails, setEmails] = useState([''])
    console.log('tokenLimit', tokenLimit);

    const callbackNameWallet = (childData) => {
        setNameWallet(childData)
    }
    const callbackWalletAddress = (childData) => {
        setWalletAddress(childData)
    }
    const callbackProjectName = (childData) => {
        setProjectName(childData)
    }
    const callbackTokenLimit = (childData, index) => {
        const newArrLimit = [...tokenLimit];
        newArrLimit[index] = childData;
        setTokenLimit(newArrLimit);
    }
    const callbackEmail = (childData, index) => {
        const newArrEmail = [...emails];
        newArrEmail[index] = childData;
        setEmails(newArrEmail);
    }


    const handleAddLimit = () => {
        const newTokenLimit = {"address" :"0x00" ,"name": "project", "limit" : 0};
        const newArrLimit = [...tokenLimit, newTokenLimit];
        setTokenLimit(newArrLimit);
    };
    const handleDeleteClick = (id: any) => {
        tokenLimit.splice(id, 1);
    };
    const handleAddEmail = () => {
        const newEmail = "Email"
        const newArrEmail = [...emails, newEmail];
        setEmails(newArrEmail);
    };
    const handleDeleteEmail = (id: any) => {
        emails.splice(id, 1);
    };

    return (
        <Container>
        <Flex flexDirection='column'>
            <Flex width='100%' mt={3} mb={3} justifyContent='center' alignItems='center'>
                <Text fontSize='26px'>Create Admin</Text>
            </Flex>
            <FlexInput>
                <NameWallet parentCallback={callbackNameWallet}/>
                <WalletAddress parentCallback={callbackWalletAddress}/>
            </FlexInput>
            <FlexInput>
                <InputProject parentCallback={callbackProjectName}/>
                <Flex width='40%' flexDirection='column'>
                    <Text>ID Project</Text>
                    <CustomInput disabled value={projectName+walletAddress}/>
                </Flex>
            </FlexInput>
           <FlexInputToken>
            <Flex height='100%' width='40%' flexDirection='column' style={{gap: '5px'}}>
                <Flex alignItems='center'>
                    <Text bold color='#FF592C'>Thêm Token</Text>
                    <PlusIcon onClick={handleAddLimit} style={{cursor: 'pointer'}}/>
                </Flex>
            {
                tokenLimit.map((item, index) => (
                    <Flex style={{gap: '5px'}}>
                        <InputToken
                        parentCallback={callbackTokenLimit}/>
                        <Flex  justifyContent='center' alignItems='center' style={{gap: "10px"}}>
                            <DeleteIcon onClick={() => handleDeleteClick(index)} style={{cursor: 'pointer'}}/>
                        </Flex>
                    </Flex>
            ))}
            </Flex>
            <Flex height='100%' width='40%' flexDirection='column' style={{gap: '5px'}}>
                <Flex alignItems='center'>
                    <Text bold color='#FF592C'>Thêm Email</Text>
                    <PlusIcon onClick={handleAddEmail} style={{cursor: 'pointer'}}/>
                </Flex>
            {
                emails.map((item, index) => (
                    <Flex style={{gap: '5px'}}>
                        <InputEmail
                        index={index}
                        value={item}
                        parentCallback={callbackEmail}/>
                        <Flex  justifyContent='center' alignItems='center' style={{gap: "10px"}}>
                            <DeleteIcon onClick={() => handleDeleteEmail(index)} style={{cursor: 'pointer'}}/>
                        </Flex>
                    </Flex>

            ))}
            </Flex>
           </FlexInputToken>
        </Flex>
    </Container>
    );
};

export default Create;

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
const FlexInputToken = styled(Flex)`
    width: 100%;
    height: 100px;
    justify-content: space-around;
    align-items: center;
`