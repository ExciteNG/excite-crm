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
import {  RefreshCcw } from "lucide-react";
// import { toast } from "sonner";
import { locations, subscriptionPlans } from "@/src/lib/utils";
import {  statusOptions } from "@/src/lib/contents";
import { useReactQuery } from "@/src/services/apiHelper";
import { Button } from "@/src/components/ui/button";
import Loader, { LoaderSize } from "@/src/components/dashboardUI/reusableComponents/Loader";
import { Input } from "@/src/components/ui/input";

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

const { data,isLoading } = useReactQuery<User[]>(['users'], '/user/excite-users');

const users = data?.data.data;

// filter users by search
 let filteredUsers = users?.map((user) => (user.email.includes(searchString) ? user : null)).filter((user) => user !== null);

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

  // console.log(filteredUsers)


  //   const {
  //     data: emailList,
  //     refetch,
  //     isFetching,
  //   } = useGetSubscribersQuery(queryParams);
  // const [addSubscriber] = useAddSubscriberMutation();
  // console.log(emailList);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // const response = await axios.get("/api/admin/emails");
  //       // console.log("Response: ", response);
  //       // const data = response.data;
  //       // setUsersData(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   })();
  // }, []);

  const fetchEmails = async () => {
    try {
      //   refetch();
      // setUsersData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  // const filterParam = async (paramObj: { name: string; val: string }) => {
  //   // const tempQueryParamsObj = {
  //   //   ...queryParams,
  //   //   [paramObj.name]: paramObj.val.toUpperCase(),
  //   // };
  //   setQueryParams((prev) => ({
  //     ...prev,
  //     [paramObj.name]: paramObj.val.toUpperCase(),
  //   }));

  //   try {
  //     refetch();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //   useEffect(() => {
  //     if (queryParams.sector || queryParams.platform || queryParams.userType) {
  //     //   refetch();
  //     }
  //   }, [queryParams.sector, queryParams.platform, queryParams.userType, refetch]);

  const handleEmailSelection = (value: boolean | string, email: string) => {
    if (value || value === "true")
      setSelectedEmails((prev) => [...prev, email]);
    if (!value || value === "false")
      setSelectedEmails((prev) => [...prev].filter((item) => item !== email));

    // setSelectedEmails(usersData.map(data => data.email))
  };

  const handleSelectAll = (value: boolean | string) => {
    // emailList && (value || value === "true")
    //   ? setSelectedEmails(emailList.data.map((data) => data.email))
    //   : setSelectedEmails([]);
  };

  // const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const submitHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
  //   try {
  //     e.preventDefault();
  //     // const { email, platform, provider, sector, subSector, userType } = form;
  //     setSubmitting(true);
  //     // const res = await addSubscriber({
  //     //   email,
  //     //   platform,
  //     //   provider,
  //     //   sector,
  //     //   subSector,
  //     //   userType,
  //     // }).unwrap();
  //     setOpen(false);
  //     refetch();
  //     toast.success("Email added successfully!");
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     console.log(error);
  //     console.log(error);
  //     if ("data" in error && error.data.message) {
  //       toast.error(error.data.message);
  //     } else if (error?.message) {
  //       toast.error(error.message);
  //     } else {
  //       toast.error("An unexpected error occurred.");
  //     }
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  //loading state
  // if (isFetching)
  // 	return (
  // 		<div className="w-[27rem] h-[60vh] border flex justify-center items-center">
  			// <Loader2 className="animate-spin w-12 h-12" />
  // 		</div>
  // 	);
  //...

  //error
  // if (!usersData)
  // 	return (
  // 		<div className="w-[27rem] h-[60vh] border flex justify-center items-center flex-col gap-4">
  // 			<AlertCircle className="w-12 h-12" />
  // 			<p>Something went wrong!</p>
  // 		</div>
  // 	);
  //...
  // console.log(queryParams);

  return (
    <div className="bg-background h-full w-full border p-2.5 md:w-1/4">
      {/* <div className="flex justify-end pb-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="p-2 flex items-center gap-1 bg-[#020F54] text-white font-medium rounded-md text-xs">
              <Plus size={16} /> Add contact
            </button>
          </DialogTrigger>
          <DialogContent className="lg:w-1/3">
            <DialogHeader>
              <DialogTitle>Add contact</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Input
                name="email"
                onChange={handleChange}
                placeholder="Email"
                className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
              />
              <Select
                onValueChange={(val) => setForm({ ...form, provider: val })}
              >
                <SelectTrigger className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="precise" className="capitalize">
                      Precise
                    </SelectItem>
                    <SelectItem value="teonengine" className="capitalize">
                      Teonengine
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(val) => setForm({ ...form, platform: val })}
              >
                <SelectTrigger className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Platforms</SelectLabel>
                    {platforms.map((platform, index) => (
                      <SelectItem
                        key={index}
                        value={platform.toUpperCase()}
                        className="capitalize"
                      >
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(val) => setForm({ ...form, sector: val })}
              >
                <SelectTrigger className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none">
                  <SelectValue
                    placeholder="Select sector"
                    className="capitalize upp"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sectors</SelectLabel>
                    {sectors.map((sector, index) => (
                      <SelectItem
                        key={index}
                        value={sector.toUpperCase()}
                        className="capitalize"
                      >
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(val) => setForm({ ...form, userType: val })}
              >
                <SelectTrigger className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none">
                  <SelectValue placeholder="Select usertype" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>User Types</SelectLabel>
                    {userTypes.map((userType, index) => (
                      <SelectItem
                        key={index}
                        value={userType.toUpperCase()}
                        className="capitalize"
                      >
                        {userType}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button disabled={submitting} onClick={submitHandler}>
                {submitting ? "Submiting..." : "Submit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div> */}
      <Input
        type="text"
        id="email"
        placeholder="Search Email..."
        className="w-full rounded-sm border px-2.5 py-1.5 placeholder:text-sm focus:outline-none"
        onChange={searchEmail}
      />
      <Select
        onValueChange={(val) => {
          if (val === "all") {
            setQueryParams((prev) => ({
              ...prev,
              location: undefined,
            }));
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
            <SelectItem value="all">All</SelectItem>
            {locations.map((location, index) => (
              <SelectItem key={index} value={location} className="capitalize">
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
            <SelectItem value="all">All</SelectItem>
            {subscriptionPlans.map((plan, index) => (
              <SelectItem key={index} value={plan} className="capitalize">
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
              <SelectItem key={index} value={status} className="capitalize">
                {`${status.charAt(0).toUpperCase()}${status.substring(1)}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="mt-3 flex items-center justify-between space-x-2">
        <div className="inline-flex items-center space-x-1">
          <Checkbox
            id="Select All"
            onCheckedChange={(value) => handleSelectAll(value)}
          />
          <label
            htmlFor="Select All"
            className="text-sm leading-none text-secondary font-medium peer-disabled:cursor-not-allowed"
          >
            Select All
          </label>
        </div>

        <Button
          onClick={fetchEmails}
          className="flex cursor-pointer items-center gap-1 rounded-lg bg-green-600 px-2 py-1 text-sm text-white"
        >
          <RefreshCcw size={16} /> Refresh
        </Button>
      </div>

      <div className="my-3 min-h-[20vh] max-h-[50vh] h-full overflow-y-auto space-y-1.5">
        {isLoading &&
        <div className="flex justify-center items-center">
          <Loader size={LoaderSize.normal}/>
        </div>}
        {!isLoading && filteredUsers?.length!==0 && filteredUsers?.map((user,index) =>
            <ul key={index} className="flex items-center gap-2.5">
              <Checkbox id="Select" onCheckedChange={()=>{}}/>
              <li className="text-sm text-secondary">{user.email}</li>
            </ul>
            )}
        {!isLoading && filteredUsers?.length===0 && <p className="text-center text-secondary capitalize">search emails not found</p>} 
      </div>
    </div>
  );
}