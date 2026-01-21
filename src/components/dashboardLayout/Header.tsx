import React from "react";
import { FaAngleDown } from "react-icons/fa";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";

const Header = () => {
  return (
    <header className="flex bg-background justify-end items-center px-4 py-1.5 sticky top-0 z-10">
      <div className=" rounded-full flex gap-1 items-center bg-muted cursor-pointer">
        <Avatar>
          <AvatarImage src={"#"} alt="profile picture" />
          <AvatarFallback className="bg-stone-400">OI</AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <p className="text-[9px]">Good Afternoon</p>
          <p className="text-[11px] font-semibold">Oluwayelu Ifeoluwa</p>
        </div>
        <div className="flex w-5 aspect-square justify-center items-center">
          <FaAngleDown size={10} />
        </div>
      </div>
    </header>
  );
};

export default Header;
