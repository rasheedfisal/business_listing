import BusinessList from "@/app/(main)/dashboard/BusinessList";
import Title from "@/components/business/Title";
import React from "react";

type Props = {
  searchParams:
    | {
        query?: string | undefined;
      }
    | undefined;
};

const page = ({ searchParams }: Props) => {
  const query = searchParams?.query || "";
  return (
    <div>
      <div className="max-w-5xl mx-auto max-md:mx-3 max-md:text-[0.95rem]">
        <Title />
        <BusinessList query={query} />
      </div>
    </div>
  );
};

export default page;
