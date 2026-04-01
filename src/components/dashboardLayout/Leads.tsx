import React, { useState } from "react";
import { MessageCircle, UserIcon, Users } from "lucide-react";
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
import { Label } from "@/src/components/ui/label";

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
  console.log(leads);

  // filter users by status
  const filteredLeads = leads?.filter((lead) => {
    if (status.toLowerCase() === "all") return leads;
    else {
      return lead.status.toLowerCase() === status.toLowerCase();
    }
  });

  return (
  <>
    <div className="rounded-sm bg-background p-6 shadow-sm">
      <div className="flex justify-between w-full ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col w-full">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-muted-foreground text-sm font-light">
              Registered leads and activity status
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
                  className="sticky top-0 z-10 bg-secondary capitalize text-center text-primary-foreground"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-secondary/15">
            {filteredLeads?.map((lead) => (
              <TableRow
                key={lead.id}
              >
                <TableCell className="px-2.5 flex items-center gap-2.5">
                  <div className="bg-primary/50 w-fit rounded-full p-2">
                    <UserIcon size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-left">{lead.name.fullname}</p>
                    <p className="font-light">{lead.email}</p>
                  </div>
                </TableCell>

                <TableCell className="text-center capitalize">{lead.phoneNumber}</TableCell>
                <TableCell className="text-center capitalize">
                  {lead.location.city}, {lead.location?.state}
                </TableCell>
                <TableCell className="text-center capitalize">{lead.source || "-"}</TableCell>
                <TableCell className="text-center capitalize">{lead.lastLogin || "-"}</TableCell>

                <TableCell className="text-center capitalize">
                  <StatusBadge status={lead.status as UserStatus} />
                </TableCell>

                <TableCell className="text-center capitalize">
                  <Button
                    variant="outline"
                    className="border-secondary ring-secondary hover:bg-secondary hover:text-background inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs capitalize"
                  >
                    <MessageCircle size={16} />
                    Message user
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
  );
};

export default Leads;
