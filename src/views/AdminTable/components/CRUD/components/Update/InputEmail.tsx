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

    const [email, setEmail] = useState([])
    const handleChangeToken = (option): void => {
        setEmail(option.target.value)
      }

    return (
        <Flex width='100%' flexDirection='column'>
            <Text>Email</Text>
            <CustomInput placeholder='Please input your email' value={value} onChange={(e) => parentCallback(e.target.value, index)}/>
        </Flex>
    );
};

export default InputEmail;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`