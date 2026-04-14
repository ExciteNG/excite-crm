'use client'

import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import { getGreeting } from "@/src/lib/utils";
import { ChevronDown } from "lucide-react";


const Header = () => {
  const [greetingStr, setGreetingStr] = useState(getGreeting)
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

  return (
    <header className="flex bg-background justify-end items-center px-4 py-1.5 sticky top-0 z-10">
      <div className=" rounded-full flex gap-1 items-center bg-muted cursor-pointer">
        <Avatar>
          <AvatarImage src={"#"} alt="profile picture" />
          <AvatarFallback className="bg-secondary text-primary">OI</AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <p className="text-xs text-slate-800 font-extralight">{greetingStr}</p>
          <p className="text-[.6rem] font-semibold text-secondary">Oluwayelu Ifeoluwa</p>
        </div>
        <div className="flex w-8 aspect-square justify-center items-center">
          <ChevronDown size={16}/>
        </div>
      </div>
    </header>
  );
};

export default Header;
