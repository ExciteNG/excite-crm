import { User } from "@/src/lib/types";
import { useReactQuery } from "@/src/services/apiHelper";
import { MessageCircle, Users } from "lucide-react";
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
import StatusTag from "../dashboardUI/reusableComponents/StatusTag";
import StatusBadge from "../dashboardUI/reusableComponents/StatusBadge";

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
    "/user/excite-users"
  );

  const users = usersData?.data.data;
  // console.log(status);

  // filter users by status
  const filteredUsers = users?.filter((user) => {
    if (status.toLowerCase() === "all") return users;
    else {
      return user.status.toLowerCase() === status.toLowerCase();
    }
  });

  // console.log(filteredUsers);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg">All Users</h2>
          <p className="text-sm text-muted-foreground">
            Registered users and their activity status
          </p>
        </div>

        <Select
          value={status}
          onValueChange={(value) => setStatus(value as UserStatus | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status.charAt(0).toUpperCase() +
                    status.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {userManagementTableHeader.map((header: string) => (
                <TableHead
                  key={header}
                  className="capitalize text-center text-[#4F4F4F]"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user, index) => {
              return (
                <TableRow key={index} className="">
                  <TableCell className="flex items-center justify-start pl-10 gap-x-3">
                    <div className="bg-green-100 w-9 aspect-square rounded-full flex justify-center items-center">
                      <Users size={16} className="text-green-600" />
                    </div>
                    <div className="">
                      <p className="font-medium capitalize">{user.fullname}</p>
                      <p className="text-xs text-muted-foreground lowercase">
                        {user.email}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-center w-32">
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell className="text-center capitalize w-32">
                    {user.location.lga} {user.location?.state}
                  </TableCell>
                  <TableCell className="text-center capitalize w-32">
                    {user.source || "-"}
                  </TableCell>
                  <TableCell className="text-center w-32">
                    {user.lastLogin || "-"}
                  </TableCell>
                  <TableCell className="text-center capitalize w-32">
                    <StatusBadge status={user.status as UserStatus} />
                  </TableCell>

                  <TableCell className="text-center capitalize w-32">
                    <Button
                      variant={"outline"}
                      className="inline-flex border border-secondary items-center gap-2 focus:ring ring-secondary rounded-lg px-3 py-2 text-xs capitalize hover:bg-secondary hover:text-background cursor-pointer"
                    >
                      <MessageCircle size={16} />
                      <span className="text-xs capitalize">Message user</span>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-center items-center gap-2 mt-6">
          <button className="p-2 rounded-lg border">
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-9 h-9 rounded-lg text-sm font-medium ${
                page === 1
                  ? "bg-yellow-400 text-black"
                  : "border hover:bg-muted"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="p-2 rounded-lg border">
            <ChevronRight size={16} />
          </button>
        </div> */}
    </div>
  );
};

export default AllUsers;

{
  /* <TableHead className="text-center text-[#4F4F4F">
                phone number
              </TableHead>
              <TableHead className="text-center text-[#4F4F4F">
                location
              </TableHead>
              <TableHead className="text-center text-[#4F4F4F">
                source
              </TableHead>
              <TableHead className="text-center text-[#4F4F4F">
                last login
              </TableHead>
              <TableHead className="text-center text-[#4F4F4F">
                status
              </TableHead>
              <TableHead className="text-[#4F4F4F">actions</TableHead> */
}
