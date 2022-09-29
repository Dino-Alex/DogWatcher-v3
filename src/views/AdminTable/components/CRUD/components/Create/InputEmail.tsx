import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select'

interface Props {
    parentCallback?: (newValue, index) => void
    index?: number,
    value?: string
}

const InputEmail: React.FC<Props> = ({ parentCallback, value, index }) => {

    return (
        <Flex width='100%' flexDirection='column'>
            <Text>Email</Text>
            <CustomInput  type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder='Please input your email' value={value} onChange={(e) => parentCallback(e.target.value, index)}/>
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