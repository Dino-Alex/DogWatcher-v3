import { EarnIcon, Flex, Modal, Text } from '@thaihuuluong/dogwatcher-uikit';
import {
  ButtonSubmit,
  ContainerIcon,
  ContainerInput,
  CsFlex,
  CsInput,
  FormSubmit, WrapInput
} from 'components/Menu/GlobalSettings/styles';
import { WalletIcon } from 'components/Pancake-uikit';
import { useTranslation } from 'contexts/Localization';
import React from 'react';
import styled from 'styled-components';
import { GetListAdminByID } from 'views/AdminTable/hook/fetchDataByID';

interface Props {
  id?: string
  onDismiss?: any
}

const UpdateModalAdmin: React.FC<Props> = ({
  id,
  onDismiss
}) => {

  const { t } = useTranslation()
  const { listDataAdminByID } = GetListAdminByID(id.toString())
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
                      value={listDataAdminByID[0].walletName}
                    />
                  </WrapInput>
                  <WrapInput>
                    <ContainerIcon>
                      <EarnIcon />
                    </ContainerIcon>
                    <CsInput name="wallet"
                      type="text"
                      value={listDataAdminByID[0].walletAddress}
                    />
                  </WrapInput>
                </ContainerInput>
                <Flex width="100%" mt="1rem">
                  <ButtonSubmit
                    width="100%"
                    type="submit"
                    value="Submit"
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
export default UpdateModalAdmin

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
