import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
    parentCallback?:(newValue) => void
  }

const WalletAddress: React.FC<Props> = ({parentCallback}) => {

    const [walletAddress, setWalletAddress] = useState('')
    parentCallback(walletAddress);

    return (
        <Flex width='40%' flexDirection='column'>
            <Text>Wallet Address</Text>
            <CustomInput placeholder='Please input your wallet address' onChange={(e) => setWalletAddress(e.target.value)}/>
        </Flex>
    );
};

export default WalletAddress;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`