import { Badge } from "../../ui/badge";
import { UserStatus } from "../../dashboardLayout/AllUsers";

export default function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <Badge
      variant={`${
        status.toLowerCase() === "active"
          ? "default"
          : status.toLowerCase() === "pending"
            ? "pending"
            : "destructive"
      }`}
      className={`px-3 py-1.5 rounded-full w-fit text-xs font-medium  `}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </Badge>
  );
}

/* 


${
        user.status.toLowerCase() === "active"
          ? "bg-green-100 text-green-700"
          : user.status.toLowerCase() === "pending"
          ? "bg-[#d19e13]/25 text-[#d19e13]"
          : "bg-destructive/10 text-destructive"
      }
*/
