import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
    parentCallback?:(newValue) => void
    value?: string
  }

const NameWallet: React.FC<Props> = ({parentCallback, value}) => {

    const [nameWallet, setNameWallet] = useState('')
    parentCallback(nameWallet);

    return (
        <Flex width='40%' flexDirection='column'>
            <Text>Name Wallet</Text>
            <CustomInput value={value} placeholder='name' onChange={(e) => setNameWallet(e.target.value)}/>
        </Flex>
    );
};

export default NameWallet;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`