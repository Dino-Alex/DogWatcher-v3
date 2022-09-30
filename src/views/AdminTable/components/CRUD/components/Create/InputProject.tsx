import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import React from 'react';
import styled from 'styled-components';

interface Props {
    parentCallback?:(newValue) => void
    value?: string
  }

const InputProject: React.FC<Props> = ({parentCallback, value}) => {

    return (
        <Flex width='40%' flexDirection='column'>
            <Flex>
                <Text>Project Name</Text><Text color='#FF592C'>*</Text>
            </Flex>
            <CustomInput placeholder='Please input your project name' onChange={(e) => parentCallback(e.target.value)}/>
            {value === '' &&
            <Text fontSize='12px' color='#FF592C'>Please input your project name</Text>
            }
        </Flex>
    );
};

export default InputProject;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`