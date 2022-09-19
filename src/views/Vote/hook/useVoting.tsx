import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'state'
import BigNumber from 'bignumber.js'
import { fetchVotingData } from 'state/votingProposals/fetchDataVoting'
import { fetchSnapShortVoting } from 'state/votingProposals/actions'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useVotingContract } from 'hooks/useContract'

export const useVoting = (votingId, amount, options, onRefresh) => {
  const [requestedVoting, setRequestedVoting] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const converAmount = new BigNumber((amount*1E18).toString()).toString();
  const votingContract = useVotingContract(getAddress(contract.votingProposals))
  const [ pendingVoting, setPendingVoting ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const handleVoting = useCallback(async () => {
    setPendingVoting(true)
    try {
      const tx = await callWithGasPrice(votingContract, 'stakeToVote', [votingId, converAmount, options])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Voting successful'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedVoting(true)
        setPendingVoting(false)
        onRefresh(Date.now())
        try {
          const result = await fetchVotingData(Number(votingId))
          dispatch(fetchSnapShortVoting(result))
        } catch (e) {
            console.log(e)
        }
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedVoting(false)
        setPendingVoting(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingVoting(false)
    } finally {
        setPendingVoting(false)
    }
  }, [
    converAmount,
    votingId,
    options,
    votingContract,
    dispatch,
    onRefresh,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingVoting,
  ])

  return { handleVoting, requestedVoting, pendingVoting }
}
