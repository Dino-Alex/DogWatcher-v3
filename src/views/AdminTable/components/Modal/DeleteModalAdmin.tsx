import { Button, Flex, Modal, Text } from '@thaihuuluong/dogwatcher-uikit';
import axios from 'axios';
import {
  CsFlex
} from 'components/Menu/GlobalSettings/styles';
import { BASE_URL_DATA_ADMIN_CRUD } from 'config';
import { useTranslation } from 'contexts/Localization';
import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-cycle, import/no-named-as-default
// eslint-disable-next-line import/no-cycle


// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
interface Props {
  id?: string
  onDismiss?: any
}

const DeleteModalAdmin: React.FC<Props> = ({
  id,
  onDismiss
}) => {

  const { t } = useTranslation()
  const idProject = id
  const tokenAuth = localStorage.getItem("tokenAuth")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios({
          method: 'DELETE',
          url: `${BASE_URL_DATA_ADMIN_CRUD}/${idProject}`,
          headers:{
              'Authorization': `${tokenAuth}`,
          }
      });
      onDismiss()
      window.location.reload(true)
  } catch (error) {
    console.log(error)
  }
  }

  return (
    <CustomModal title="" onDismiss={onDismiss} maxWidth="550px">
      <Flex flexDirection="column">
        <Flex paddingTop="0px" flexDirection="column">
          <CsFlex width="100%" justifyContent="center" alignItems="center">
            <Text bold fontSize="24px">{t('Delete Admin')}</Text>
          </CsFlex>
          <CsFlex mb={3} mt={3} width="100%" justifyContent="center" alignItems="center">
            <Text color="red">Are you sure to delete?</Text>
          </CsFlex>
          {idProject !== undefined ?
           <Flex width="100%" mt="1rem" style={{gap: '10px'}}>
           <ButtonDelete
             width="100%"
             onClick={handleSubmit}
           >
             Delete
           </ButtonDelete>
           <ButtonCancel
             width="100%"
             onClick={onDismiss}
           >
             Cancel
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
export default DeleteModalAdmin

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
