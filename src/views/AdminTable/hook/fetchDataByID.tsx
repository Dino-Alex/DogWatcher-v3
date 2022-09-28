import axios from 'axios';
import { BASE_URL_DATA_ADMIN_BY_ID } from "config";
import useRefresh from 'hooks/useRefresh';
import { useEffect, useState } from "react";

export const GetListAdminByID = (ID:string) => {
    const [ listDataAdminByID, setListDataAdminByID ] = useState([])
    useEffect(() => {
        const fetchDataAdminByID = async () =>{
          try {
             await axios.get(`${BASE_URL_DATA_ADMIN_BY_ID}${ID}`)
             .then(res => {
                const response = res.data;
                setListDataAdminByID(response)
             })
             .catch(error => console.log(error));
          } catch (error) {
            console.error(error);
          }
        }
        if(ID){
          fetchDataAdminByID();
        }
      }, [ID]);
    return { listDataAdminByID }
}