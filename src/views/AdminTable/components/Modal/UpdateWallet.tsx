import { Button, EarnIcon, Flex, Modal, Text } from '@thaihuuluong/dogwatcher-uikit';
import axios from 'axios';
import {
  ContainerIcon,
  ContainerInput,
  CsFlex,
  CsInput,
  FormSubmit, WrapInput
} from 'components/Menu/GlobalSettings/styles';
import { WalletIcon } from 'components/Pancake-uikit';
import { BASE_URL_DATA_ADMIN_CRUD } from 'config';
import { useTranslation } from 'contexts/Localization';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetListAdminByID } from 'views/AdminTable/hook/fetchDataByID';

interface Props {
  id?: string
  onDismiss?: any
}

const UpdateWallet: React.FC<Props> = ({
  id,
  onDismiss
}) => {

  const { t } = useTranslation()
  const { listDataAdminByID } = GetListAdminByID(id.toString())
  const [nameWallet, setNameWallet] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  
  useEffect(() => {
    if (nameWallet === "") {
        if (listDataAdminByID[0]?.walletName !== undefined) {
            setNameWallet(listDataAdminByID[0]?.walletName)
        }
    }
    if (walletAddress === "") {
        if (listDataAdminByID[0]?.walletAddress !== undefined) {
            setWalletAddress(listDataAdminByID[0]?.walletAddress)
        }
    }
  }, [listDataAdminByID, nameWallet, walletAddress])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await axios.post(BASE_URL_DATA_ADMIN_CRUD,
            {
                "id": listDataAdminByID[0].id,
                "walletName": nameWallet,
                "walletAddress": walletAddress,
                "status": listDataAdminByID[0].status,
                "limit": listDataAdminByID[0].limit,
                "email": listDataAdminByID[0].email,
                "project": listDataAdminByID[0].project,
                "slack": listDataAdminByID[0].slack
            })
            onDismiss()
      // window.location.reload(true)
    } catch (error) {
        console.log(error)
    }
}

  return (
    <CustomModal title="" onDismiss={onDismiss} maxWidth="550px">
      <Flex flexDirection="column">
        <Flex paddingTop="0px" flexDirection="column">
          <CsFlex width="100%" justifyContent="center" alignItems="center">
            <Text bold fontSize="24px">{t('Update Name/Wallet')}</Text>
          </CsFlex>
          <CsFlex mb={4} width="100%" justifyContent="center" alignItems="center">
            <Text color="#B5B5BE" />
          </CsFlex>
          {listDataAdminByID.length !== 0 ?
            <FormSubmit >
              <Flex flexDirection="column">
                <ContainerInput>
                  <WrapInput>
                    <ContainerIcon>
                      <WalletIcon />
                    </ContainerIcon>
                    <CsInput name="wallet"
                      type="text"
                      value={nameWallet}
                      onChange={(e) => setNameWallet(e.target.value)}
                    />
                  </WrapInput>
                  <WrapInput>
                    <ContainerIcon>
                      <EarnIcon />
                    </ContainerIcon>
                    <CsInput name="wallet"
                      type="text"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                    />
                  </WrapInput>
                </ContainerInput>
                <Flex width="100%" mt="1rem">
                  <Button
                    width="100%"
                    type="submit"
                    value="Submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
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
export default UpdateWallet

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
