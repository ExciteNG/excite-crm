"use client";

import { useState } from "react";
import FetchEmailsSideBar from "@/src/components/dashboardLayout/FetchEmailsSideBar";
import SendEmailForm from "@/src/components/dashboardLayout/SendEmailForm";

const NewsletterPage = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  return (
    <div className="h-full space-y-6 overflow-y-auto p-6">
      <div>
        <h1 className="text-secondary text-2xl font-bold">Newsletter</h1>
        <p className="text-sm text-[#433F3E]">
          Follow-up with your customers on recently product.
        </p>
      </div>
      <div className="mt-10 flex w-full flex-col justify-center gap-3 pb-5 md:flex-row">
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
