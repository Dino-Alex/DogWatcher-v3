import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"
import { fetchDataAdminItems } from "./action"
import { fetchDataDog } from "./hook/fetchDataDog"


export const GetDataDogWatcher = (requested: boolean) =>{
    const dogwatcher = useSelector<AppState, AppState['dogwatcher']>((state) => state.dogwatcher)
    const listDataDog = dogwatcher.listDataDog
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
    },[requested])
    return [listDataDog]
}