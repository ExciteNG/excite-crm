import React from "react";
import Header from "./Header";
import SideNav from "./SideNav";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-[200px_1fr]">
      <SideNav />
      <div className="divide-muted divide-y-2 divide-solid">
        <Header />
        <main className="bg-slate-100/65">{children}</main>
      </div>
    </main>
  );
}
