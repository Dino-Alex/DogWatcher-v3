import { Flex, Input, Text } from '@thaihuuluong/dogwatcher-uikit';
import React from 'react';
import styled from 'styled-components';

interface Props {
    parentCallback?: (newValue, index) => void
    index?: number,
    value?: string
}

const InputEmail: React.FC<Props> = ({ parentCallback, value, index }) => {

    return (
        <Flex width='100%' flexDirection='column'>
            <Text>Email</Text>
            <CustomInput name="email" value={value}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                type="email" placeholder='Please input your email' onChange={(e) => parentCallback(e.target.value, index)}
            />
            {/* <CustomInput placeholder='Please input your email' value={value} onChange={(e) => parentCallback(e.target.value, index)}/> */}
            {value === '' &&
            <Text fontSize='12px' color='#FF592C'>Email Null</Text>
            }
        </Flex>
    );
};

export default InputEmail;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`