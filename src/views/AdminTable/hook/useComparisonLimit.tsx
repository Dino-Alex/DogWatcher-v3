import { useEffect, useState } from "react"
import { formatAmount } from "utils/formatInfoNumbers"

export const useComparisonLimit = (balance: number, limit: number) => {

    if(balance < limit){
        return `${formatAmount(balance)} < ${formatAmount(limit)}`
    }
    return ''
}