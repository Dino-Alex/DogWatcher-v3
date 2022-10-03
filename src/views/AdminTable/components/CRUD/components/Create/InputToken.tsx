import { Flex, Input, Text } from '@thaihuuluong/dogwatcher-uikit';
import Select from 'components/Select/SelectV2';
import { optionArrayToken } from 'config';
import React, { useState } from 'react';
import styled from 'styled-components';


interface Props {
    parentCallback?: (newValue, index) => void
    index?: number
}

const InputToken: React.FC<Props> = ({ parentCallback, index }) => {

    const [tokenName, setTokenName] = useState('RUN')
    const [tokenAddress, setTokenAddress] = useState('0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7')
    const [limit, setLimit] = useState(0)
    const [tokenLimit, setTokenLimit] = useState({});

    const handleChangeToken = (option): void => {
        setTokenAddress(option.value)
        setTokenName(option.label)
        const newTokenLimit = {...tokenLimit, tokenAddress: option.value, tokenName: option.label}
        setTokenLimit(newTokenLimit);
        parentCallback({"tokenAddress" : option.value, "tokenName" : option.label, "tokenLimit" : tokenLimit}, index)
    }

    const handleChangeLimit = (value): void => {
        const newTokenLimit = {...tokenLimit, tokenLimit: limit}
        setTokenLimit(newTokenLimit);
        setLimit(value)
        parentCallback({"tokenAddress" : tokenAddress, "tokenName" : tokenName, "tokenLimit" : value}, index)
    }

    return (
        <Flex width='100%' justifyContent='space-between'>
            <Flex width='40%' flexDirection='column' style={{gap: '5px'}}>
                <Text>Token</Text>
                <Select
                    options={optionArrayToken}
                    onChange={handleChangeToken}
                />
            </Flex>
            <Flex width='40%' flexDirection='column'>
                <Text>Limit</Text>
                <CustomInput
                    pattern={`^[0-9]*[.,]?[0-9]{0,${18}}$`}
                    value={limit}
                    min="0"
                    type="number" onChange={(e) => handleChangeLimit(Number(e.target.value))} />
            </Flex>
        </Flex>
    );
};

export default InputToken;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`