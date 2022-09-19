export interface CountProposal{
    countProposals:number
}

export interface VotingProposalsType{
    ownerAddress:string,
    startTime:number,
    endTime:number,
    votingId:number
}

export interface ListVoting{
    listVoting:VotingProposalsType[]
}

export interface AllowanceType{
    allowance:number
}

export interface votingData{
    transactionHash:string,
    amount:number,
    option:boolean,
    voter:string
}

export interface ListVotingData{
    listVotingData:votingData[]
}