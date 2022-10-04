import { EarnIcon, Flex, IconButton, Input, Modal, Text } from '@thaihuuluong/dogwatcher-uikit';
import axios from 'axios';
import {
  ButtonSubmit,
  ContainerIcon,
  ContainerInput,
  CsFlex,
  CsInput,
  FormSubmit, WrapInput
} from 'components/Menu/GlobalSettings/styles';
import { DeleteIcon, WalletIcon } from 'components/Pancake-uikit';
import { PlusIcon } from 'components/Pancake-uikit/widgets/Menu/icons';
import { BASE_URL_DATA_ADMIN_CRUD, optionArrayToken } from 'config';
import { useTranslation } from 'contexts/Localization';
import React, { createContext, useEffect, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import styled from 'styled-components';
import Select from 'react-select'
import { GetListAdminByID } from 'views/AdminTable/hook/fetchDataByID';
import InputEmail from '../CRUD/components/Update/InputEmail';
import InputToken from '../CRUD/components/Update/InputToken';


const RefreshUpdateTokenLimit = []
export const RefreshUpdateTokenLimitGlobal = createContext(RefreshUpdateTokenLimit)

interface Props {
  idToken?: string
  onDismiss?: any
}

const UpdateTokenModal: React.FC<Props> = ({
  idToken,
  onDismiss
}) => {

  const { t } = useTranslation()
  const tokenAuth = localStorage.getItem("tokenAuth")
  const { listDataAdminByID } = GetListAdminByID(idToken.toString())

  const [tokenLimit, setTokenLimit] = useState([])

  const callbackTokenLimit = (childData, index) => {
    const newArrLimit = [...tokenLimit];
    newArrLimit[index] = childData;
    setTokenLimit(newArrLimit);
  }

  const handleAddLimit = () => {
    const newTokenLimit = { "tokenAddress": "0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7", "tokenName": "RUN", "tokenLimit": 0 };
    const newArrLimit = [...tokenLimit, newTokenLimit];
    setTokenLimit(newArrLimit);
  };
  const handleDeleteClick = (id: any) => {
    const newArrLimit = [...tokenLimit];
    newArrLimit.splice(id, 1);
    setTokenLimit(newArrLimit);
  };

  useEffect(() => {
    if (tokenLimit.length === 0) {
      if (listDataAdminByID[0]?.limit !== undefined) {
        setTokenLimit(listDataAdminByID[0]?.limit)
      }
    }
  }, [tokenLimit.length, listDataAdminByID])// eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios({
        method: 'POST',
        url: `${BASE_URL_DATA_ADMIN_CRUD}`,
        headers: {
          'Authorization': `${tokenAuth}`,
        },
        data: {
          "id": listDataAdminByID[0]?.id,
          "walletName": listDataAdminByID[0]?.walletName,
          "walletAddress": listDataAdminByID[0]?.walletAddress,
          "status": listDataAdminByID[0]?.status,
          "limit": tokenLimit,
          "email": listDataAdminByID[0]?.email,
          "project": listDataAdminByID[0]?.project,
          "slack": listDataAdminByID[0]?.slack
        }
      });
      RefreshUpdateTokenLimit.push('Successful')
      onDismiss()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CustomModal title="" onDismiss={onDismiss} maxWidth="550px">
      <Flex flexDirection="column" mb={5}>
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
                    <Text>Add Token</Text>
                    <CustomButton onClick={handleAddLimit} style={{ cursor: 'pointer' }} >
                      <PlusIcon />
                    </CustomButton>
                  </Flex>
                  {tokenLimit.length === 0 ?
                    <Text> No Data</Text>
                    :
                    <>
                      {
                        tokenLimit.map((item, index) => (
                          <Flex height='100%' style={{ gap: '5px' }}>
                            <InputToken
                              index={index}
                              valueToken={item}
                              parentCallback={callbackTokenLimit} />
                            <Flex justifyContent='center' alignItems='center' style={{ gap: "10px" }} mt={4}>
                              <DeleteIcon onClick={() => handleDeleteClick(index)} style={{ cursor: 'pointer' }} />
                            </Flex>
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
export default UpdateTokenModal

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
const CustomInput = styled(Input)`
    height: 50px;
    background-color: transparent;
`
const CustomButton = styled(IconButton)`
    background-color: transparent;
    height: 32px;
    width: 32px;
    cursor: pointer;
    box-shadow:none !important;
`