"use client";

import React, {
  useState,
  useEffect,
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
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OverviewData, Query } from "@/src/lib/types";

import { Loader2, RefreshCcw } from "lucide-react";
// import { AlertCircle } from "lucide-react";
// import { Button } from "../ui/button";
// import {
//   useAddSubscriberMutation,
//   useGetSubscribersQuery,
// } from "@/store/services/api/emailSubscription";
// import { toast } from "sonner";
import { platforms, sectors } from "@/src/lib/utils";

type Props = {
  selectedEmails: string[];
  setSelectedEmails: React.Dispatch<React.SetStateAction<string[]>>;
};

const userTypes = ["Users", "Prospects", "Partners"];

export default function FetchEmailsSideBar({
  setSelectedEmails,
  selectedEmails,
}: Props) {
  // const [usersData, setUsersData] = useState<OverviewData[] | null>(null);
  const [searchString, setSearchString] = useState<string>("");
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
    sector: undefined,
    platform: undefined,
    userType: undefined,
  });

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
    } finally {
      // setIsFetching(false);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
  // 			<Loader2 className="animate-spin w-12 h-12" />
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
    <div className="border w-full md:w-1/4">
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
      <input
        type="text"
        id="email"
        placeholder="Search Email..."
        className="border w-full p-1 rounded-sm"
        onChange={searchEmail}
      />
      <Select
        onValueChange={(val) => {
          // filterParam({ name: "platform", val });
          if (val == "undefined") {
            setQueryParams((prev) => ({
              ...prev,
              platform: undefined,
            }));
            return;
          }
          setQueryParams((prev) => ({
            ...prev,
            platform: val.toUpperCase(),
          }));
        }}
      >
        <SelectTrigger className="mt-3">
          <SelectValue placeholder="Filter by Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Platforms</SelectLabel>
            <SelectItem value="undefined">All platforms</SelectItem>
            {platforms.map((platform, index) => (
              <SelectItem key={index} value={platform} className="capitalize">
                {platform}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(val) => {
          // filterParam({ name: "sector", val });
          if (val == "undefined") {
            setQueryParams((prev) => ({
              ...prev,
              sector: undefined,
            }));
            return;
          }
          setQueryParams((prev) => ({
            ...prev,
            sector: val.toUpperCase(),
          }));
        }}
      >
        <SelectTrigger className="mt-3">
          <SelectValue placeholder="Filter by Sector" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sectors</SelectLabel>
            <SelectItem value="undefined">All sectors</SelectItem>
            {sectors.map((sector, index) => (
              <SelectItem key={index} value={sector} className="capitalize">
                {sector}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(val) => {
          if (val == "undefined") {
            setQueryParams((prev) => ({
              ...prev,
              userType: undefined,
            }));
            return;
          }
          setQueryParams((prev) => ({
            ...prev,
            userType: val,
          }));
        }}
      >
        <SelectTrigger className="mt-3">
          <SelectValue placeholder="Filter by UserType" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>User Types</SelectLabel>
            <SelectItem value="undefined">All user types</SelectItem>
            {userTypes.map((userType, index) => (
              <SelectItem key={index} value={userType} className="capitalize">
                {userType}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex items-center justify-between space-x-2 mt-3">
        <div className="inline-flex items-center space-x-1">
          <Checkbox
            id="Select All"
            onCheckedChange={(value) => handleSelectAll(value)}
          />
          <label
            htmlFor="Select All"
            className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed"
          >
            Select All
          </label>
        </div>

        <button
          onClick={fetchEmails}
          className="px-2 py-1 flex items-center gap-1 bg-green-600 text-white text-sm rounded-lg"
        >
          <RefreshCcw size={16} /> Refresh
        </button>
      </div>

      {/* <div className=" my-3 h-[60vh] overflow-y-scroll">
        {isFetching ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader2 className="animate-spin w-12 h-12" />
          </div>
        ) : emailList ? (
          emailList.data.length !== 0 ? (
            emailList.data
              .filter((userData) =>
                sectors.includes(searchString)
                  ? userData.sector?.toLowerCase() ===
                    searchString.toLowerCase()
                  : userData.email.includes(searchString.toLowerCase())
              )
              .map((userData) => (
                <div
                  key={userData._id}
                  className="flex items-center space-x-2 my-4"
                >
                  <Checkbox
                    id={userData.email}
                    onCheckedChange={(value) =>
                      handleEmailSelection(value, userData.email)
                    }
                    checked={
                      selectedEmails.includes(userData.email) ? true : false
                    }
                  />
                  <label
                    htmlFor={userData.email}
                    className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed"
                  >
                    {userData.email}
                  </label>
                </div>
              ))
          ) : (
            <p>No emails yet</p>
          )
        ) : (
          <div className="w-full h-full border flex justify-center items-center flex-col gap-4">
            <AlertCircle className="w-12 h-12" />
            <p>Something went wrong!</p>
          </div>
        )}
      </div> */}
    </div>
  );
}
