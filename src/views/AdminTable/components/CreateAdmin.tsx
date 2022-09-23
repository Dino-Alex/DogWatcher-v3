import { Button, CloseIcon, Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import Select from 'components/Select/SelectV2';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectToken from './SelectToken';

const CreateAdmin = () => {

    const [totalClone, setTotalClone] = useState([])
    const arrayEmail = []
    const handleCloneAdd = () => {
        arrayEmail.push()
        setTotalClone((item) => [...item, arrayEmail])
    }
    const handleCloneClose = () => {
        arrayEmail.pop()
        setTotalClone((item) => [...item, arrayEmail])
    }

    return (
        <Container>
            <Flex flexDirection='column'>
                <Flex width='100%' mt={3} mb={3} justifyContent='center' alignItems='center'>
                    <Text fontSize='26px'>Create Admin</Text>
                </Flex>
                <FlexInput>
                    <Flex width='40%' flexDirection='column'>
                        <Text>Name Wallet</Text>
                        <CustomInput />
                    </Flex>
                    <Flex width='40%' flexDirection='column'>
                        <Text>Address Wallet</Text>
                        <CustomInput />
                    </Flex>
                </FlexInput>
                <FlexInput>
                    <Flex width='40%' flexDirection='column'>
                        <Text>Limit</Text>
                        <CustomInput />
                    </Flex>
                    <Flex width='40%' flexDirection='column'>
                        <Text>Email</Text>
                        <CustomInput />
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
                            />
                        </Flex>
                    </Flex>
                    <Flex width='40%' justifyContent='space-between' style={{ gap: '20px' }}>
                        <Flex flexDirection='column'>
                            <Text>Submit</Text>
                            <Button>Submit</Button>
                        </Flex>
                        <Flex flexDirection='column'>
                            <Text>Cancel</Text>
                            <Button color='blue'>Cancel</Button>
                        </Flex>
                    </Flex>
                </FlexInput>
                {totalClone.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <FlexInput key={index}>
                        <Flex width='40%' flexDirection='column' >
                            <Text>Email</Text>
                            <CustomInput />
                        </Flex>
                    </FlexInput>
                ))
                }
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