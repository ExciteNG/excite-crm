import React from 'react'

type PairColorProps = {
    "follow-up": string[];
    messaged: string[];
    called: string[];
    converted: string[]
}
const StatusTag = ({status}:{status:string}) => {
    const pairColor: PairColorProps = {
      "follow-up": ["bg-[#FBEAE9]", "text-[#9E0A05]"],
      messaged: ["bg-[#E3EFFC]", "text-[#04326B]"],
      called: ["bg-[#FEF6E7]", "text-[#865503]"],
      converted: ["bg-[#E7F6EC]", "text-[#036B26]"],
    };
  return (
      <div className={`${pairColor[status as keyof PairColorProps][0]} p-1 px-3 rounded-full w-fit`}>
          <p className={`${pairColor[status as keyof PairColorProps][1]}`}>{status}</p>
    </div>
  )
}

export default StatusTag;