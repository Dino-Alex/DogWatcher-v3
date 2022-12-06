import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"
import { RefreshUpdateEmailGlobal } from "views/AdminTable/components/Modal/UpdateEmail"
import { RefreshUpdateGlobal } from "views/AdminTable/components/Modal/UpdateStatus"
import { RefreshUpdateTokenLimitGlobal } from "views/AdminTable/components/Modal/UpdateTokenModal"
import { RefreshUpdateWalletGlobal } from "views/AdminTable/components/Modal/UpdateWallet"
import { fetchDataAdminItems } from "./action"
import { fetchDataDog } from "./hook/fetchDataDog"

export const GetDataDogWatcher = () =>{
    const refreshUpdate = useContext(RefreshUpdateGlobal)
    const refreshDelete = useContext(RefreshUpdateGlobal)
    const refreshUpdateEmail = useContext(RefreshUpdateEmailGlobal)
    const refreshUpdateWallet = useContext(RefreshUpdateWalletGlobal)
    const refreshUpdateTokenLimit = useContext(RefreshUpdateTokenLimitGlobal)
    const dogwatcher = useSelector<AppState, AppState['dogwatcher']>((state) => state.dogwatcher)
    const {listDataDog} = dogwatcher
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getSaleItems = async () => {
            try{
                const result = await fetchDataDog()
                dispatch(fetchDataAdminItems(result))
            }catch(e){
                console.log(e);
            }
        }
        getSaleItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[refreshUpdate.length, refreshDelete.length, refreshUpdateEmail.length, refreshUpdateWallet.length, refreshUpdateTokenLimit.length])
    return [listDataDog]
}