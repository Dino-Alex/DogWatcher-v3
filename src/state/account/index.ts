import { Decrypts } from 'config/api/decrypts'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
// eslint-disable-next-line import/named
import { fetchListPartnerConfig, fetchListReferal, fetchnonceCode, fetchParentPartner, fetchreferralCode, fetchUserInfo, fetchUserLevelVip } from "./actions"
import { fetchLevelVip, fetchListReferalData, fetchnonceCodeByUser, fetchParentPartnerData, fetchPartnerConfig, fetchReferralCode, fetchUser } from "./fetchData"

export const GetLevelVip = () => {
    const account = useSelector<AppState, AppState['account']>((state) => state.account)
    const level = account.level
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const result = await fetchLevelVip()
                dispatch(fetchUserLevelVip(result))
            } catch (e) {
                console.log(e)
            }
        }
        getDataUser()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return [ level ]
}

export const GetReferralCode = () => {
    const account = useSelector<AppState, AppState['account']>((state) => state.account)
    const referralCode = account.referralCode
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getReferralCode = async () => {
            try {
                const result = await fetchReferralCode()
                dispatch(fetchreferralCode(result))
            } catch (e) {
                console.log(e)
            }
        }
        getReferralCode()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return [ referralCode ]
}

export const GetNonceCode = (account:string) => {
    const userData = useSelector<AppState, AppState['account']>((state) => state.account)
    const nonceCode = userData.nonceCode
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getReferralCode = async () => {
            try {
                const result = await fetchnonceCodeByUser(account)
                dispatch(fetchnonceCode(result))
            } catch (e) {
                console.log(e)
            }
        }
        getReferralCode()
    }, [account, dispatch])
    return [ nonceCode ]
}

export const GetUser = (requestedUpdate) => {
    const userData = useSelector<AppState, AppState['account']>((state) => state.account)
    const user = userData.userInfo
    const dispatch = useDispatch<AppDispatch>()
    // const token = localStorage.getItem('serviceToken');
    const token = Decrypts();
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const result = await fetchUser()
                dispatch(fetchUserInfo(result))
            } catch (e) {
                console.log(e)
            }
        }
        getUserInfo()
    }, [dispatch, token, requestedUpdate])
    return [ user ]
}

export const GetPartnerConfig = () => {
    const userData = useSelector<AppState, AppState['account']>((state) => state.account)
    const partnerConfig = userData.listPartnerConfig
    const dispatch = useDispatch<AppDispatch>()
    const token = Decrypts();
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const result = await fetchPartnerConfig()
                dispatch(fetchListPartnerConfig(result))
            } catch (e) {
                console.log(e)
            }
        }
        getUserInfo()
    }, [dispatch, token])
    return [ partnerConfig ]
}

export const GetParentPartner = () => {
    const userData = useSelector<AppState, AppState['account']>((state) => state.account)
    const partnerparent = userData.parentpartner;
    const dispatch = useDispatch<AppDispatch>()
    const token = Decrypts();
    useEffect(() => {
        const getparentPartner = async () => {
            try {
                const result = await fetchParentPartnerData()
                dispatch(fetchParentPartner(result))
            } catch (e) {
                console.log(e)
            }
        }
        getparentPartner()
    }, [dispatch, token])
    return [ partnerparent ]
}

export const GetListReferal = () => {
    const userData = useSelector<AppState, AppState['account']>((state) => state.account)
    const listreferal = userData.getlistreferal;
    const dispatch = useDispatch<AppDispatch>()
    const token = Decrypts();
    useEffect(() => {
        const getlistReferal = async () => {
            try {
                const result = await fetchListReferalData()
                dispatch(fetchListReferal(result));
            } catch (e) {
                console.log(e)
            }
        }
        getlistReferal()
    }, [dispatch, token])
    return [ listreferal ]
}