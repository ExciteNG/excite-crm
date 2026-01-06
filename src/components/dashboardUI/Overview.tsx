// "use client";

import React from "react";
import DashCard from "./reusableComponents/DashCard";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiMiniUsers } from "react-icons/hi2";
import { MdGroupAdd } from "react-icons/md";
import {
  ChartBarDefault,
  ChartPieInteractive,
} from "./reusableComponents/Charts";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { tableContent } from "@/src/lib/contents";
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
// import { useReactQuery } from "@/src/services/apiHelper";

const Overview = () => {
  // const { data, isLoading, error } = useReactQuery(
  //   ["users"],
  //   "/user/excite-users"
  // );
  // console.log(data);

  return (
    <section className="space-y-7">
      <div className="grid grid-cols-3 gap-5 bg-slate-100/65 py-4">
        <DashCard
          Icon={HiMiniUserGroup}
          title={"total users"}
          matrix={123}
          iconBg="bg-[#EDF9FF]"
          iconColor="text-[#12A6F0]"
        />
        <DashCard
          Icon={HiMiniUsers}
          title={"active users"}
          matrix={40}
          iconBg="bg-[#E6FFF2]"
          iconColor="text-[#00AA4F]"
        />
        <DashCard
          Icon={MdGroupAdd}
          title={"leads"}
          matrix={50}
          iconBg="bg-[#FEF3F2]"
          iconColor="text-[#E7000B]"
        />
      </div>
      <article className="flex justify-between">
        <div className="w-3/5">
          <ChartBarDefault />
        </div>
        <div className="w-3/8">
          <ChartPieInteractive />
        </div>
      </article>
      <section className="h-fit px-5 border rounded-md shadow">
        <div className="p-8 divide-solid divide-[#EFEFF0] divide-y-2">
          <p className="text-slate-700 font-semibold ">Recent Leads</p>
          <div className="w-full flex flex-col items-end gap-1 mt-5">
            <Label className="w-[180px]">Filter by Status</Label>
            <Select>
              <SelectTrigger
                className="ml-auto h-7 w-[180px] rounded-lg pl-2.5"
                aria-label="Select a value"
              >
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-xl">
                {tableContent.map((status, key) => {
                  return (
                    <div key={key} className="capitalize">
                      <SelectItem value={status.status}>
                        {status.status}
                      </SelectItem>
                      {/* <SelectSeparator /> */}
                    </div>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="max-h-[500px] p-8 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#EFEFF0]/45">
                <TableHead className="text-center font-semibold text-[#4F4F4F">
                  Full Name
                </TableHead>
                <TableHead className="text-center text-[#4F4F4F">
                  Email
                </TableHead>
                <TableHead className="text-center text-[#4F4F4F">
                  Phone Number
                </TableHead>
                <TableHead className="text-center text-[#4F4F4F">
                  Location
                </TableHead>
                <TableHead className="text-center text-[#4F4F4F">
                  Source
                </TableHead>
                <TableHead className="text-center text-[#4F4F4F">
                  Registered Date
                </TableHead>
                <TableHead className="text-[#4F4F4F">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableContent.map((row, index) => {
                return (
                  <TableRow key={index} className="h-16">
                    <TableCell className="text-center">{row.name}</TableCell>
                    <TableCell className="text-center">{row.email}</TableCell>
                    <TableCell className="text-center">{row.phone}</TableCell>
                    <TableCell className="text-center">
                      {row.location}
                    </TableCell>
                    <TableCell className="text-center">{row.source}</TableCell>
                    <TableCell className="text-center">{row.date}</TableCell>
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
      <div className="flex justify-center items-center gap-2 mt-6">
        <button className="p-2 rounded-lg border">
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
        <button className="p-2 rounded-lg border">
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default Overview;
