import { LuLayers } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
// import { IoSettingsOutline } from "react-icons/io5";


const sidePortals = [
  {
    tabName: "Overview",
    link: "/dashboard",
    icon: LuLayers,
  },
  {
    tabName: "User Management",
    link: "/dashboard/user-management",
    icon: FaUserGroup,
  },
  {
    tabName: "Newsletter",
    link: "/dashboard/newsletter",
    icon: IoMailSharp,
  },
  // {
  //   tabName: "Settings",
  //   link: "/dashboard/setting",
  //   icon: IoSettingsOutline,
  // },
];

export default sidePortals;