import { Flex, IconButton, Modal, Text } from '@thaihuuluong/dogwatcher-uikit';
import axios from 'axios';
import {
  ButtonSubmit, ContainerInput,
  CsFlex, WrapInput
} from 'components/Menu/GlobalSettings/styles';
import { DeleteIcon } from 'components/Pancake-uikit';
import { PlusIcon } from 'components/Pancake-uikit/widgets/Menu/icons';
import { BASE_URL_DATA_ADMIN_CRUD } from 'config';
import { useTranslation } from 'contexts/Localization';
import React, { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetListAdminByID } from 'views/AdminTable/hook/fetchDataByID';
import InputEmail from '../CRUD/components/Update/InputEmail';


const RefreshUpdateEmail= []
export const RefreshUpdateEmailGlobal = createContext(RefreshUpdateEmail)
interface Props {
  idEmail?: string
  onDismiss?: any
}

const UpdateEmail: React.FC<Props> = ({
  idEmail,
  onDismiss
}) => {

  const { t } = useTranslation()
  const tokenAuth = localStorage.getItem("tokenAuth")
  const { listDataAdminByID } = GetListAdminByID(idEmail.toString())
  const [emails, setEmails] = useState([''])
  const callbackEmail = (childData, index) => {
    const newArrEmail = [...emails];
    newArrEmail[index] = childData;
    setEmails(newArrEmail);
  }

  const handleAddEmail = () => {
    const newEmail = ""
    const newArrEmail = [...emails, newEmail];
    setEmails(newArrEmail);
  };
  const handleDeleteEmail = (id: any) => {
    const newArrEmail = [...emails];
    newArrEmail.splice(id, 1);
    setEmails(newArrEmail);
  };
  useEffect(() => {
    if (emails.length === 1) {
      if (listDataAdminByID[0]?.email !== undefined) {
        setEmails(listDataAdminByID[0]?.email);
      }
    }
  }, [emails.length, listDataAdminByID])// eslint-disable-line react-hooks/exhaustive-deps

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
              "status": listDataAdminByID[0]?.status,
              "limit": listDataAdminByID[0]?.limit,
              "email": emails,
              "project": listDataAdminByID[0]?.project,
              "slack": listDataAdminByID[0]?.slack
            }
        });
        RefreshUpdateEmail.push('Successful')
        onDismiss()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CustomModal title="" onDismiss={onDismiss} maxWidth="550px">
      <Flex flexDirection="column">
        <Flex paddingTop="0px" flexDirection="column">
          <CsFlex width="100%" justifyContent="center" alignItems="center">
            <Text bold fontSize="24px">{t('Update Email')}</Text>
          </CsFlex>
          <CsFlex mb={4} width="100%" justifyContent="center" alignItems="center">
            <Text color="#B5B5BE" />
          </CsFlex>
          {listDataAdminByID.length !== 0 ?
            <Flex flexDirection="column">
              <ContainerInput>
                <WrapInput>
                  <Flex alignItems='center'>
                    <Text>Add Email</Text>
                    <CustomButton onClick={handleAddEmail} style={{ cursor: 'pointer' }} >
                      <PlusIcon />
                    </CustomButton>
                  </Flex>
                  {emails.length === 0 ?
                    <Text> No Data</Text>
                    :
                    <>
                      {emails.map((item, index) => (
                        <Flex style={{ gap: '5px' }}>
                          <InputEmail
                            index={index}
                            value={item}
                            parentCallback={callbackEmail} />
                          <CustomButton onClick={() => handleDeleteEmail(index)} justifyContent='center' alignItems='center' style={{ gap: "10px" }} mt={4}>
                            <DeleteIcon  style={{ cursor: 'pointer' }} />
                          </CustomButton>
                        </Flex>
                      ))}
                    </>
                  }
                  {/* <TagsInput value={listDataAdminByID[0].email.emailAddress}/> */}
                </WrapInput>
              </ContainerInput>
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
export default UpdateEmail

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

const CustomButton = styled(IconButton)`
    background-color: transparent;
    height: 32px;
    width: 32px;
    cursor: pointer;
    box-shadow:none !important;
`