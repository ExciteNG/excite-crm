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

const Overview = () => {
  return (
    <section className="space-y-7">
      <div className="grid grid-cols-3 gap-5 sticky top-0 z-20 bg-slate-100/65 py-4">
        <DashCard
          Icon={HiMiniUserGroup}
          title={"Total User's"}
          matrix={123}
          iconBg="bg-[#EDF9FF]"
          iconColor="text-[#12A6F0]"
        />
        <DashCard
          Icon={HiMiniUsers}
          title={"Active User's"}
          matrix={40}
          iconBg="bg-[#E6FFF2]"
          iconColor="text-[#00AA4F]"
        />
        <DashCard
          Icon={MdGroupAdd}
          title={"Leads"}
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
      <section className="h-fit bg-white border rounded-md shadow">
        <div className="p-5">
          <p className="text-slate-700 font-semibold ">Recent Leads</p>
          <hr className="py-1" />
          <div className="w-full flex flex-col items-end gap-1">
            <Label className="w-[180px]"> Filter by Status</Label>
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
                    <div key={key}>
                      <SelectItem
                        value={status.status}
                        className="rounded-lg [&_span]:flex"
                      >
                        <div className="flex items-center gap-2 text-xs">
                          {status.status}
                        </div>
                      </SelectItem>
                      {/* <SelectSeparator /> */}
                    </div>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="max-h-[500px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Full Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Phone Number</TableHead>
                <TableHead className="text-center">Location</TableHead>
                <TableHead className="text-center">Source</TableHead>
                <TableHead className="text-center">Registered Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableContent.map((row, index) => {
                return (
                  <TableRow key={index} className="text-center h-16">
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.source}</TableCell>
                    <TableCell>{row.date}</TableCell>
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
    </section>
  );
};

export default Overview;
