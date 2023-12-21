import BusinessList from "@/app/(main)/dashboard/BusinessList";
import Title from "@/components/business/Title";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto max-md:mx-3 max-md:text-[0.95rem]">
        <Title />
        <BusinessList />
      </div>
    </div>
  );
};

export default page;
