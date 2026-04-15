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
// import StatusTag from "@/src/components/dashboardUI/reusableComponents/StatusTag";
import Chatbot from "@/src/components/dashboardLayout/ChatBot";
import Loader, { LoaderSize } from "@/src/components/dashboardUI/reusableComponents/Loader";
import Paginate from "@/src/components/dashboardUI/reusableComponents/Paginate";
import StatusTag from "@/src/components/dashboardUI/reusableComponents/StatusTag";


type Status = "all" | "messaged" | "converted" | "called" | "follow-up";

export default function OverviewPage() {
  const [status, setStatus] = useState<Status>("all");
  const [page, setPage] = useState(1);
  
  const query = new URLSearchParams({
    page: page.toString(),
    ...(status !== "all" && { status }),
  }).toString();

  const { data: leadsData, isLoading:isLoadingLeads } = useReactQuery<Lead[]>(["leads", page.toString(), status], `/leads?${query}`);

   const { data: usersData, isLoading:isLoadingUsers } = useReactQuery<User[]>(
    ["users"],
    "/user/excite-users",
  );
  
  const leads = leadsData?.data.data ?? [];
  
  const usersStat = usersData?.data.totalCount
  const leadsStat = leadsData?.data.totalCount

  const currentPage = leadsData?.data?.currentPage ?? 1;
  const totalPages = leadsData?.data?.totalPages ?? 1;

  const statusTitle = ["all", "messaged", "converted", "called", "follow-up"];
  const overviewTableHeader = ['full name', 'email', 'phone number', 'location', 'source', 'registered date', 'status']

  return (
    <section className="space-y-7 p-5">
      <section className="grid grid-cols-3 gap-5">
        <DashCard
          Icon={HiMiniUserGroup}
          title={"total users"}
          matrix={formatNumber(usersStat as number)}
          iconBg="bg-[#EDF9FF]"
          iconColor="text-[#12A6F0]"
          isLoading={isLoadingUsers}
        />
        <DashCard
          Icon={HiMiniUsers}
          title={"active users"}
          matrix={1}
          iconBg="bg-[#E6FFF2]"
          iconColor="text-[#00AA4F]"
          isLoading={isLoadingUsers}
        />
        <DashCard
          Icon={MdGroupAdd}
          title={"leads"}
          matrix={formatNumber(leadsStat as number)}
          iconBg="bg-[#FEF3F2]"
          iconColor="text-[#E7000B]"
          isLoading={isLoadingLeads}
        />
      </section>
      <section className="grid grid-cols-[1.5fr_1fr] gap-5">
        <ChartBar />
        <ChartPie leads={leads as Lead[]} isLoading={isLoadingLeads}/>
      </section>
      <section className="divide-muted space-y-8 divide-y-2 divide-solid rounded-[12px] p-5">
        <h2 className="text-[1.13rem] font-semibold capitalize">
          recent leads
        </h2>
        <section className="place-items-end space-y-2">
          <h3 className="w-36 font-medium">Filter by status</h3>
          <Select value={status} onValueChange={(value) => setStatus(value as Status)}>
            <SelectTrigger className="w-36" aria-label="Select a value">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {statusTitle.map((title, index) => {
                return (
                  <SelectItem value={title} key={index} className="hover:bg-primary hover:text-white focus:bg-primary focus:outline-none data-highlighted:text-white data-highlighted:bg-primary/50">
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Table>
            <TableHeader className="sticky top-0">
              <TableRow className="bg-primary">
              {overviewTableHeader.map((header,index)=><TableHead key={index} className="text-primary-foreground text-center font-semibold capitalize">
                  {header}
                </TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody className="h-full divide-y-2 divide-primary/30 max-h-[50vh] overflow-scroll">
              {isLoadingLeads && (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Loader size={LoaderSize.normal}/>
                      <p className="text-primary">Fetching recent leads...</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {!isLoadingLeads&&leads?.map((lead, index) => {
                return (
                  <TableRow key={index} className="h-16 text-secondary">
                    <TableCell className="text-center">
                      {lead.name.fullname}
                    </TableCell>
                    <TableCell className="text-center lowercase">
                      {lead.email}
                    </TableCell>
                    <TableCell className="text-center">
                      {lead.phoneNumber}
                    </TableCell>
                    <TableCell className="text-center">
                      {`${lead.location.city}, ${lead.location.state}`}
                    </TableCell>
                    <TableCell className="text-center capitalize">
                      {lead.source}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatDate(lead.createdAt)}
                    </TableCell>
                    <TableCell className="text-center capitalize">
                      {/* <StatusTag status={lead.status}/> */}
                      {lead.status}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>
      </section>
      <Chatbot/>
      {!isLoadingLeads && leads.length!==0 && (
        <Paginate currPage={currentPage} totalPages={totalPages} setPage={setPage}/>
      )}
    </section>
  );
}
