"use client";

import React, {
  useState,
  ChangeEvent,
  // ChangeEventHandler,
  // MouseEventHandler,
} from "react";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {  Query, User } from "@/src/lib/types";
import { locations, subscriptionPlans } from "@/src/lib/utils";
import {  statusOptions } from "@/src/lib/contents";
import { useReactQuery } from "@/src/services/apiHelper";
// import { Button } from "@/src/components/ui/button";
import Loader, { LoaderSize } from "@/src/components/dashboardUI/reusableComponents/Loader";
import { Input } from "@/src/components/ui/input";
// import { toast } from "sonner";
// import {  RefreshCcw } from "lucide-react";

type Props = {
  selectedEmails: string[];
  setSelectedEmails: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function FetchEmailsSideBar({
  setSelectedEmails,
  selectedEmails,
}: Props) {
  // const [usersData, setUsersData] = useState<OverviewData[] | null>(null);
  const [searchString, setSearchString] = useState("");
  // const [open, setOpen] = useState(false);
  // const [submitting, setSubmitting] = useState(false);
  // const [form, setForm] = useState({
  //   email: "",
  //   provider: "",
  //   platform: "",
  //   sector: "",
  //   subSector: "",
  //   userType: "",
  // });
  const [queryParams, setQueryParams] = useState<Query>({
    status: undefined,
    location: undefined,
    subscriptionPlan: undefined,
  });

const { data,isLoading } = useReactQuery<User[]>(['users'], '/user/excite-users-email');

const users = data?.data.data;

// filter users by search
 let filteredUsers = users?.map((user) => (user.email.startsWith(searchString) ? user : null)).filter((user) => user !== null);

 // filter users by status
 if (queryParams.status) {
    console.log(queryParams)
    filteredUsers = filteredUsers?.filter(
      (user) => user.status.toLowerCase() === queryParams.status?.toLowerCase()
    );
  }

  // filter users by location
  if(queryParams.location) {
    filteredUsers = filteredUsers?.filter(
      (user) => user.location.state.toLowerCase() === queryParams.location?.toLowerCase()
    );
  }

  // filter users by subscription plan
  if(queryParams.subscriptionPlan) {
    filteredUsers = filteredUsers?.filter(
      (user) => user.subscriptionPlan.toLowerCase() === queryParams.subscriptionPlan?.toLowerCase()
    );
  }

  const handleEmailSelection = (
    value: boolean | string,
    email: string
  ) => {
    if (value || value === "true")
      setSelectedEmails((prev) => [...prev, email]);

    if (!value || value === "false")
      setSelectedEmails((prev) =>
        prev.filter((item) => item !== email)
      );
  };

  const handleSelectAll = (value: boolean | string) => {
  if (value || value === "true") {
    const allEmails =
      filteredUsers?.map((user) => user.email) || [];

    setSelectedEmails([...new Set(allEmails)]);
  } else {
    setSelectedEmails([]);
  }
};

/*   const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      e.preventDefault();
      // const { email, platform, provider, sector, subSector, userType } = form;
      setSubmitting(true);
      // const res = await addSubscriber({
      //   email,
      //   platform,
      //   provider,
      //   sector,
      //   subSector,
      //   userType,
      // }).unwrap();
      setOpen(false);
      refetch();
      toast.success("Email added successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      console.log(error);
      if ("data" in error && error.data.message) {
        toast.error(error.data.message);
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  }; */

  //loading state
/*   if (isFetching)
  	return (
  		<div className="w-[27rem] h-[60vh] border flex justify-center items-center">
  			<Loader2 className="animate-spin w-12 h-12" />
  		</div>
  	); */
  

  //error
 /*  if (!usersData)
  	return (
  		<div className="w-[27rem] h-[60vh] border flex justify-center items-center flex-col gap-4">
  			<AlertCircle className="w-12 h-12" />
  			<p>Something went wrong!</p>
  		</div>
  	); */
  
  // console.log(queryParams);

  return (
    <div className="bg-background h-full w-full border p-2.5 md:w-1/4">
      <Input
        type="text"
        id="email"
        placeholder="Search Email..."
        onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchString(event.target.value)}
        className="w-full rounded-sm border px-2.5 py-1.5 placeholder:text-sm focus:outline-none"
      />
      <Select
        onValueChange={(val) => {
          if (val === "all") {
            setQueryParams((prev) => ({
              ...prev,
              location: undefined,
            }));
            return;
          }
          setQueryParams((prev) => ({
            ...prev,
            location: val,
          }));
        }}
      >
        <SelectTrigger className="mt-3 w-full">
          <SelectValue placeholder="Filter by Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Location</SelectLabel>
            <SelectItem value="all" className="hover:bg-primary hover:text-white focus:bg-primary focus:outline-none data-highlighted:text-white data-highlighted:bg-primary/50">All</SelectItem>
            {locations.map((location, index) => (
              <SelectItem key={index} value={location} className="hover:bg-primary hover:text-white focus:bg-primary focus:outline-none data-highlighted:text-white data-highlighted:bg-primary/50">
                {location}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(val) => {
          if (val === "all") {
            setQueryParams((prev) => ({
              ...prev,
              subscriptionPlan: undefined,
            }));
            return;
          }
          setQueryParams((prev) => ({
            ...prev,
            subscriptionPlan: val,
          }));
        }}
      >
        <SelectTrigger className="mt-3 w-full">
          <SelectValue placeholder="Filter by Subscription plans" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Subscription plan</SelectLabel>
            <SelectItem value="all" className="hover:bg-primary hover:text-white focus:bg-primary focus:outline-none data-highlighted:text-white data-highlighted:bg-primary/50">All</SelectItem>
            {subscriptionPlans.map((plan, index) => (
              <SelectItem key={index} value={plan} className="hover:bg-primary hover:text-white focus:bg-primary focus:outline-none data-highlighted:text-white data-highlighted:bg-primary/50">
                {plan}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(val)=>{
          if (val==='all'){
            setQueryParams((prev)=>({...prev,status:undefined}))
            return;
          } 
          setQueryParams((prev)=>({...prev,status:val}))
        }}
      >
        <SelectTrigger className="mt-3 w-full">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {statusOptions.map((status, index) => (
              <SelectItem key={index} value={status} className="hover:bg-primary hover:text-white focus:bg-primary focus:outline-none data-highlighted:text-white data-highlighted:bg-primary/50">
                {`${status.charAt(0).toUpperCase()}${status.substring(1)}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="mt-3 flex items-center justify-between space-x-2">
        <div className="inline-flex items-center space-x-1">
          <div className="space-x-2.5">
            <Checkbox
              id="Select All"
              checked={
              (filteredUsers?.length as number) > 0 &&
              selectedEmails.length === filteredUsers?.length
              }
              onCheckedChange={(value) => handleSelectAll(value)}
            />
            <label
              htmlFor="Select All"
              className="text-xs capitalize text-secondary/75 font-medium peer-disabled:cursor-not-allowed"
              >
              select all
            </label>
          </div>
        </div>

        {!isLoading&&<div className="space-x-1.5">
          <span className="text-primary">
            {filteredUsers?.length}
          </span>
          <span className="text-secondary/50">
            search(es) found</span>
        </div>}

        {/* <Button
          onClick={fetchEmails}
          className="flex capitalize cursor-pointer items-center gap-1 rounded-lg bg-green-600 px-2 py-1 text-sm text-white"
        >
          <RefreshCcw size={16} /> refresh
        </Button> */}
      </div>

      <div className="my-3 min-h-[20vh] max-h-[50vh] h-full overflow-y-auto space-y-1.5">
        {isLoading &&
        <div className="flex justify-center items-center">
          <Loader size={LoaderSize.normal}/>
        </div>}
        {!isLoading && filteredUsers?.length!==0 && filteredUsers?.map((user,index) =>
            <ul key={index} className="flex items-center gap-2.5">
              <Checkbox
                id={`select-${index}`}
                checked={selectedEmails.includes(user.email)}
                onCheckedChange={(checked) =>
                  handleEmailSelection(checked, user.email)
                }
                />
              <li className="text-[12px] text-secondary/50">{user.email}</li>
            </ul>
            )}
        {!isLoading && filteredUsers?.length===0 && <p className="text-center text-secondary/50 capitalize">search emails not found</p>} 
      </div>
    </div>
  );
}