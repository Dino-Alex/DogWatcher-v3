import { Flex, Input, Text } from '@phamphu19498/runtogether-uikit';
import { optionArrayProject } from 'config';
import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'

interface Props {
    parentCallback?:(newValue) => void
    valueProject?: string
  }

const InputProject: React.FC<Props> = ({parentCallback, valueProject}) => {

    return (
        <Flex width='40%' flexDirection='column'>
           <Flex width='100%' flexDirection='column'>
                <Flex>
                    <Text>Project Name</Text><Text color='#FF592C'>*</Text>
                </Flex>
                <Select
                    isDisabled={!false}
                    options={optionArrayProject}
                    onChange={(e) => parentCallback(e.value)}
                    defaultValue={{ value: valueProject.toString(), label: valueProject.toString() }}
                />
            </Flex>
            <Text fontSize='12px' color='#FF592C'>Can not change</Text>
        </Flex>
    );
};

export default InputProject;

const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`