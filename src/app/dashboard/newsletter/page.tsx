"use client";

import FetchEmailsSideBar from "@/src/components/dashboardLayout/FetchEmailsSideBar";
import SendEmailForm from "@/src/components/dashboardLayout/SendEmailForm";
import { useState } from "react";

const NewsletterPage = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      <div className="pl-4">
        <h4 className="text-lg font-bold text-[#151413]">Newsletter</h4>
        <p className="text-sm text-[#433F3E]">
          Follow-up with your customers on recently product.{" "}
        </p>
      </div>
      <div className="w-full px-4 pb-5 mt-10 flex flex-col md:flex-row gap-3">
        <SendEmailForm
          selectedEmails={selectedEmails}
          setSelectedEmails={setSelectedEmails}
        />
        <FetchEmailsSideBar
          selectedEmails={selectedEmails}
          setSelectedEmails={setSelectedEmails}
        />
      </div>
    </div>
  );
};

export default NewsletterPage;
