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
            <Flex>
                <Text>Wallet Address</Text><Text color='#FF592C'>*</Text>
            </Flex>
            <CustomInput placeholder='Please input your wallet address' onChange={(e) => parentCallback(e.target.value)}/>
            {value === '' &&
            <Text fontSize='12px' color='#FF592C'>Please input your wallet address</Text>
            }
        </Flex>
    );
};

export default WalletAddress;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`