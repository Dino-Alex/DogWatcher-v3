import { Flex, Input, Text } from '@thaihuuluong/dogwatcher-uikit';
import React from 'react';
import styled from 'styled-components';

interface Props {
    parentCallback?:(newValue) => void
    value?: string
  }

const NameWallet: React.FC<Props> = ({parentCallback, value}) => {

    return (
        <Flex width='40%' flexDirection='column'>
            <Flex>
                <Text>Wallet Name</Text> <Text color='#FF592C'>*</Text>
            </Flex>
            <CustomInput type='text' placeholder='Please input your name' onChange={(e) => parentCallback(e.target.value)}/>
            {value === '' &&
            <Text fontSize='12px' color='#FF592C'>Please input your name</Text>
            }
        </Flex>
    );
};

export default NameWallet;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`