import React from "react";
import { FaAngleDown } from "react-icons/fa";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";

const Header = () => {
  return (
    <div className="h-full flex justify-end items-center px-4">
      <div className="w-fit flex items-center gap-2 bg-slate-100 rounded-full pr-4 cursor-pointer">
        <Avatar className="w-8 h-8 ">
          <AvatarImage src={"#"} alt="profile" />
          <AvatarFallback className="bg-stone-400">OB</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-[9px]">Good Afternoon</p>
          <p className="text-[11px] font-semibold">Olasubomi Byron</p>
        </div>
        <FaAngleDown size={10} className="ml-3 font-thin" />
      </div>
    </div>
  );
};

export default Header;
