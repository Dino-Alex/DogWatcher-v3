import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
    parentCallback?:(newValue) => void
  }

const InputProject: React.FC<Props> = ({parentCallback}) => {

    const [projectName, setProjectName] = useState('')
    parentCallback(projectName);

    return (
        <Flex width='40%' flexDirection='column'>
            <Text>Project Name</Text>
            <CustomInput placeholder='Please input your project name' onChange={(e) => setProjectName(e.target.value)}/>
        </Flex>
    );
};

export default InputProject;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`