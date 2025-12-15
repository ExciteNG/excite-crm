import React from "react";
import { Users, MessageCircle } from "lucide-react";

const leads = [
  {
    name: "Jenny Wilson",
    email: "john@church.com",
    phone: "0819 012 3456",
    location: "Yaba",
    source: "Facebook",
    lastLogin: "2 min ago",
    status: "Follow-up",
  },
  {
    name: "Eleanor Pena",
    email: "john@church.com",
    phone: "0901 123 4567",
    location: "Mushin",
    source: "Tiktok",
    lastLogin: "1 hour ago",
    status: "Messaged",
  },
  {
    name: "Leslie Alexander",
    email: "john@church.com",
    phone: "0704 567 8901",
    location: "Ajegunle",
    source: "Youtube",
    lastLogin: "2 hour ago",
    status: "Called",
  },
  {
    name: "Marvin McKinney",
    email: "john@church.com",
    phone: "0810 123 4567",
    location: "Computer Village",
    source: "Whatsapp",
    lastLogin: "8 hour ago",
    status: "Converted",
  },
  {
    name: "Arlene McCoy",
    email: "john@church.com",
    phone: "0701 234 5678",
    location: "Abule Egba",
    source: "Online Event",
    lastLogin: "1 day ago",
    status: "Messaged",
  },
  {
    name: "Albert Flores",
    email: "john@church.com",
    phone: "0817 890 1234",
    location: "Eko Hotel",
    source: "Others",
    lastLogin: "30 days ago",
    status: "Messaged",
  },
];

const Leads = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg">Leads</h2>
          <p className="text-sm text-muted-foreground">
            Registered leads and their status
          </p>
        </div>
        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground border-b">
            <tr>
              <th className="py-3">User</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th>Source</th>
              <th>Last Login</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((user, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                      <Users size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{user.phone}</td>
                <td>{user.location}</td>
                <td>{user.source}</td>
                <td>{user.lastLogin}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="text-right">
                  {/* {tab === "users" ? (
                    <button className="inline-flex items-center gap-2 border rounded-lg px-3 py-2 text-sm hover:bg-muted">
                      <MessageCircle size={16} /> Message User
                    </button>
                  ) : (
                    <button className="inline-flex items-center gap-2 border rounded-lg px-3 py-2 text-sm hover:bg-muted">
                      Change status
                    </button>
                  )} */}
                  <button className="inline-flex items-center gap-2 border rounded-lg px-3 py-2 text-sm hover:bg-muted">
                    Change status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-center items-center gap-2 mt-6">
          <button className="p-2 rounded-lg border">
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-9 h-9 rounded-lg text-sm font-medium ${
                page === 1
                  ? "bg-yellow-400 text-black"
                  : "border hover:bg-muted"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="p-2 rounded-lg border">
            <ChevronRight size={16} />
          </button>
        </div> */}
    </div>
  );
};

export default Leads;
