"use client";

import React, { useState } from "react";
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

import { statusOptions, userManagementTableHeader } from "@/src/lib/contents";

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
import Loader, {
  LoaderSize,
} from "@/src/components/dashboardUI/reusableComponents/Loader";
import MessageDialog from "./MessageDialog";
import Paginate from "@/src/components/dashboardUI/reusableComponents/Paginate";

export type UserStatus = "dormant" | "pending" | "active";

const AllUsers = () => {
  const [status, setStatus] = useState<UserStatus | "all">("all");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);

  const query = new URLSearchParams({
    page: page.toString(),
    ...(status !== "all" && { status }),
  }).toString();

  const { data: usersData, isLoading} = useReactQuery<User[]>(
    ["users", page.toString(), status],
    `/user/excite-users?${query}`
  );

const users = usersData?.data?.data ?? [];

const currentPage = usersData?.data?.currentPage ?? 1;
const totalPages = usersData?.data?.totalPages ?? 1;

  return (
    <>
      <div className="rounded-sm bg-background p-6 shadow-sm">
        {/* Header */}
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-muted-foreground text-sm font-light">
              Registered users and activity status
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-col items-end gap-1 my-2.5">
            <Label className="w-[180px]">Filter by Status</Label>
            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value as UserStatus | "all");
                setPage(1);
              }}
            >
              <SelectTrigger className="ml-auto h-7 w-[180px] rounded-lg pl-2.5">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>

              <SelectContent className="rounded-xl">
                {statusOptions.map((status, index) => (
                  <SelectItem
                    key={index}
                    value={status}
                    className="hover:bg-primary hover:text-white data-highlighted:text-white data-highlighted:bg-primary/50"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <Table containerClassName="h-[45vh] overflow-y-auto">
          <TableHeader className="sticky top-0 z-50 bg-primary">
            <TableRow>
              {userManagementTableHeader.map((header: string) => (
                <TableHead
                  key={header}
                  className={`sticky top-0 z-10 ${
                    header.toLowerCase() === "user"
                      ? "text-left pl-12"
                      : "text-center"
                  }   bg-primary
                      text-primary-foreground
                      font-semibold
                      capitalize`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y-2 divide-primary/30">
            {/* Loading */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Loader size={LoaderSize.normal} />
                    <p className="text-primary">Fetching users...</p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Empty State */}
            {!isLoading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  No users found
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {!isLoading &&
              users.length > 0 &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-2.5 flex items-center gap-2.5">
                    <div className="bg-primary/10 w-fit rounded-full p-2">
                      <UserIcon size={16} className="text-primary" />
                    </div>

                    <div>
                      <p className="font-normal text-left capitalize text-secondary">
                        {user.fullname}
                      </p>
                      <p className="font-light">{user.email}</p>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    {user.phoneNumber}
                  </TableCell>

                  <TableCell className="text-center">
                    {`${user.location?.lga}, ${user.location?.state}`}
                  </TableCell>

                  <TableCell className="text-center">
                    {user.source || "-"}
                  </TableCell>

                  <TableCell className="text-center">
                    {user.lastLogin || "-"}
                  </TableCell>

                  <TableCell className="text-center">
                    <StatusBadge status={user.status as UserStatus} />
                  </TableCell>

                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      className="text-stone-500 cursor-pointer"
                      onClick={()=> {
                        setSelectedUser(user);
                        setShowDialog(true);
                      }}
                    >
                      <Send />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
       
      </div>
      {selectedUser && <MessageDialog isOpen={showDialog} onOpenChange={setShowDialog} user={selectedUser}/>}
      
      {/* Pagination */}
      {!isLoading && (
        <Paginate
          currPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default AllUsers;