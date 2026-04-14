import Loader, { LoaderSize } from "@/src/components/dashboardUI/reusableComponents/Loader";
import React from "react";
import { IconType } from "react-icons";

type DashProps = {
  Icon: IconType;
  title: string;
  matrix: number | string;
  iconBg?: string;
  iconColor?: string;
  isLoading?:boolean
};
const DashCard = ({ Icon, title, matrix, iconBg, iconColor, isLoading }: DashProps) => {
  return (
    <div className="w-full border h-full p-4 px-5 space-y-2 rounded-md shadow border-slate-100 bg-white">
      <div className={`w-fit p-1.5 h-auto rounded-full ${iconBg}`}>
        <Icon size={18} className={`${iconColor}`} />
      </div>
      <p className="text-sm text-slate-500 capitalize">{title}</p>
      {isLoading?<Loader size={LoaderSize.small}/>:<p className="text-xl font-bold text-secondary">{matrix}</p>}
    </div>
  );
};

export default DashCard;
