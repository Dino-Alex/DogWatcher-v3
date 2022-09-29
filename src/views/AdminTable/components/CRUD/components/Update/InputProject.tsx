import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
    parentCallback?:(newValue) => void
    value?: string
  }

const InputProject: React.FC<Props> = ({parentCallback, value}) => {

    return (
        <Flex width='40%' flexDirection='column'>
            <Text>Project Name</Text>
            <CustomInput disabled value={value} placeholder='name' onChange={(e) => parentCallback(e.target.value)}/>
        </Flex>
    );
};

export default InputProject;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`