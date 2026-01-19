import React from "react";
import Header from "./Header";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      <Header />
      <section
        className={`antialiased h-[calc(100vh-48px)] overflow-y-auto px-4 pb-4 bg-slate-100/65`}
      >
        {children}
      </section>
    </main>
  );
}

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
