import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
    parentCallback?:(newValue) => void
    value?: string
  }

const NameWallet: React.FC<Props> = ({parentCallback, value}) => {
    return (
        <Flex width='40%' flexDirection='column'>
            <Text>Name Wallet</Text>
            <CustomInput value={value} placeholder='Please input your name' onChange={(e) => parentCallback(e.target.value)}/>
            {value === '' &&
            <Text fontSize='12px' color='#FF592C'>Wallet Name Null</Text>
            }
        </Flex>
    );
};

export default NameWallet;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`