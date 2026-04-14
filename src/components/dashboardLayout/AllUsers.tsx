import { User } from "@/src/lib/types";
import { useReactQuery } from "@/src/services/apiHelper";
import { MessageCircle, User as UserIcon } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import StatusBadge from "../dashboardUI/reusableComponents/StatusBadge";
import { Label } from "@/src/components/ui/label";

// const users = [
//   {
//     fullname: "Jenny Wilson",
//     email: "john@church.com",
//     phoneNumber: "0819 012 3456",
//     location: { lga: "Yaba", state: "lagos" },
//     source: "Facebook",
//     lastLogin: "2 min ago",
//     status: "Active",
//   },
//   {
//     fullname: "Eleanor Pena",
//     email: "john@church.com",
//     phoneNumber: "0901 123 4567",
//     location: { lga: "Mushin", state: "lagos" },
//     source: "Tiktok",
//     lastLogin: "1 hour ago",
//     status: "Active",
//   },
//   {
//     fullname: "Leslie Alexander",
//     email: "john@church.com",
//     phoneNumber: "0704 567 8901",
//     location: { lga: "Ajegunle", state: "lagos" },
//     source: "Youtube",
//     lastLogin: "2 hour ago",
//     status: "Active",
//   },
//   {
//     fullname: "Marvin McKinney",
//     email: "john@church.com",
//     phoneNumber: "0810 123 4567",
//     location: { lga: "Computer Village", state: "lagos" },
//     source: "Whatsapp",
//     lastLogin: "8 hour ago",
//     status: "Active",
//   },
//   {
//     fullname: "Arlene McCoy",
//     email: "john@church.com",
//     phoneNumber: "0701 234 5678",
//     location: { lga: "Abule Egba", state: "lagos" },
//     source: "Online Event",
//     lastLogin: "1 day ago",
//     status: "Active",
//   },
//   {
//     fullname: "Albert Flores",
//     email: "john@church.com",
//     phoneNumber: "0817 890 1234",
//     location: { lga: "Eko Hotel", state: "lagos" },
//     source: "Others",
//     lastLogin: "6 months",
//     status: "Inactive",
//   },
// ];

export type UserStatus = "dormant" | "pending" | "active";

const AllUsers = () => {
  const [status, setStatus] = useState<UserStatus | "all">("all");

  const { data: usersData } = useReactQuery<User[]>(
    ["users"],
    "/user/excite-users",
  );

  const users = usersData?.data.data;
  // console.log(status);
  console.log(users);

  // filter users by status
  const filteredUsers = users?.filter((user) => {
    if (status.toLowerCase() === "all") return users;
    else {
      return user.status.toLowerCase() === status.toLowerCase();
    }
  });

  console.log(filteredUsers);

  return (
    <>
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
                <SelectItem value={status} key={index} className="capitalize">
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
                  className={`sticky top-0 z-10 bg-secondary capitalize ${header.toLowerCase()==='user'?'text-left px-10':'text-center'} text-primary font-semibold`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y-2 divide-primary">
            {filteredUsers?.map((user) => (
              <TableRow
                key={user.id}
              >
                <TableCell className="px-2.5 flex items-center gap-2.5">
                  <div className="bg-primary/50 w-fit rounded-full p-2">
                    <UserIcon size={16} className="text-green-600" />
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
                    variant="outline"
                    className="border-secondary ring-secondary hover:bg-secondary hover:text-background rounded-md border px-3 py-2 text-xs capitalize"
                  >
                    message user
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
      {/* <div className="w-full bg-secondary h-10"></div> */}
    </>
  )}

export default AllUsers;
