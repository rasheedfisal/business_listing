import BackButton from "@/components/global/BackButton";
import TitleBorder from "@/components/global/TitleBorder";
import React from "react";
import CreateForm from "./CreateForm";

const page = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 max-md:px-3">
      <div className="w-full bg-gray-50 rounded-md shadow-lg px-12 py-6 max-md:px-4 max-md:py-2">
        <div className="block sm:flex sm:items-start sm:justify-between gap-2">
          <TitleBorder title="Add Business" />
          <BackButton title="Business List" url={`/dashboard`} dir="right" />
        </div>
        <CreateForm />
      </div>
      <br />
    </div>
  );
};

export default page;
