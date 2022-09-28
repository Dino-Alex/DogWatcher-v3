import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
    parentCallback?:(newValue) => void
  }

const NameWallet: React.FC<Props> = ({parentCallback}) => {

    const [nameWallet, setNameWallet] = useState('')
    parentCallback(nameWallet);

    return (
        <Flex width='40%' flexDirection='column'>
            <Text>Wallet Name </Text>
            <CustomInput placeholder='Please input your name' onChange={(e) => setNameWallet(e.target.value)}/>
        </Flex>
    );
};

export default NameWallet;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`