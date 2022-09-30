import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
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
             <Flex>
                <Text>Email</Text> <Text color='#FF592C'>*</Text>
            </Flex>
            <CustomInput  type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder='Please input your email' value={value} onChange={(e) => parentCallback(e.target.value, index)}/>
            {value === '' &&
            <Text fontSize='12px' color='#FF592C'>Please input your email</Text>
            }
        </Flex>
    );
};

export default InputEmail;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`