import React, { ChangeEvent, useState } from "react";
import { User } from "@/src/lib/types";
import { useReactQuery } from "@/src/services/apiHelper";
import { Send, User as UserIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
// import { formatDate } from "@/src/lib/utils";
import { statusOptions, userManagementTableHeader } from "@/src/lib/contents";
// import StatusTag from "../dashboardUI/reusableComponents/StatusTag";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import StatusBadge from "../dashboardUI/reusableComponents/StatusBadge";
import { Label } from "@/src/components/ui/label";
import Loader, { LoaderSize } from "@/src/components/dashboardUI/reusableComponents/Loader";


export type UserStatus = "dormant" | "pending" | "active";

const AllUsers = () => {
  const [status, setStatus] = useState<UserStatus | "all">("all");

  const { data: usersData, isLoading } = useReactQuery<User[]>(
    ["users"],
    "/user/excite-users",
  );

  const users = usersData?.data.data;
  // console.log(status);
  console.log(users);

  // filter users by status
  const filteredUsers = users?.filter((user) => {
    if (status.toLowerCase() === "all") return true;
    else {
      return user.status === status;
    }
  });

  console.log(filteredUsers);

  return (
    <div className="rounded-sm bg-background p-6 shadow-sm">
       <div className="flex justify-between w-full ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col w-full">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-muted-foreground text-sm font-light">
              Registered users and activity status
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 my-2.5">
          <Label className="w-[180px]">Filter by Status</Label>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as UserStatus | "all")}
          >
            <SelectTrigger
              className="ml-auto h-7 w-[180px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {statusOptions.map((status, index) => (
                <SelectItem value={status} key={index} className="hover:bg-primary hover:text-white focus:bg-primary focus:outline-none data-highlighted:text-white data-highlighted:bg-primary/50">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="max-h-[300px] h-full overflow-y-auto relative">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {userManagementTableHeader.map((header: string) => (
                <TableHead
                  key={header}
                  className={`sticky top-0 z-10 bg-primary capitalize ${header.toLowerCase()==='user'?'text-left pl-16':'text-center'} text-primary-foreground font-semibold`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y-2 divide-primary/30">
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="h-96 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Loader size={LoaderSize.normal}/>
                    <p className="text-primary">fetching Users...</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isLoading && filteredUsers?.length!==0 && filteredUsers?.map((user) => (
              <TableRow
                key={user.id}
              >
                <TableCell className="px-2.5 flex items-center gap-2.5">
                  <div className="bg-primary/10 w-fit rounded-full p-2">
                    <UserIcon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-left">{user.fullname}</p>
                    <p className="font-light">{user.email}</p>
                  </div>
                </TableCell>

                <TableCell className="text-center">{user.phoneNumber}</TableCell>
                <TableCell className="text-center">
                  {`${user.location.lga}, ${user.location?.state}`}
                </TableCell>
                <TableCell className="text-center">{user.source || "-"}</TableCell>
                <TableCell className="text-center">{user.lastLogin || "-"}</TableCell>

                <TableCell className="text-center">
                  <StatusBadge status={user.status as UserStatus} />
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    className="text-stone-500 cursor-pointer"
                  >
                  <Send/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )}

export default AllUsers;
