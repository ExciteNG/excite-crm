'use client'

import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import Loader, { LoaderSize } from "@/src/components/dashboardUI/reusableComponents/Loader";
import { useReactQuery } from "@/src/services/apiHelper";
import { getGreeting } from "@/src/lib/utils";
import { Manager } from "@/src/lib/types";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const {data:managerData, isPending} = useReactQuery<Manager>(['manager'],'/managers/me');

  const [greetingStr, setGreetingStr] = useState(getGreeting);
  
  useEffect(()=>{
  const milSecondsUntilNextHour = () =>{
    const currMins = new Date().getMinutes()
    const currSeconds = new Date().getSeconds()
    const currMilSeconds = new Date().getMilliseconds()

    return ((60-currMins)*60*1000)-(currSeconds*1000)-currMilSeconds
  }

  const timeOut = setTimeout(()=>{
    setGreetingStr(getGreeting())

    const interval = setInterval(()=>{
      setGreetingStr(getGreeting())
    },60*60*1000)

    return ()=>clearInterval(interval)
  },milSecondsUntilNextHour())

  return ()=>clearTimeout(timeOut)
},[])

  const manager = managerData?.data.data

  return (
    <header className="flex bg-background justify-end items-center px-4 py-1.5 sticky top-0 z-10">
      <div className="border rounded-full flex gap-1 items-center bg-muted cursor-pointer">
        <Avatar>
          <AvatarImage src={"#"} alt="profile picture" />
          {isPending?<Loader size={LoaderSize.small} className="m-auto"/> : <AvatarFallback className="bg-secondary text-primary">{`${manager?.name.firstname.charAt(0)}${manager?.name.lastname.charAt(0)}`}</AvatarFallback>}
        </Avatar>
        <div className="space-y-0.5">
          <p className="text-xs text-primary font-medium">{greetingStr}</p>
          {isPending ? <Loader size={LoaderSize.small} className="mx-auto"/> : <p className="text-[.6rem] font-semibold text-secondary">{manager?.name.fullname}</p>}
        </div>
        <div className="flex w-8 aspect-square justify-center items-center">
          <ChevronDown size={16}/>
        </div>
      </div>
    </header>
  );
};

export default Header;
