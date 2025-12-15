"use client";

import AllUsers from "@/src/components/dashboardLayout/AllUsers";
import Leads from "@/src/components/dashboardLayout/Leads";
import { Users, Shield } from "lucide-react";
import { useState } from "react";

export default function UserManagementPage() {
  const [tab, setTab] = useState<"users" | "leads">("users");
  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      <div>
        <h1 className="text-2xl font-semibold">User Management</h1>
        <p className="text-sm text-muted-foreground">
          Manage and monitor your users.
        </p>
      </div>
      <div className="flex bg-muted rounded-xl p-1 w-fit">
        <button
          onClick={() => setTab("users")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${tab === "users" ? "bg-white shadow" : "text-muted-foreground"}`}
        >
          <Users size={16} /> All Users
        </button>
        <button
          onClick={() => setTab("leads")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${tab === "leads" ? "bg-white shadow" : "text-muted-foreground"}`}
        >
          <Shield size={16} /> Leads
        </button>
      </div>

      {/* Card */}

      {tab === "users" ? <AllUsers /> : <Leads />}
    </div>
  );
}
