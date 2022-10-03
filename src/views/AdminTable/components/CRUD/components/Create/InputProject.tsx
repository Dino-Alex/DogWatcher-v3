import { Flex, Input, Text } from '@thaihuuluong/dogwatcher-uikit';
import React from 'react';
import styled from 'styled-components';
import { optionArrayProject } from 'config';
import Select from 'components/Select/SelectV2';

interface Props {
    parentCallback?:(newValue) => void
    value?: string
  }

const InputProject: React.FC<Props> = ({parentCallback, value}) => {

    return (
        <Flex width='40%' flexDirection='column'>
            {/* <Flex>
                <Text>Project Name</Text><Text color='#FF592C'>*</Text>
            </Flex>
            <CustomInput placeholder='Please input your project name' onChange={(e) => parentCallback(e.target.value)}/> */}
            {/* {value === '' &&
            <Text fontSize='12px' color='#FF592C'>Please input your project name</Text>
            } */}
            <Flex width='100%' flexDirection='column'>
                <Flex>
                    <Text>Project Name</Text><Text color='#FF592C'>*</Text>
                </Flex>
                <Select
                    options={optionArrayProject}
                    onChange={(e) => parentCallback(e.value)}
                />
            </Flex>
        </Flex>
    );
};

export default InputProject;

const CsSelect = styled(Input)`
    height: 50px;
    background-color: transparent;
`