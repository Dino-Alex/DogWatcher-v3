import { Flex, Input, Text } from '@thaihuuluong/dogwatcher-uikit';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
    parentCallback?: (newValue, index) => void
    index?: number,
    value?: any
}

const InputEmail: React.FC<Props> = ({ parentCallback, value, index }) => {

    const [arrayEmail, setArrayEmail] = useState({});

    const handleChangeLimit = (valueEmail): void => {
        const newTokenLimit = {...arrayEmail, time: ''}
        setArrayEmail(newTokenLimit);
        parentCallback({"address" : valueEmail, "time" : ''}, index)
    }

    return (
        <Flex width='100%' flexDirection='column'>
            <Text>Email</Text>
            <CustomInput placeholder='Please input your email' value={value.address} onChange={(e) => handleChangeLimit(e.target.value)}/>
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