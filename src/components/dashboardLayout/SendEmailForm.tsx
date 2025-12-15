/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  //   FormEvent,
  //   useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";
// import { getCookie } from "cookies-next";
import { Loader2, XIcon, ChevronDown, ChevronUp, Upload } from "lucide-react";
import Tiptap from "./Tiptap/Tiptap";
import { reportTemplates } from "@/src/lib/utils";
// import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { EconomicReport, HotPicks, PodcastVlogs } from "@/src/lib/types";
// import EconomicReportTable from "./EconomicReportTable";
import { Button } from "../ui/button";
// import previewNewsletter from "@/lib/previewNewsletter";
// import {
//   usePreviewNewsletterMutation,
//   useSendBulkMailMutation,
// } from "@/store/services/api/newsletter";
import { toast } from "sonner";
import CircularProgress from "../ui/circular-progress";

interface Props {
  selectedEmails: string[];
  setSelectedEmails: React.Dispatch<React.SetStateAction<string[]>>;
}

interface FormInputs {
  cc?: string;
  bcc?: string;
  from?: string;
  template?: string;
  subject: string;
  message: string;
  link: string;
  description?: string;
}

export default function SendEmailForm({
  selectedEmails,
  setSelectedEmails,
}: Props) {
  const [socketId, setSocketId] = useState("");
  const [formInputs, setFormInputs] = useState<FormInputs>({
    cc: "",
    bcc: "",
    template: "",
    subject: "",
    message: "",
    link: "",
    description: "",
  });
  const [fileImage, setFileImage] = useState<File>();
  const [bannerImage, setBannerImage] = useState<{
    image: File | undefined;
    url: string;
  }>({
    url: "",
    image: undefined,
  });
  const [attachmentFile, setAttachmentFile] = useState<File>();
  const [message, setMessage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [hotPicks, setHotPicks] = useState<HotPicks[]>([
    { title: "", description: "", image: "", link: "" },
  ]);
  const isHotPicksEmpty = hotPicks.every(
    (pick) =>
      pick.title === "" &&
      pick.description === "" &&
      pick.image === "" &&
      pick.link === ""
  );

  const [economicReport, setEconomicReport] = useState<EconomicReport[]>([
    {
      description: "",
      issueType: "",
      duration: "",
      geography: "",
      coverage: "",
    },
  ]);

  // const isEconomicReportEmpty = economicReport.every(
  //   (report) =>
  //     report.description === "" &&
  //     report.issueType === "" &&
  //     report.duration === "" &&
  //     report.geography === "" &&
  //     report.coverage === ""
  // );

  const [podcastVlogs, setPodcastVlog] = useState<PodcastVlogs[]>([
    {
      title: "",
      description: "",
      banner: "",
      link: "",
    },
  ]);
  const isPodcastVlogsEmpty = podcastVlogs.every(
    (vlog) =>
      vlog.title === "" &&
      vlog.description === "" &&
      vlog.banner === "" &&
      vlog.link === ""
  );
  const [progress, setProgress] = useState({
    current: 0,
    total: 0,
  });
  const [isSendingBack, setIsSendingBack] = useState(false);
  const [openCC, setOpenCC] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusUpdate, setStausUpdate] = useState<
    {
      email: string;
      status: string;
    }[]
  >([]);

  // const [previewNewsletter] = usePreviewNewsletterMutation();
  // const [sendBulkMail] = useSendBulkMailMutation();

  //   const { toast } = useToast();
  const bannerRef = useRef<HTMLInputElement | null>(null);
  //   const imageRef = useRef<HTMLInputElement | null>(null);
  //   const attachementRef = useRef<HTMLInputElement | null>(null);
  // const provider = getCookie("provider");
  const provider = "teonengine";

  const templates =
    provider === "teonengine"
      ? ["blank", "teonengine", "pollteon", "newsletter"]
      : ["blank", "precise", "newbusiness", "esgforum", ...reportTemplates];

  const froms = [
    "newsletter",
    "insights",
    "rhoda",
    "barnabas",
    "juliet",
    "daniel",
    "gloria",
    "kehinde",
    "gabriel",
    "samuel",
    "funke",
    "Roseline",
    "inumidun",
    "mariam",
    "mercy",
  ];

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_EMAIL_SOCKET_SERVICE as string);
    socket.on("connect", () => {
      console.log("Connecting to socket: ", socket.id);
      setSocketId(socket.id as string);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("email-status", (data: any) => {
      // console.log("status update: ", data);
      setProgress((prev) => ({ ...prev, current: prev.current + 1 }));
      setStausUpdate((prev) => [...prev, data]);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("email-completed", (data: any) => {
      // console.log("completd", data);
      setIsSendingBack(false);
    });

    return () => {
      socket.off("email-status");
      socket.off("email-completed");
    };
  }, []);

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormInputs((prev) => ({
      ...prev,
      [`${event.target.id}`]: event.target.value,
    }));
  };

  const handleHotPicksChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, value, files } = e.target;
    const list = [...hotPicks];

    if (id === "title") {
      list[index]["title"] = value;
    }
    if (id === "description") {
      list[index]["description"] = value;
    }
    if (id === "link") {
      list[index]["link"] = value;
    }
    if (id === "image") {
      if (list[index]["title"]) {
        // uploadImage(files?.[0], list[index]["title"]).then((res) => {
        //   toast({
        //     description: `Article ${index + 1} image uploaded successfully`,
        //   });
        //   list[index]["image"] = res?.data.data;
        // });
      } else {
        // toast({
        //   variant: "destructive",
        //   title: "Uh oh!",
        //   description: "Title is required for article to upload",
        // });
      }
    }
    setHotPicks(list);
  };

  const addHotPicks = () => {
    setHotPicks([
      ...hotPicks,
      { title: "", description: "", link: "", image: "" },
    ]);
  };

  const removeHotPicks = (index: number) => {
    const list = [...hotPicks];
    list.splice(index, 1);
    setHotPicks(list);
  };

  // Economic Report
  // const handleEconomicReportChange = (
  //   // e: ChangeEvent<HTMLInputElement>,
  //   id: string,
  //   value: string,
  //   index: number
  // ) => {
  //   // const { id, value } = e.target;
  //   if (economicReport.length > 0) {
  //     const list = [...economicReport];

  //     if (id === "issueType") {
  //       list[index]["issueType"] = value;
  //     }
  //     if (id === "description") {
  //       list[index]["description"] = value;
  //     }
  //     if (id === "duration") {
  //       list[index]["duration"] = value;
  //     }
  //     if (id === "geography") {
  //       list[index]["geography"] = value;
  //     }
  //     if (id === "coverage") {
  //       list[index]["coverage"] = value;
  //     }

  //     setEconomicReport(list);
  //   }
  // };

  // const addEconomicReport = () => {
  //   setEconomicReport([
  //     ...economicReport,
  //     {
  //       description: "",
  //       issueType: "",
  //       duration: "",
  //       geography: "",
  //       coverage: "",
  //     },
  //   ]);
  // };

  // const removeEconomicReport = (index: number) => {
  //   const list = [...economicReport];
  //   list.splice(index, 1);
  //   setEconomicReport(list);
  // };

  // Economic Report
  const handlePodcastVlogChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, value, files } = e.target;
    const list = [...podcastVlogs];

    if (id === "title") {
      list[index]["title"] = value;
    }
    if (id === "description") {
      list[index]["description"] = value;
    }
    if (id === "link") {
      list[index]["link"] = value;
    }
    if (id === "banner") {
      if (list[index]["title"]) {
        // uploadImage(files?.[0], list[index]["title"]).then((res) => {
        //   toast({
        //     description: `Podcast ${index + 1} image uploaded successfully`,
        //   });
        //   list[index]["banner"] = res?.data.data;
        // });
      } else {
        // toast({
        //   variant: "destructive",
        //   title: "Uh oh!",
        //   description: "Title is required for article to upload",
        // });
      }
    }

    setPodcastVlog(list);
  };

  const addPodcastVlog = () => {
    setPodcastVlog([
      ...podcastVlogs,
      {
        title: "",
        description: "",
        banner: "",
        link: "",
      },
    ]);
  };

  const removePodcastVlog = (index: number) => {
    const list = [...podcastVlogs];
    list.splice(index, 1);
    setPodcastVlog(list);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileImage(e.target.files?.[0]);
  };

  const onBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const previewUrl = URL.createObjectURL(file as File);
    setBannerImage((prev) => ({ ...prev, image: file, url: previewUrl }));
  };

  const onBannerRemove = () => {
    setBannerImage({ image: undefined, url: "" });
  };

  const onAttachmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAttachmentFile(e.target.files?.[0]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setProgress({ current: 0, total: 0 });

    const formData = new FormData();

    const ccEmails = formInputs.cc
      ? formInputs.cc.split(",").map((s) => s.trim())
      : [];
    // const ccEmails = formInputs.cc ? formInputs.cc.split(" ").join("") : null;

    const bccEmails = formInputs.bcc
      ? formInputs.bcc.split(",").map((s) => s.trim())
      : [];
    // const bccEmails = formInputs.bcc
    // 	? formInputs.bcc.split(" ").join("")
    // 	: null;

    if (formInputs.template === undefined || formInputs.template === "") {
      toast.error("Template is required");
      setIsSending(false);
      return;
    }

    if (selectedEmails.length === 0) {
      toast.error("No email was selected");
      setIsSending(false);
      return;
    }

    formData.append("to", JSON.stringify(selectedEmails));
    if (ccEmails.length > 0) formData.append("cc", JSON.stringify(ccEmails));
    if (bccEmails.length > 0) formData.append("bcc", JSON.stringify(bccEmails));

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    formInputs.from && formData.append("from", formInputs.from);
    formData.append("subject", formInputs.subject);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    formInputs.template && formData.append("template", formInputs.template);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    formInputs.description &&
      formData.append("description", formInputs.description);
    formData.append("message", message);
    if (hotPicks.length > 0)
      formData.append("hotPicks", JSON.stringify(hotPicks));
    if (economicReport.length > 0)
      formData.append("economicReport", JSON.stringify(economicReport));
    if (podcastVlogs.length > 0)
      formData.append("podcastVlogs", JSON.stringify(podcastVlogs));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    socketId !== "" && formData.append("socketId", socketId);
    // console.log(socketId);

    if (fileImage) formData.append("file", fileImage);
    if (bannerImage.image) formData.append("banner", bannerImage.image);
    if (attachmentFile) formData.append("attachment", attachmentFile);
    setProgress((prev) => ({ ...prev, total: selectedEmails.length }));

    try {
      // const response = await sendBulkMail({ data: formData }).unwrap();
      // toast.success(response.message);
      setIsSendingBack(true);
      setFormInputs((prev) => ({
        ...prev,
        subject: "",
        message: "",
        link: "",
        template: undefined,
      }));
      setSelectedEmails([]);
    } catch (error) {
      console.log("submit err: ", error);
      toast.error("Something went wrong!");
    } finally {
      setIsSending(false);
    }
  };

  const handlePreview = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setPreviewModal(true);

    event.preventDefault();
    setPreviewReady(true);

    const formData = new FormData();
    formData.append("to", JSON.stringify(selectedEmails));
    formData.append("subject", formInputs.subject);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    formInputs.description &&
      formData.append("description", formInputs.description);
    formData.append("message", message);
    if (hotPicks.length > 0)
      formData.append("hotPicks", JSON.stringify(hotPicks));
    if (economicReport.length > 0)
      formData.append("economicReport", JSON.stringify(economicReport));
    if (podcastVlogs.length > 0)
      formData.append("podcastVlogs", JSON.stringify(podcastVlogs));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    formInputs.template && formData.append("template", formInputs.template);
    if (fileImage) formData.append("file", fileImage);
    if (bannerImage.image) formData.append("banner", bannerImage.image);
    if (attachmentFile) formData.append("attachment", attachmentFile);

    try {
      // const response = await previewNewsletter({ data: formData }).unwrap();
      // console.log(response);
      // setPreview(response.data);
    } catch (error) {
      console.log("error");
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setPreviewReady(false);
    }
  };

  /** 
  const uploadImage = async (
    image: File | undefined,
    subject: string | undefined
  ) => {
    try {
      setUploading(true);
      const formData = new FormData();
      if (subject) formData.append("subject", subject);
      if (image) formData.append("file", image);

      const response = await axios.post(
        "/api/admin/newsletter/upload",
        formData
      );
      // console.log("upload res: ", response);
      return response;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "An error occured when uploading ",
      });
    } finally {
      setUploading(false);
    }
  };
  **/

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full md:w-3/4"
    >
      <div className="w-full grid grid-cols-2 gap-4 items-center ">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="w-32">
            Template:
          </label>
          <Select
            value={formInputs.template}
            onValueChange={(val) =>
              setFormInputs((prev) => ({ ...prev, template: val }))
            }
          >
            <SelectTrigger className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select template</SelectLabel>
                <SelectItem value={"default"}>Select template</SelectItem>
                {templates.map((template, index) => (
                  <SelectItem
                    key={index}
                    value={template}
                    className="capitalize"
                  >
                    {template.split("-").join(" ")}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="from" className="w-32">
            From:{" "}
          </label>
          <Select
            onValueChange={(val) => {
              setFormInputs((prev) => ({ ...prev, from: val }));
            }}
          >
            <SelectTrigger className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none">
              <SelectValue placeholder="Select from" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>From</SelectLabel>
                {froms.map((from, index) => (
                  <SelectItem key={index} value={from} className="capitalize">
                    {from}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="w-32">
          To:{" "}
        </label>
        <input
          readOnly
          type="text"
          id="email"
          name="email"
          value={selectedEmails}
          placeholder="example@gmail.com, example2@gmail.com"
          className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none cursor-not-allowed"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setOpenCC((prev) => !prev)}
          className="text-sm flex items-center gap-1"
        >
          <span>CC, BCC</span>{" "}
          {openCC ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>
      {openCC && (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="w-32">
              CC:{" "}
            </label>
            <input
              type="text"
              id="cc"
              name="cc"
              onChange={onInputChange}
              value={formInputs.cc}
              placeholder="example@gmail.com, example2@gmail.com"
              className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="w-32">
              BCC:{" "}
            </label>
            <input
              type="text"
              id="bcc"
              name="bcc"
              onChange={onInputChange}
              value={formInputs.bcc}
              placeholder="example@gmail.com, example2@gmail.com"
              className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
            />
          </div>
        </>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="w-32">
          Subject:{" "}
        </label>
        <input
          type="text"
          id="subject"
          onChange={onInputChange}
          value={formInputs.subject}
          placeholder="Subject"
          className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="w-32">
          Description:{" "}
        </label>
        <input
          type="text"
          id="description"
          onChange={onInputChange}
          value={formInputs.description}
          placeholder="Description(Optional)"
          className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="bannerImg" className="w-32">
          Banner:{" "}
        </label>
        <div
          onClick={() => bannerRef.current?.click()}
          className="w-full h-[20dvh] flex flex-col justify-center items-center p-3 rounded-sm border border-[#00000047] cursor-pointer gap-1"
        >
          {bannerImage.url ? (
            <div className="relative w-full h-full">
              <img
                src={bannerImage.url}
                alt="banner-image"
                className="aspect-3/2 h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-slate-400/50 flex justify-center items-center">
                <Button type="button" onClick={onBannerRemove}>
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Upload />
              <p>Click here to upload banner</p>
              <input
                type="file"
                hidden
                ref={(e) => {
                  bannerRef.current = e;
                }}
                id="bannerImage"
                className=""
                accept=".png, .jpg, .jpeg"
                onChange={onBannerChange}
                // disabled={getCookie("provider") === "precise"}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label htmlFor="message" className="w-32">
          Message:{" "}
        </label>
        <div className="w-full">
          <Tiptap
            size="lg"
            content={message}
            onChange={(newMessage: string) => setMessage(newMessage)}
          />
        </div>
      </div>
      {/* {(reportTemplates.includes(formInputs.template as string) ||
        !isEconomicReportEmpty) && (
        <div className="flex gap-2 ">
          <label htmlFor="economicReport" className="w-32">
            Economic Report:{" "}
          </label>
          <EconomicReportTable
            reports={economicReport}
            addRow={addEconomicReport}
            onChange={handleEconomicReportChange}
            removeEconomicReport={removeEconomicReport}
          />
        </div>
      )} */}

      {/* {(economicReport.length > 0 ||
				reportTemplates.includes(formInputs.template as string)) && (
				<div className="flex gap-2 ">
					<label htmlFor="bannerImg" className="w-32">
						Economic Report:{" "}
					</label>

					<div className="w-full space-y-2">
						<div className="w-full">
							{economicReport.map((report, key) => (
								<div key={key} className="w-full flex flex-col">
									<div className="w-full flex items-center justify-between">
										<p>Report {key + 1}</p>

										{economicReport.length > 1 && (
											<div
												className="w-5 h-5 flex items-center justify-center cursor-pointer"
												onClick={() => removeEconomicReport(key)}
											>
												<XIcon className="w-4 h-4" />
											</div>
										)}
									</div>
									<div className="w-full grid grid-cols-2 items-center gap-3">
										<Tiptap
											header={false}
											placeholder="Description"
											content={report.description as string}
											onChange={(value: string) =>
												handleEconomicReportChange("description", value, key)
											}
										/>
										<Tiptap
											header={false}
											placeholder="Issue Type"
											content={report.issueType as string}
											onChange={(value: string) =>
												handleEconomicReportChange("issueType", value, key)
											}
										/>
										<Tiptap
											header={false}
											placeholder="Duration"
											content={report.duration as string}
											onChange={(value: string) =>
												handleEconomicReportChange("duration", value, key)
											}
										/>
										<Tiptap
											header={false}
											placeholder="Coverage"
											content={report.coverage as string}
											onChange={(value: string) =>
												handleEconomicReportChange("geography", value, key)
											}
										/>
										<Tiptap
											header={false}
											placeholder="Geography"
											content={report.geography as string}
											onChange={(value: string) =>
												handleEconomicReportChange("coverage", value, key)
											}
										/>
									</div>
								</div>
							))}
						</div>
						<div className="w-full flex justify-center">
							<button
								type="button"
								onClick={addEconomicReport}
								className="px-6 py-2 bg-[#020F54] font-medium text-white "
							>
								Add report
							</button>
						</div>
					</div>
				</div>
			)} */}

      {(reportTemplates.includes(formInputs.template as string) ||
        !isPodcastVlogsEmpty) && (
        <div className="flex gap-2 ">
          <label htmlFor="bannerImg" className="w-32">
            Podcast:{" "}
          </label>
          <div className="w-[calc(100%-8rem)] space-y-2">
            <div className="w-full">
              {podcastVlogs.map((podcast, key) => (
                <div key={key} className="w-full flex flex-col">
                  <div className="w-full flex items-center justify-between">
                    <p>Podcast {key + 1}</p>
                    {podcastVlogs.length > 1 && (
                      <div
                        className="w-5 h-5 flex items-center justify-center cursor-pointer"
                        onClick={() => removePodcastVlog(key)}
                      >
                        <XIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-3">
                    <input
                      type="text"
                      id="title"
                      onChange={(e) => handlePodcastVlogChange(e, key)}
                      value={podcast.title}
                      placeholder="Title"
                      className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
                    />
                    <input
                      type="text"
                      id="description"
                      //   onChange={(e) => handlePodcastVlogChange(e, key)}
                      value={podcast.description}
                      placeholder="Description"
                      className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
                    />
                    <input
                      type="url"
                      id="link"
                      onChange={(e) => handlePodcastVlogChange(e, key)}
                      value={podcast.link}
                      placeholder="Link"
                      className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
                    />
                    <input
                      type="file"
                      id="banner"
                      onChange={(e) => handlePodcastVlogChange(e, key)}
                      className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center">
              <button
                type="button"
                disabled={uploading}
                onClick={addPodcastVlog}
                className="px-6 py-2 bg-[#020F54] font-medium text-white "
              >
                {uploading ? "Uploading Image..." : "Add podcast"}
              </button>
            </div>
          </div>
        </div>
      )}

      {(formInputs.template == "newbusiness" || !isHotPicksEmpty) && (
        <div className="flex gap-2 ">
          <label htmlFor="bannerImg" className="w-32">
            Hot picks:{" "}
          </label>

          <div className="w-[calc(100%-8rem)] space-y-2">
            <div className="w-full">
              {hotPicks.map((hotPick, key) => (
                <div key={key} className="w-full flex flex-col">
                  <div className="w-full flex items-center justify-between">
                    <p>Article {key + 1}</p>

                    {hotPicks.length > 1 && (
                      <div
                        className="w-5 h-5 flex items-center justify-center cursor-pointer"
                        onClick={() => removeHotPicks(key)}
                      >
                        <XIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-3">
                    <input
                      type="text"
                      id="title"
                      onChange={(e) => handleHotPicksChange(e, key)}
                      value={hotPick.title}
                      placeholder="Title"
                      className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
                    />
                    <input
                      type="text"
                      id="description"
                      onChange={(e) => handleHotPicksChange(e, key)}
                      value={hotPick.description}
                      placeholder="Description"
                      className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
                    />
                    <input
                      type="url"
                      id="link"
                      onChange={(e) => handleHotPicksChange(e, key)}
                      value={hotPick.link}
                      placeholder="Link"
                      className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
                    />
                    <input
                      type="file"
                      id="image"
                      onChange={(e) => handleHotPicksChange(e, key)}
                      className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center">
              <button
                type="button"
                disabled={uploading}
                onClick={addHotPicks}
                className="px-6 py-2 bg-[#020F54] font-medium text-white "
              >
                {uploading ? "Uploading Image..." : "Add hot pick"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 items-center">
        <label htmlFor="attachment" className="w-32">
          Attachment:{" "}
        </label>
        <input
          type="file"
          id="attachment"
          className="w-[calc(100%-8rem)] cursor-pointer"
          onChange={onAttachmentChange}
        />
      </div>

      {attachmentFile && <div>Attachement: {attachmentFile.name}</div>}

      <div className="flex gap-2 items-center">
        <label htmlFor="bannerImg" className="w-32">
          Image:{" "}
        </label>
        <input
          type="file"
          id="bannerImage"
          className="w-[calc(100%-8rem)] cursor-pointer"
          onChange={onFileChange}
        />
      </div>

      <div className="flex justify-center md:justify-end space-x-2 my-8">
        <button
          type="button"
          onClick={(e) => handlePreview(e)}
          disabled={isSending}
          className="py-2 px-6 sm:px-12 border border-[#A7CC48] font-medium text-[#A7CC48] rounded-sm disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Preview
        </button>

        <button
          type="submit"
          disabled={isSending}
          className="py-2 px-6 sm:px-12 bg-[#A7CC48] font-medium text-white rounded-sm disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isSending ? "Sending..." : "Send Email"}
        </button>
      </div>

      <Dialog open={isSendingBack} onOpenChange={setIsSendingBack}>
        <DialogContent className="w-1/3">
          <DialogHeader>
            <DialogTitle>Sending mails...</DialogTitle>
            <DialogDescription className="text-xs">
              Please wait a while mails are been sent.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-[40dvh] flex flex-col justify-center items-center gap-5">
            {
              <CircularProgress
                value={(progress.current / progress.total) * 100}
              />
            }
            {statusUpdate.length > 1 && (
              <p className="text-sm font-medium">
                <span
                  className={`${
                    statusUpdate[statusUpdate.length - 1].status === "sent"
                      ? "text-green-500"
                      : ""
                  } ${
                    statusUpdate[statusUpdate.length - 1].status === "pending"
                      ? "text-yellow-500"
                      : ""
                  }
									${
                    statusUpdate[statusUpdate.length - 1].status === "failed"
                      ? "text-red-500"
                      : ""
                  } capitalize`}
                >
                  {statusUpdate[statusUpdate.length - 1].status}
                </span>{" "}
                - {statusUpdate[statusUpdate.length - 1].email}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={previewModal} onOpenChange={setPreviewModal}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
          </DialogHeader>
          <div className="w-full max-h-[80vh] space-y-2 overflow-auto">
            <p className="text-xl font-medium">Subject: {formInputs.subject}</p>
            {!previewReady && preview ? (
              <div
                style={{ whiteSpace: "pre-line" }}
                className="w-full text-base space-y-1 text-[#333]"
                dangerouslySetInnerHTML={{
                  // __html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><link rel="preload" as="image" href="https://www.teonengine.com/static/precise-logo.png"/><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/><style>@media(min-width:768px){.md\:w-\[7rem\]{width:7rem!important}.md\:text-lg{font-size:1.125rem!important;line-height:1.75rem!important}}</style></head><body style="background-color:rgb(246,249,252);font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;color:rgb(51,51,51)"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;background-color:rgb(255,255,255);margin-top:0px;margin-bottom:4rem;margin-left:auto;margin-right:auto;padding-left:0px;padding-right:0px;padding-top:1.25rem;padding-bottom:3rem"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:1rem;padding-right:1rem"><tbody><tr><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:100%;height:15rem;border-radius:1rem;overflow:hidden"><tbody><tr><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-image:url(&#x27;https://www.teonengine.com/static/preciseTemplateBg.png&#x27;);position:relative;width:100%;height:100%;padding:1.5rem;background-position:center;background-size:cover;background-repeat:no-repeat"><tbody><tr><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><td class="md:w-[7rem]" data-id="__react-email-column" style="width:5rem"><table align="center" width="100%" class="md:w-[7rem]" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:0.5rem;background-color:rgb(255,255,255);border-radius:0.75rem;width:5rem;display:flex;justify-content:center;align-items:center;margin-left:0px;margin-right:0px"><tbody><tr><td><img alt="Precisepoint" src="https://www.teonengine.com/static/precise-logo.png" style="display:block;outline:none;border:none;text-decoration:none;width:100%;height:fit-content;object-fit:cover;object-position:center" width="72"/></td></tr></tbody></table></td><td data-id="__react-email-column" style="padding-left:0.5rem"><p class="md:text-lg" style="font-size:1rem;line-height:1.5rem;margin:16px 0;color:rgb(255,255,255);font-weight:600">A Policy Analysis Platform</p></td></tr></tbody></table><p style="margin:0px;font-size:0.875rem;line-height:1.25rem;color:rgb(255,255,255)">Powered by Precise Platforms</p></td></tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="color:rgb(255,255,255)"><tbody><tr><td><p style="font-size:1.25rem;line-height:1.75rem;margin:16px 0;font-weight:600;text-align:center;font-style:italic">&quot;Welcome to PollTeon&quot;</p><p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center">Test description</p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><div style="white-space:pre-line;font-size:1rem;line-height:1.5rem;color:rgb(51,51,51)"><p>Hello,</p><p></p><p>How are you doing today <strong><u>Ifeoluwa</u></strong></p><p></p><ul><li><p>number 1</p></li><li><p>number 2</p></li><li><p>number 3</p></li></ul><p></p><ol><li><p>number 1</p></li><li><p>number 2</p></li><li><p>number 3</p></li></ol><p></p><p>click <a target="_blank" rel="noopener noreferrer nofollow" class="text-blue-900 underline" href="https://www.precisepoint.net/intelligence/finance-economy/naira-s-rebound-a-turning-point-for-the-nigerian-economy">here</a> to read more</p></div><div style="display:flex;justify-content:center"><img alt="content-image" src="https://www.teonengine.com/static/precise-logo.png" style="display:block;outline:none;border:none;text-decoration:none;object-fit:contain" width="72"/></div><p style="font-size:1.125rem;line-height:1.75rem;margin:16px 0;font-weight:600;margin-top:2rem;margin-bottom:1rem">About PrecisePoint | A Policy Analysis Platform</p><p style="font-size:1rem;line-height:1.5rem;margin:16px 0">PrecisePoint delivers custom intelligence solutions, merging information and insights to illuminate market dynamics. Our research, backed by Precise Platforms, a reputation management firm, provides sector-specific, outcome-driven information and strategic business policy advisory for effective planning.</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:100%;padding:0.5rem;background-color:rgb(255,147,38);color:rgb(255,255,255);font-size:1rem;line-height:1.5rem;display:flex;flex-direction:column;align-items:center;font-weight:500"><tbody><tr><td><p style="font-size:14px;line-height:24px;margin:16px 0;margin-top:0.25rem;margin-bottom:0.25rem;text-align:center;color:rgb(255,255,255)">You are receiving this email because you’re an industy leader</p><p style="font-size:14px;line-height:24px;margin:16px 0;margin-top:0.25rem;margin-bottom:0.25rem;text-align:center;color:rgb(255,255,255)">©Precise Platforms.</p><p style="font-size:14px;line-height:24px;margin:16px 0;margin-top:0px;margin-bottom:0px;text-align:center;color:rgb(255,255,255)">3, Dapo Bode Street, Yaba, Phase 2, Lagos, Nigeria</p><p style="font-size:14px;line-height:24px;margin:16px 0;margin-top:0px;margin-bottom:0px;text-align:center;color:rgb(255,255,255)">Company Contact Number: +234 809 991 2629 || +234 816 975 8179</p><p style="font-size:14px;line-height:24px;margin:16px 0;margin-top:0px;margin-bottom:0px;text-align:center;color:rgb(255,255,255)">Company Contact Email: bolaji.okusaga@precise.com.ng || gabriel.ntoka@precise.com.ng</p><p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;margin-top:1rem;margin-bottom:1rem"><a href="https://www.teonengine.com/contact" style="color:rgb(255,255,255);text-decoration:none;text-decoration-line:underline" target="_blank">Contact us</a> | TeonEngine <a href="https://www.teonengine.com/" style="color:rgb(255,255,255);text-decoration:none;text-decoration-line:underline" target="_blank">Privacy</a></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>`,
                  __html: preview,
                }}
              />
            ) : (
              <div className="w-full h-[50vh] flex justify-center items-center">
                <Loader2 className="animate-spin w-12 h-12" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
}
