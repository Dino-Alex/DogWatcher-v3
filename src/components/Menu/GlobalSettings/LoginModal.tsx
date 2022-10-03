import { Flex, InjectedModalProps, Modal, Text } from '@phamphu19498/runtogether-uikit';
import axios from 'axios';
import { BASE_URL_LOGIN } from 'config';
import React, { CSSProperties, useState } from 'react';
import styled from 'styled-components';
import { EyeCloseIcon } from 'components/Pancake-uikit';
import { useTranslation } from 'contexts/Localization';
import RingLoader from "react-spinners/RingLoader";
// eslint-disable-next-line import/no-cycle, import/no-named-as-default
// eslint-disable-next-line import/no-cycle
import EyeOpenIcon from '../../Pancake-uikit/components/Svg/Icons/EyeOpenIcon';
import LockIcon from '../../Pancake-uikit/components/Svg/Icons/LockIcon';
import Mail from '../../Pancake-uikit/components/Svg/Icons/Mail';

import {
  ButtonSubmit,
  ContainerIcon,
  ContainerInput,
  CsFlex,
  CsInput, TransferModal,
  WrapIcon,
  WrapInput
} from './styles';

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


const LoginModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [changePassword, setChangePassword] = useState(true)
  const changeIcon = changePassword !== true
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#FFFFFF");
  const [errorLogin, setErrorLogin] = useState(0);
  const { t } = useTranslation()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const resp = await axios.post(BASE_URL_LOGIN,
        {
            "name" : username,
            "password": password
           
        })
        localStorage.setItem("tokenAuth", resp.data.token)
        onDismiss()
        setLoading(true)
    } catch (error) {
      setLoading(false)
      setErrorLogin(error.response.status)
      console.log(error)
    }
  }


  
  return (
    <CustomModal title="" onDismiss={onDismiss} maxWidth="550px">
      <Flex flexDirection="column">
        <Flex paddingTop="0px" flexDirection="column">
          <CsFlex width="100%" justifyContent="center" alignItems="center">
            <Text bold fontSize="24px">{t('Login')}</Text>
          </CsFlex>
          <CsFlex width="100%" justifyContent="center" alignItems="center">
            <Text color="#B5B5BE" />
            <TransferModal />
          </CsFlex>
          <form>
            <Flex width='100%' flexDirection="column">
              <ContainerInput>
                <WrapInput>
                  <ContainerIcon>
                    <Mail />
                  </ContainerIcon>
                  <Flex width='100%' >
                    <CsInput name="username" placeholder="Your username" onChange={(e) => setUsername(e.target.value)}/>
                  </Flex>
                </WrapInput>
                <WrapInput>
                  <ContainerIcon>
                    <LockIcon />
                  </ContainerIcon>
                  <CsInput
                    type={changePassword ? 'password' : 'text'}
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />
                  <WrapIcon
                    className="icon"
                    onClick={() => {
                      setChangePassword(changeIcon)
                    }}
                  >
                    {changeIcon ? <EyeOpenIcon /> : <EyeCloseIcon />}
                  </WrapIcon>
                </WrapInput>
              </ContainerInput>
              <Flex width="100%" mt="1rem">
                <ButtonSubmit
                  width="100%"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {!loading ?
                    "Login"
                    :
                    <RingLoader color={color} loading={loading} cssOverride={override} size={30} />
                  }
                </ButtonSubmit>
              </Flex>
              <Flex
                justifyContent="center"
              >
                {errorLogin === 404 ?
                  <TextInvalid color='#e75243'>Invalid Username or Password!</TextInvalid>
                :
                  <TransferModal/>
              }
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </CustomModal>
  )
}
export default LoginModal

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
const TextInvalid = styled(Text)`
  margin-top: 10px;
  background: none;
  box-shadow: none;
  color: #e75243;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  padding: 0px;
`