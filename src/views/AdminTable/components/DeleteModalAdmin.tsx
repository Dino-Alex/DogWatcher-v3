import { Button, Flex, InjectedModalProps, Modal, Text, useModal } from '@phamphu19498/runtogether-uikit';
import { unwrapResult } from '@reduxjs/toolkit';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import ForgotModal from 'components/Menu/GlobalSettings/ForgotPasswordModal';
import RegisterModal from 'components/Menu/GlobalSettings/RegisterModal';
import {
  CsFlex
} from 'components/Menu/GlobalSettings/styles';
import { Encrypts } from 'config/api/encrypt';
import { useTranslation } from 'contexts/Localization';
import useTheme from 'hooks/useTheme';
import useToast from 'hooks/useToast';
import React, { CSSProperties, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from 'state';
import { GetUser } from 'state/account';
import { login } from 'state/auth.createslice';
import styled from 'styled-components';
// eslint-disable-next-line import/no-cycle, import/no-named-as-default
// eslint-disable-next-line import/no-cycle


// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
interface RegisterProp {
  email: string,
  password: string,
}
const initValue: RegisterProp = {
  email: '',
  password: '',
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



const DeleteModalAdmin: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [changePassword, setChangePassword] = useState(true)
  const changeIcon = changePassword !== true
  const [loading, setLoading] = useState(false);
  const { toastSuccess, toastError } = useToast()
  const [color, setColor] = useState("#FFFFFF");
  const [openModalRegister] = useModal(<RegisterModal />)
  const [openModalForgot] = useModal(<ForgotModal />)
  const { account } = useWeb3React()
  const [user] = GetUser(true)
  const { t } = useTranslation()
  const { theme } = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const history = useHistory();
  const [checkError, SetCheckError] = useState(false);
  const [getMessageError, SetMessageError] = useState('');
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    setError,
    watch
  } = useForm({
    defaultValues: initValue
  });
  const handleLogin = async (data) => {
    setLoading(true)
    SetCheckError(false);

    const body = {
      email: data.email,
      password: data.password,
    }
    try {
      const responses: any = await dispatch(login(body))
      unwrapResult(responses);
      if (responses.payload.data === "RequestLimit") {
        toastError("You have exceeded the allowed access limit. Please try again");
      }
      const { token } = responses.payload.data;
      // eslint-disable-next-line camelcase
      const { user_info } = responses.payload.data;
      const encrypt = Encrypts(token);
      const encryptUserInfo = Encrypts(user_info);
      if (token) {
        localStorage.setItem('serviceToken', encrypt);
        localStorage.setItem('user_info', encryptUserInfo);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        if (account && user_info?.address) {
          if (account.toLocaleUpperCase() !== user_info?.address.toLocaleUpperCase()) {
            sessionStorage.setItem('isDifferent', "true");
          }
        }
        onDismiss()
      } else {
        localStorage.removeItem('serviceToken');
        localStorage.removeItem('user_info');
        delete axios.defaults.headers.common.Authorization;
        setLoading(false)
      }
    }

    catch (error) {
      console.log('error', error);
      // eslint-disable-next-line camelcase
      let { error_code }: any = error;
      SetCheckError(true);
      // eslint-disable-next-line camelcase
      if (error_code === "USER_NOT_FOUND") {
        // eslint-disable-next-line camelcase
        error_code = "User is not found"
      }
      // eslint-disable-next-line camelcase
      if (error_code === "PASSWORD_IS_INVALID") {
        // eslint-disable-next-line camelcase
        error_code = "Email or password is invalid"
      }
      SetMessageError(error_code);
      setLoading(false)
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
            <Text color="red">Hãy chắc chắn bạn muốn xóa!</Text>
          </CsFlex>
          <Flex width="100%" mt="1rem" style={{gap: '10px'}}>
            <ButtonDelete
              width="100%"
              type="submit"
              value="Submit"
              disabled={loading}
            >
              Delete
            </ButtonDelete>
            <ButtonCancel
              width="100%"
              type="submit"
              value="Submit"
              disabled={loading}
            >
              Cancel
            </ButtonCancel>
          </Flex>
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
const CustomMessageError = styled.div`
color: #FF592C;
font-size:16px;
font-weight:400;
letter-spacing: 0.1;
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
