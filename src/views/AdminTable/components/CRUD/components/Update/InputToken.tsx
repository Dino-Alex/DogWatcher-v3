import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select'

const optionArray = [
    {
        label: 'RUN',
        value: '0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7',
    },
    {
        label: 'BUSD',
        value: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    {
        label: 'BAMI',
        value: '0xe2d3486f46efbd4199ea087e9e466dcc35ee0248',
    },
    {
        label: 'LTD',
        value: '0xdbad544416df0677254645422bb560af8408cae7',
    }
]

interface Props {
    parentCallback?: (newValue, index) => void
    valueToken?: any
    index?: number
}

const InputToken: React.FC<Props> = ({ parentCallback, index, valueToken }) => {
    console.log('valueToken',valueToken);
    

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
                    options={optionArray}
                    onChange={handleChangeToken}
                    defaultValue={{ value: valueToken.tokenAddress, label: valueToken.tokenName }}
                       
                />
            </Flex>
            <Flex width='40%' flexDirection='column'>
                <Text>Limit</Text>
                <CustomInput
                    value={valueToken.tokenLimit}
                    pattern={`^[0-9]*[.,]?[0-9]{0,${18}}$`}
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