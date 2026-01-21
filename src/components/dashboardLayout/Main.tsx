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
      <div className="">
        <Header />
        <section>{children}</section>
      </div>
    </main>
  );
}
//  className={`antialiased h-[calc(100vh-48px)] overflow-y-auto px-4 pb-4 bg-slate-100/65`}

{
  /* <footer className="h-12 bg-white">
    <section
      className={`antialiased h-[calc(100vh-96px)] overflow-y-auto px-4 pb-4 bg-slate-100/65`}
    >
      {children}
    </section>
    {/* <footer className="h-12 bg-white">
      <FootPagination />
    </footer> */
}
