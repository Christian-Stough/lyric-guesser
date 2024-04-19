import React from "react";
import TopNav from "./_components/TopNav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen grid-rows-[auto,1fr]">
      <TopNav />
      {children}
    </div>
  );
}
