import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main className="bg-indigo-50 w-full min-h-screen overflow-hidden">
      <section className="flex">
        <div className="min-w-fit">
          <Sidebar />
        </div>
        <div className="flex-grow h-screen overflow-y-scroll">
          <section className="mt-3">{children}</section>
        </div>
      </section>
    </main>
  );
};

export default layout;
