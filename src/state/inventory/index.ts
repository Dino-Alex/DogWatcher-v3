import { Decrypts } from 'config/api/decrypts'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { fetchShoes, fetchBoxes } from './actions'
import { fetchListShoes, fetchListBoxes } from './fetchData'

export const GetListShoes = (userId:string) => {
    const inventory = useSelector<AppState, AppState['inventory']>((state) => state.inventory)
    const listShoes = inventory.listShoes
    const dispatch = useDispatch<AppDispatch>()
    // const token = localStorage.getItem('serviceToken');
    const token = Decrypts();
    useEffect(() => {
        const getListShoes = async () => {
            try {
                const result = await fetchListShoes(userId)
                dispatch(fetchShoes(result))
            } catch (e) {
                console.log(e)
            }
        }
        getListShoes()
    }, [userId, token]) // eslint-disable-line react-hooks/exhaustive-deps
    return [ listShoes ]
}

export const GetListBoxes = (userId:string) => {
    const inventory = useSelector<AppState, AppState['inventory']>((state) => state.inventory)
    const listBoxes = inventory.listBoxes
    const token = localStorage.getItem('serviceToken');
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListBoxes = async () => {
            try {
                const result = await fetchListBoxes(userId)
                dispatch(fetchBoxes(result))
            } catch (e) {
                console.log(e)
            }
        }
        getListBoxes()
    }, [userId, token]) // eslint-disable-line react-hooks/exhaustive-deps
    return [ listBoxes ]
}