"use client";

import AllUsers from "@/src/components/dashboardLayout/AllUsers";
import Leads from "@/src/components/dashboardLayout/Leads";
import { Button } from "@/src/components/ui/button";
import { Users, Shield } from "lucide-react";
import { useState } from "react";

export default function UserManagementPage() {
  const [tab, setTab] = useState<"users" | "leads">("users");
  return (
    <section className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">User Management</h1>
        <p className="text-muted-foreground text-sm">
          Manage and monitor your users.
        </p>
      </div>
      <div className="bg-secondary w-fit space-x-1 rounded-lg p-1">
        <Button
          onClick={() => setTab("users")}
          variant={`${tab === "users" ? "default" : "secondary"}`}
          className={`${tab === "users" ? "" : "text-primary"} cursor-pointer`}
        >
          <Users size={16} />
          <span className="capitalize">all users</span>
        </Button>
        <Button
          onClick={() => setTab("leads")}
          variant={`${tab === "leads" ? "default" : "secondary"}`}
          className={`${tab === "leads" ? "" : "text-primary"} cursor-pointer`}
        >
          <Shield size={16} />
          <span className="capitalize">leads</span>
        </Button>
      </div>
      {tab === "users" ? <AllUsers /> : <Leads />}
    </section>
  );
}
