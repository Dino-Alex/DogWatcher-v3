import { Flex, Modal, Text } from '@thaihuuluong/dogwatcher-uikit';
import axios from 'axios';
import {
  ButtonSubmit, CsFlex, FormSubmit
} from 'components/Menu/GlobalSettings/styles';
import { BASE_URL_DATA_ADMIN_CRUD } from 'config';
import { useTranslation } from 'contexts/Localization';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetListAdminByID } from 'views/AdminTable/hook/fetchDataByID';

interface Props {
  idStatus?: string
  onDismiss?: any
}

const UpdateStatus: React.FC<Props> = ({
  idStatus,
  onDismiss
}) => {

  const { t } = useTranslation()
  const tokenAuth = localStorage.getItem("tokenAuth")
  const { listDataAdminByID } = GetListAdminByID(idStatus.toString())
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if(listDataAdminByID[0]?.status === true){
      setStatus(false)
    }
    if(listDataAdminByID[0]?.status === false){
      setStatus(true)
    }
  },[listDataAdminByID])


const handleSubmit = async (e) => {
  e.preventDefault()
  try {
      await axios({
          method: 'POST',
          url: `${BASE_URL_DATA_ADMIN_CRUD}`,
          headers:{
              'Authorization': `${tokenAuth}`,
          },
          data: {
            "id": listDataAdminByID[0]?.id,
            "walletName": listDataAdminByID[0]?.walletName,
            "walletAddress": listDataAdminByID[0]?.walletAddress,
            "status": status,
            "limit": listDataAdminByID[0]?.limit,
            "email": listDataAdminByID[0]?.email,
            "project": listDataAdminByID[0]?.project,
            "slack": listDataAdminByID[0]?.slack
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
            <Text bold fontSize="24px">{t('Update Status')}</Text>
          </CsFlex>
          {listDataAdminByID.length !== 0 ?
          <>
            {listDataAdminByID[0].status === true ?
              <CsFlex mb={2} mt={3} width="100%" justifyContent="center" alignItems="center">
                <Text color="red">Are you sure to</Text><Text fontWeight={700}>Disable</Text><Text  color="red">?</Text>
              </CsFlex>
              :
              <CsFlex mb={2} mt={3} width="100%" justifyContent="center" alignItems="center">
                <Text color="red">Are you sure to</Text><Text color='#029DA5' fontWeight={700}>Enable</Text><Text  color="red">?</Text>
              </CsFlex>
            }
          </>
              :
              <></>
          }
          <CsFlex mb={4} width="100%" justifyContent="center" alignItems="center">
            <Text color="#B5B5BE" />
          </CsFlex>
          {listDataAdminByID.length !== 0 ?
            <FormSubmit >
              <Flex flexDirection="column">
                {listDataAdminByID[0].status === true ?
                  <Flex mb={3} width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                    <FlexStatus isStatus={listDataAdminByID[0].status}>
                      <TextStatus isStatus={listDataAdminByID[0].status}>Enabled</TextStatus>
                    </FlexStatus>
                    <Flex>
                      👉
                    </Flex>
                    <FlexStatus isStatus={false}>
                      <TextStatus isStatus={false}>Disabled</TextStatus>
                    </FlexStatus>
                  </Flex>
                  :
                  <Flex mb={3} width='100%' justifyContent='center' alignItems='center' style={{ gap: '10px' }}>
                    <FlexStatus isStatus={listDataAdminByID[0].status}>
                      <TextStatus isStatus={listDataAdminByID[0].status}>Disabled</TextStatus>
                    </FlexStatus>
                    <Flex>
                      👉
                    </Flex>
                    <FlexStatus isStatus={!false}>
                      <TextStatus isStatus={!false}>Enabled</TextStatus>
                    </FlexStatus>
                  </Flex>
                }
                <Flex width="100%" mt="1rem">
                  <ButtonSubmit
                    width="100%"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </ButtonSubmit>
                </Flex>
              </Flex>
            </FormSubmit>
            :
            <Flex justifyContent='center' alignItems='center'>
              <Text>No data</Text>
            </Flex>
          }
        </Flex>
      </Flex>
    </CustomModal>
  )
}
export default UpdateStatus

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
const TextStatus = styled(Text) <{ isStatus: boolean }>`
    color: ${({ isStatus }) => (isStatus ? '#029DA5' : '#000')};
    font-weight: 600;
    @media screen and (max-width: 768px) {
        font-size: 10px;
    }
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
`
const FlexStatus = styled(Flex) <{ isStatus: boolean }>`
    border: 1px solid ${({ isStatus }) => (isStatus ? '#029DA5' : '#000')};
    padding: 5px;
    border-radius: 10px;
`