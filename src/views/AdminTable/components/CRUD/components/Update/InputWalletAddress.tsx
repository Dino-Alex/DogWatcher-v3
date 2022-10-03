import { Flex, Input, Text } from '@thaihuuluong/dogwatcher-uikit';
import React from 'react';
import styled from 'styled-components';

interface Props {
    parentCallback?:(newValue) => void
    value?: string
  }

const WalletAddress: React.FC<Props> = ({parentCallback, value}) => {
    
    return (
        <Flex width='40%' flexDirection='column'>
            <Text>Wallet Address</Text>
            <CustomInput value={value} placeholder='Please input your wallet address' onChange={(e) => parentCallback(e.target.value)}/>
            {value === '' &&
            <Text fontSize='12px' color='#FF592C'>Wallet Address Null</Text>
            }
        </Flex>
    );
};

export default WalletAddress;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`