import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select'

interface Props {
    parentCallback?: (newValue, index) => void
    index?: number,
    value?: string
}

const InputSlack: React.FC<Props> = ({ parentCallback, value, index }) => {

    return (
        <Flex width='100%' flexDirection='column'>
            <Text>Slack</Text>
            <CustomInput placeholder='Please input your slack' value={value} onChange={(e) => parentCallback(e.target.value, index)}/>
        </Flex>
    );
};

export default InputSlack;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`