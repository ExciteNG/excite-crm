import React, { useState } from "react";
import { ArrowRightLeft, UserIcon } from "lucide-react";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "@/src/components/ui/label";
import Loader, { LoaderSize } from "@/src/components/dashboardUI/reusableComponents/Loader";
import Paginate from "@/src/components/dashboardUI/reusableComponents/Paginate";

const Leads = () => {
  const [status, setStatus] = useState<UserStatus | "all">("all");
  const [page, setPage] = useState(1);

  const query = new URLSearchParams({
    page: page.toString(),
    ...(status !== "all" && { status }),
  }).toString();

  const { data: leadsData,isLoading } = useReactQuery<Lead[]>(["leads", page.toString(), status], `/leads?${query}`);

  console.log(leadsData)

  const leads = leadsData?.data.data ?? [];
  
  const currentPage = leadsData?.data?.currentPage ?? 1;
  const totalPages = leadsData?.data?.totalPages ?? 1;

  return (
  <>
    <div className="rounded-sm bg-background p-6 shadow-sm">
      <div className="flex justify-between w-full ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col w-full">
            <h2 className="text-lg font-semibold">Leads</h2>
            <p className="text-muted-foreground text-sm font-light">
              Registered leads and activity status
            </p>
          </div>
        </div>

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
      <div className="h-[45vh] overflow-y-auto relative">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {userManagementTableHeader.map((header: string) => (
                <TableHead key={header} className={`sticky top-0 z-10 bg-primary capitalize ${header.toLowerCase()==='user'?'text-left px-10':'text-center'} text-primary-foreground font-semibold`}>{header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-secondary/15">
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="h-96 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Loader size={LoaderSize.normal}/>
                    <p className="text-primary">fetching Leads...</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {leads?.map((lead) => (
              <TableRow
                key={lead.id}
              >
                <TableCell className="px-2.5 flex items-center gap-2.5">
                   <div className="bg-primary/10 w-fit rounded-full p-2">
                    <UserIcon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-left">{lead.name.fullname}</p>
                    <p className="font-light">{lead.email}</p>
                  </div>
                </TableCell>

                <TableCell className="text-center capitalize">{lead.phoneNumber}</TableCell>
                <TableCell className="text-center capitalize">
                  {`${lead.location.city}, ${lead.location?.state}`}
                </TableCell>
                <TableCell className="text-center capitalize">{lead.source || "-"}</TableCell>
                <TableCell className="text-center capitalize">{lead.lastLogin || "-"}</TableCell>

                <TableCell className="text-center capitalize">
                  <StatusBadge status={lead.status as UserStatus} />
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    className="text-stone-500 cursor-pointer"
                  >
                    <ArrowRightLeft/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
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

export default Leads;
