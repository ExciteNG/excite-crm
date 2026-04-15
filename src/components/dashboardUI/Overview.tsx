/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { ChangeEvent, MouseEvent, useState } from "react";
import DashCard from "./reusableComponents/DashCard";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiMiniUsers } from "react-icons/hi2";
import { MdGroupAdd } from "react-icons/md";
import {
  ChartBar,
  ChartPie,
} from "./reusableComponents/Charts";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
// import { tableContent } from "@/src/lib/contents";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Label } from "../ui/label";
import StatusTag from "./reusableComponents/StatusTag";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReactQuery } from "@/src/services/apiHelper";
import { formatDate, formatNumber } from "@/src/lib/utils";
import { Lead, User } from "@/src/lib/types";

const statusTitle = ["all", "messaged", "converted", "called", "follow-up"];

type Status = "all" | "messaged" | "converted" | "called" | "follow-up";

const Overview = () => {
  const [status, setStatus] = useState<Status>("all");
  const { data: usersData, isLoading:isLoadingUsers } = useReactQuery<User[]>(
    ["users"],
    "/user/excite-users",
  );

  const { data: leadsData, isLoading:isLoadingLeads } = useReactQuery<Lead[]>(["leads"], "/leads");

  const users = usersData?.data.data;
  const leads = leadsData?.data.data;

  return (
    <section className="space-y-7">
      <div className="grid grid-cols-3 gap-5 bg-slate-100/65 py-4">
        <DashCard
          Icon={HiMiniUserGroup}
          title={"total users"}
          matrix={formatNumber(users?.length as number)}
          iconBg="bg-[#EDF9FF]"
          iconColor="text-[#12A6F0]"
          isLoading={isLoadingUsers}
        />
        <DashCard
          Icon={HiMiniUsers}
          title={"active users"}
          matrix={2}
          iconBg="bg-[#E6FFF2]"
          iconColor="text-[#00AA4F]"
          isLoading={isLoadingUsers}
        />
        <DashCard
          Icon={MdGroupAdd}
          title={"leads"}
          matrix={formatNumber(leads?.length as number)}
          iconBg="bg-[#FEF3F2]"
          iconColor="text-[#E7000B]"
          isLoading={isLoadingLeads}
        />
      </div>
      <article className="flex justify-between">
        <div className="w-3/5">
          <ChartBar />
        </div>
        <div className="w-3/8">
          <ChartPie leads={leads as Lead[]} isLoading={isLoadingLeads} />
        </div>
      </article>
      <section className="h-fit p-5 border rounded-md shadow bg-white">
        <div className="divide-solid divide-[#EFEFF0] divide-y-2">
          <p className="text-slate-700 font-semibold ">Recent Leads</p>
          <div className="w-full flex flex-col items-end gap-1 my-2.5">
            <Label className="w-[180px]">Filter by Status</Label>
            <Select value={status}>
              <SelectTrigger
                className="ml-auto h-7 w-[180px] rounded-lg pl-2.5"
                aria-label="Select a value"
              >
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {statusTitle.map((title, index) => {
                  return (
                    <SelectItem
                      value={title}
                      key={index}
                      className="capitalize"
                    >
                      {title.charAt(0).toUpperCase() + title.slice(1)}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="max-h-[500px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#EFEFF0]/45">
                <TableHead className="text-center font-semibold text-[#4F4F4F]">
                  Full Name
                </TableHead>
                <TableHead className="text-center text-[#4F4F4F]">
                  Email
                </TableHead>
                <TableHead className="text-center text-[#4F4F4F]">
                  Phone Number
                </TableHead>
                <TableHead className="text-center text-[#4F4F4F]">
                  Location
                </TableHead>
                <TableHead className="text-center text-[#4F4F4F]">
                  Source
                </TableHead>
                <TableHead className="text-center text-[#4F4F4F]">
                  Registered Date
                </TableHead>
                <TableHead className="text-[#4F4F4F]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads?.map((row, index) => {
                return (
                  <TableRow key={index} className="h-16">
                    <TableCell className="text-center">
                      {row.name.fullname}
                    </TableCell>
                    <TableCell className="text-center lowercase">
                      {row.email}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.location.city} {row.location.state}
                    </TableCell>
                    <TableCell className="text-center capitalize">
                      {row.source}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatDate(row.createdAt)}
                    </TableCell>
                    <TableCell>
                      <StatusTag status={row.status} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* pagination */}
      {/* <div className='flex justify-center items-center gap-2 mt-6'>
        <button className='p-2 rounded-lg border'>
          <ChevronLeft size={16} />
        </button>
        {[1, 2].map((page) => (
          <button
            key={page}
            className={`w-9 h-9 rounded-lg text-sm font-medium ${
              page === 1 ? "bg-yellow-400 text-black" : "border hover:bg-muted"
            }`}
          >
            {page}
          </button>
        ))}
        <button className='p-2 rounded-lg border'>
          <ChevronRight size={16} />
        </button>
      </div> */}
    </section>
  );
};

export default Overview;
