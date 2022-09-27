import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import { Button } from 'components/Pancake-uikit';
import Select, { OptionProps } from 'components/Select/SelectV2';
import React, {useState } from 'react';
import styled from 'styled-components';

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
  inputTokenChangeEvent?:(newValue) => void
  address?: string,
  limit?: string,
  rowId?: number
}

const TokenInput: React.FC<Props> = ({
  inputTokenChangeEvent,
  address,
  limit,
  rowId,
}) => {

  const [tokenLimit, setTokenLimit] = useState(0)
  const [tokenAddress, setTokenAddress] = useState('')
  const [tokenName, setTokenName] = useState('')

  const handleChangeToken = (option: OptionProps): void => {
    setTokenAddress(option.value)
    setTokenName(option.label)
    inputTokenChangeEvent({"tokenAddress" : option.value, "tokenName" : option.label, "limit" : tokenLimit});
  }
  const handleChangeLimit = (value: number): void => {
    setTokenLimit(value)
    inputTokenChangeEvent({"tokenAddress" : tokenAddress, "tokenName": tokenName, "limit" : value});
  }

    return (
      <FlexInput key={rowId}>
          <Flex width='40%'>
             <Flex width='60%' flexDirection='column'>
              <Text>Token</Text>
                <Select
                    options={optionArray}
                    onChange={handleChangeToken}
                    />
             </Flex>
          </Flex>
          <Flex width='40%' flexDirection='column'>
              <Text>Limit</Text>
              <CustomInput
              placeholder={limit}
              pattern={`^[0-9]*[.,]?[0-9]{0,${18}}$`}
              type="number" onChange={(e) => handleChangeLimit(Number(e.target.value))}/>
          </Flex>
      </FlexInput>
    );
};

export default TokenInput;

const FlexInput = styled(Flex)`
    width: 100%;
    height: 100px;
    justify-content: space-around;
    align-items: center;
`
const CustomInput = styled(Input)`
    height: 50px;
`