import React, { useState } from "react";
import { MessageCircle, Users } from "lucide-react";
import { Lead } from "@/src/lib/types";
import { useReactQuery } from "@/src/services/apiHelper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { statusOptions, userManagementTableHeader } from "@/src/lib/contents";
import StatusBadge from "../dashboardUI/reusableComponents/StatusBadge";
import { Button } from "../ui/button";
import { UserStatus } from "./AllUsers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// const leads = [
//   {
//     name: "Jenny Wilson",
//     email: "john@church.com",
//     phone: "0819 012 3456",
//     location: "Yaba",
//     source: "Facebook",
//     lastLogin: "2 min ago",
//     status: "Follow-up",
//   },
//   {
//     name: "Eleanor Pena",
//     email: "john@church.com",
//     phone: "0901 123 4567",
//     location: "Mushin",
//     source: "Tiktok",
//     lastLogin: "1 hour ago",
//     status: "Messaged",
//   },
//   {
//     name: "Leslie Alexander",
//     email: "john@church.com",
//     phone: "0704 567 8901",
//     location: "Ajegunle",
//     source: "Youtube",
//     lastLogin: "2 hour ago",
//     status: "Called",
//   },
//   {
//     name: "Marvin McKinney",
//     email: "john@church.com",
//     phone: "0810 123 4567",
//     location: "Computer Village",
//     source: "Whatsapp",
//     lastLogin: "8 hour ago",
//     status: "Converted",
//   },
//   {
//     name: "Arlene McCoy",
//     email: "john@church.com",
//     phone: "0701 234 5678",
//     location: "Abule Egba",
//     source: "Online Event",
//     lastLogin: "1 day ago",
//     status: "Messaged",
//   },
//   {
//     name: "Albert Flores",
//     email: "john@church.com",
//     phone: "0817 890 1234",
//     location: "Eko Hotel",
//     source: "Others",
//     lastLogin: "30 days ago",
//     status: "Messaged",
//   },
// ];

const Leads = () => {
  const [status, setStatus] = useState<UserStatus | "all">("all");
  const { data: leadsData } = useReactQuery<Lead[]>(["leads"], "/leads");

  const leads = leadsData?.data.data;
  // console.log(leads);

  // filter users by status
  const filteredLeads = leads?.filter((lead) => {
    if (status.toLowerCase() === "all") return leads;
    else {
      return lead.status.toLowerCase() === status.toLowerCase();
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg">Leads</h2>
          <p className="text-sm text-muted-foreground">
            Registered leads and their status
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
          {filteredLeads?.map((lead, index) => {
            return (
              <TableRow key={index} className="">
                <TableCell className="flex items-center justify-start pl-10 gap-x-3">
                  <div className="bg-green-100 w-9 aspect-square rounded-full flex justify-center items-center">
                    <Users size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium capitalize">
                      {lead.name.fullname}
                    </p>
                    <p className="text-xs text-muted-foreground lowercase">
                      {lead.email}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="text-center w-32">
                  {lead.phoneNumber}
                </TableCell>
                <TableCell className="text-center capitalize w-32">
                  {lead.location.lga} {lead.location?.state}
                </TableCell>
                <TableCell className="text-center capitalize w-32">
                  {lead.source || "-"}
                </TableCell>
                <TableCell className="text-center w-32">
                  {lead.lastLogin || "-"}
                </TableCell>
                <TableCell className="text-center capitalize w-32">
                  <StatusBadge status={lead.status as UserStatus} />
                </TableCell>

                <TableCell className="text-center capitalize w-32">
                  <Button
                    variant={"outline"}
                    className="inline-flex border border-secondary items-center gap-2 focus:ring ring-secondary rounded-lg px-3 py-2 text-xs capitalize hover:bg-secondary hover:text-background cursor-pointer"
                  >
                    change status
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leads;

{
  /* Pagination */
}
{
  /* <div className="flex justify-center items-center gap-2 mt-6">
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
        </div> */
}
