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
import PaginationComponent from "../dashboardUI/reusableComponents/Pagination";

const userss = [
  {
    fullname: "Jenny Wilson",
    email: "john@church.com",
    phoneNumber: "0819 012 3456",
    location: { lga: "Yaba", state: "lagos" },
    source: "Facebook",
    lastLogin: "2 min ago",
    status: "Active",
  },
  {
    fullname: "Eleanor Pena",
    email: "john@church.com",
    phoneNumber: "0901 123 4567",
    location: { lga: "Mushin", state: "lagos" },
    source: "Tiktok",
    lastLogin: "1 hour ago",
    status: "Active",
  },
  {
    fullname: "Leslie Alexander",
    email: "john@church.com",
    phoneNumber: "0704 567 8901",
    location: { lga: "Ajegunle", state: "lagos" },
    source: "Youtube",
    lastLogin: "2 hour ago",
    status: "Active",
  },
  {
    fullname: "Marvin McKinney",
    email: "john@church.com",
    phoneNumber: "0810 123 4567",
    location: { lga: "Computer Village", state: "lagos" },
    source: "Whatsapp",
    lastLogin: "8 hour ago",
    status: "Active",
  },
  {
    fullname: "Arlene McCoy",
    email: "john@church.com",
    phoneNumber: "0701 234 5678",
    location: { lga: "Abule Egba", state: "lagos" },
    source: "Online Event",
    lastLogin: "1 day ago",
    status: "Active",
  },
  {
    fullname: "Albert Flores",
    email: "john@church.com",
    phoneNumber: "0817 890 1234",
    location: { lga: "Eko Hotel", state: "lagos" },
    source: "Others",
    lastLogin: "6 months",
    status: "Inactive",
  },
];

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

  // console.log(filteredUsers);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">All Users</h2>
          <p className="text-muted-foreground text-sm">
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
      <div className="space-y-5 divide-y-2 divide-solid">
        <Table>
          <TableHeader className="sticky top-0">
            <TableRow className="bg-muted/50">
              {userManagementTableHeader.map((header: string) => (
                <TableHead
                  key={header}
                  className="text-center text-[#4F4F4F] capitalize"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {filteredUsers?.map((user, index) => {
              return (
                <TableRow key={index} className="text-center">
                  <TableCell className="flex w-fit items-center gap-2.5">
                    <div className="bg-primary/10 border-primary w-fit rounded-full border p-2">
                      <UserIcon size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{user.fullname}</p>
                      <p className="font-light">{user.email}</p>
                    </div>
                  </TableCell>

                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    {user.location.lga} {user.location?.state}
                  </TableCell>
                  <TableCell>{user.source || "-"}</TableCell>
                  <TableCell>{user.lastLogin || "-"}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status as UserStatus} />
                  </TableCell>

                  <TableCell>
                    <Button
                      variant={"outline"}
                      className="border-secondary ring-secondary hover:bg-secondary hover:text-background inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs capitalize focus:ring"
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
        <PaginationComponent />
      </div>
    </div>
  );
};

export default AllUsers;
