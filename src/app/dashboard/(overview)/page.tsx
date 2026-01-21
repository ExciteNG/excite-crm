"use client";

import { HiMiniUserGroup } from "react-icons/hi2";
import { HiMiniUsers } from "react-icons/hi2";
import { MdGroupAdd } from "react-icons/md";

import { useReactQuery } from "@/src/services/apiHelper";
import { formatDate, formatNumber } from "@/src/lib/utils";
import { Lead, User } from "@/src/lib/types";
import { useState } from "react";
import DashCard from "@/src/components/dashboardUI/reusableComponents/DashCard";
import {
  ChartBar,
  ChartPie,
} from "@/src/components/dashboardUI/reusableComponents/Charts";
import { Label } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/src/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import StatusTag from "@/src/components/dashboardUI/reusableComponents/StatusTag";

const statusTitle = ["all", "messaged", "converted", "called", "follow-up"];

type Status = "all" | "messaged" | "converted" | "called" | "follow-up";

export default function OverviewPage() {
  const [status, setStatus] = useState<Status>("all");
  const { data: usersData } = useReactQuery<User[]>(
    ["users"],
    "/user/excite-users",
  );

  const { data: leadsData } = useReactQuery<Lead[]>(["leads"], "/leads");

  const users = usersData?.data.data;
  const leads = leadsData?.data.data;

  return (
    <section className="space-y-7 p-5">
      <section className="grid grid-cols-3 gap-5">
        <DashCard
          Icon={HiMiniUserGroup}
          title={"total users"}
          matrix={formatNumber(users?.length as number)}
          iconBg="bg-[#EDF9FF]"
          iconColor="text-[#12A6F0]"
        />
        <DashCard
          Icon={HiMiniUsers}
          title={"active users"}
          matrix={2}
          iconBg="bg-[#E6FFF2]"
          iconColor="text-[#00AA4F]"
        />
        <DashCard
          Icon={MdGroupAdd}
          title={"leads"}
          matrix={formatNumber(leads?.length as number)}
          iconBg="bg-[#FEF3F2]"
          iconColor="text-[#E7000B]"
        />
      </section>
      <section className="grid grid-cols-[1.5fr_1fr] gap-5">
        <ChartBar />
        <ChartPie leads={leads || undefined} />
      </section>
      <section className="bg-background divide-muted space-y-8 divide-y-2 divide-solid rounded-[12px] p-5">
        <h2 className="text-[1.13rem] font-semibold capitalize">
          recent leads
        </h2>
        <section className="place-items-end space-y-2">
          <h3 className="w-36 font-medium">Filter by status</h3>
          <Select value={status}>
            <SelectTrigger className="w-36" aria-label="Select a value">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {statusTitle.map((title, index) => {
                return (
                  <SelectItem value={title} key={index} className="capitalize">
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Table>
            <TableHeader className="sticky top-0">
              <TableRow className="bg-[#EFEFF0]/45">
                <TableHead className="text-[#4F4F4F text-center font-semibold">
                  Full Name
                </TableHead>
                <TableHead className="text-[#4F4F4F text-center">
                  Email
                </TableHead>
                <TableHead className="text-[#4F4F4F text-center">
                  Phone Number
                </TableHead>
                <TableHead className="text-[#4F4F4F text-center">
                  Location
                </TableHead>
                <TableHead className="text-[#4F4F4F text-center">
                  Source
                </TableHead>
                <TableHead className="text-[#4F4F4F text-center">
                  Registered Date
                </TableHead>
                <TableHead className="text-[#4F4F4F">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="h-full max-h-dvh overflow-scroll">
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
        </section>
      </section>
    </section>
  );
}
