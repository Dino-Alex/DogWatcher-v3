import { Flex, Text } from '@thaihuuluong/dogwatcher-uikit';
import Select from 'components/Select/SelectV2';
import { optionArrayProject } from 'config';
import React from 'react';

interface Props {
    parentCallback?:(newValue) => void
    value?: string
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
