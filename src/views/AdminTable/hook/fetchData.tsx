import axios from 'axios';
import { BASE_URL_DATA_ADMIN } from "config";
import useRefresh from 'hooks/useRefresh';
import { useEffect, useState } from "react";

export const GetListAdmin = () => {
    const [ listDataAdmin, setListDataAdmin ] = useState([])
    const { fastRefresh } = useRefresh()
    useEffect(() => {
        const fetchDataAdmin = async () =>{
          try {
             await axios.get(`${BASE_URL_DATA_ADMIN}`)
             .then(res => {
                const response = res.data;
                setListDataAdmin(response)
             })
             .catch(error => console.log(error));
          } catch (error) {
            console.error(error);
          }
        }
        fetchDataAdmin();
      }, [fastRefresh]);
    return { listDataAdmin }
}