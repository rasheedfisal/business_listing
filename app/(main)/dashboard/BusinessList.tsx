import TitleBorder from "@/components/global/TitleBorder";
import React from "react";
import ListRows from "./ListRows";
import SearchBar from "./SearchBar";

import { findBusiness } from "@/lib/server-actions/business-actions";

const GetBusinesses = async (searchTerm?: string) => {
  try {
    const result = await findBusiness(searchTerm);
    return result;
  } catch (error) {
    console.log(error);
  }
};
const BusinessList = async ({ query }: { query: string }) => {
  const result = await GetBusinesses(query);

  if (!result || result === null) return;
  return (
    <div className="bg-gray-50 w-full px-12 py-6 rounded-md shadow-lg mb-4 max-md:px-4 max-md:py-2">
      <div className="block md:flex md:items-center md:justify-between space-y-2 mb-3">
        <TitleBorder title="Current Businesses" />
        <SearchBar />
      </div>

      {result.length > 0 ? (
        <div className="space-y-2">
          {result.map((biz, i) => (
            <ListRows
              key={i}
              id={biz.id}
              title={biz.title}
              createdAt={biz.createdAt}
              userEmail={biz.userEmail!}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-start items-center py-4 max-md:flex-col max-md:items-start max-md:gap-2">
          <h4 className="text-lg text-primary italic">
            empty business list...
          </h4>
        </div>
      )}
    </div>
  );
};

export default BusinessList;
