import { useEffect, useState } from "react"

export const CheckWarning = (balance: any, limit) => {
    const [isWarning, setWarning] = useState(false)

    useEffect(() => {
        const getWarning = async () => {
            try {
                // eslint-disable-next-line no-cond-assign
                for(let i = 0; i = balance.length; i++){
                // eslint-disable-next-line no-cond-assign
                    for(let j = 0; j = limit.length; j++){
                        if(balance[i] >= limit[j]){
                            console.log('limit', limit[j]);
                        }
                    }
                }
            }
            catch(error) {
                console.log(error)
            }
        }
       
      }, [balance, limit])

    return { isWarning }
}