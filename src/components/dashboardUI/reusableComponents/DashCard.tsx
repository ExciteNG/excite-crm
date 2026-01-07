import React from "react";
import { IconType } from "react-icons";

type DashProps = {
  Icon: IconType;
  title: string;
  matrix: number;
  iconBg?: string;
  iconColor?: string;
};
const DashCard = ({ Icon, title, matrix, iconBg, iconColor }: DashProps) => {
  return (
    <div className="w-full border h-full p-4 px-5 space-y-2 rounded-md shadow border-slate-100 bg-white">
      <div className={`w-fit p-1.5 h-auto rounded-full ${iconBg}`}>
        <Icon size={18} className={`${iconColor}`} />
      </div>
      <p className="text-sm text-slate-600 capitalize">{title}</p>
      <p className="text-2xl font-bold">{matrix}</p>
    </div>
  );
};

export default DashCard;
