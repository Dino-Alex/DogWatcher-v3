import { Button, Flex, Modal, Text } from '@thaihuuluong/dogwatcher-uikit';
import axios from 'axios';
import {
  CsFlex
} from 'components/Menu/GlobalSettings/styles';
import { BASE_URL_DATA_ADMIN_CRUD } from 'config';
import React from 'react';
import history from 'routerHistory';
import styled from 'styled-components';


interface Props {
  id?: string
  walletName?: string
  walletAddress?: string
  status?: boolean
  limit?: any
  email?: any
  project?: string
  slack?: any
  onDismiss?: any
}

const SubmitModal: React.FC<Props> = ({
  id,
  walletName,
  walletAddress,
  status,
  limit,
  email,
  project,
  slack,
  onDismiss
}) => {

  const tokenAuth = localStorage.getItem("tokenAuth")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await axios({
            method: 'POST',
            url: `${BASE_URL_DATA_ADMIN_CRUD}`,
            headers:{
                'Authorization': `${tokenAuth}`
            },
            data: {
                "id" : id,
                "walletName": walletName,
                "walletAddress": walletAddress,
                "status": status,
                "limit":limit,
                "email":email,
                "project":project,
                "slack":slack
            }
        });
        onDismiss()
        history.push(`/`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CustomModal title="" onDismiss={onDismiss} maxWidth="550px">
      <Flex flexDirection="column">
        <Flex paddingTop="0px" flexDirection="column">
          <CsFlex width="100%" justifyContent="center" alignItems="center">
            <Text bold fontSize="24px">WARRNING</Text>
          </CsFlex>
          <CsFlex mb={3} mt={3} width="100%" justifyContent="center" alignItems="center">
            <Text color="red">YOU HAVE NOT ENTERED THE LIMIT FOR TOKEN!</Text>
          </CsFlex>
          {id !== undefined ?
           <Flex width="100%" mt="1rem" style={{gap: '10px'}}>
           <ButtonDelete
             width="100%"
             onClick={handleSubmit}
           >
             Continue
           </ButtonDelete>
           <ButtonCancel
             width="100%"
             onClick={onDismiss}
           >
             Return
           </ButtonCancel>
         </Flex>
        :
        <Flex>
          <Text>No Data</Text>
        </Flex>
        }
        </Flex>
      </Flex>
    </CustomModal>
  )
}
export default SubmitModal

const CustomModal = styled(Modal)`
  padding: 0px !important;
  width: 475px;
  min-width: 350px;
  @media only screen and (max-width: 600px) {
    width: 360px;
  }
  @media only screen and (max-width: 320px) {
    min-width: 320px;
    width: 320px;
  }
`
const ButtonCancel = styled(Button)`
  background: #029DA5;
  border-radius: 25px;
  box-shadow: none;
`
const ButtonDelete = styled(Button)`
  background: #FF592C;
  border-radius: 25px;
  box-shadow: none;
`
