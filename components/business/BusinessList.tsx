import TitleBorder from "@/components/global/TitleBorder";
import React from "react";
import db from "@/lib/supabase/db";
import FormatDate from "@/lib/Date";
import { businesses, users } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";

const BusinessList = async () => {
  const result = await db
    .select({
      id: businesses.id,
      title: businesses.title,
      createdAt: businesses.createdAt,
      userEmail: users.email,
    })
    .from(businesses)
    .innerJoin(users, eq(users.id, businesses.createdBy));
  console.log(result);

  return (
    <div className="bg-gray-50 w-full px-12 py-6 rounded-md shadow-lg mb-4 max-md:px-4 max-md:py-2">
      <div className="block md:flex md:items-center md:justify-between space-y-2 mb-3">
        <TitleBorder title="Current Businesses" />
      </div>

      {result.length > 0 ? (
        <div className="space-y-2">
          {result.map((biz, i) => (
            <div key={i} className="space-y-1">
              <div className="flex w-full justify-between gap-2">
                <h4 className="text-xl font-semibold flex-grow">{biz.title}</h4>
                <h4 className="text-xl font-normal flex-grow">
                  {biz.userEmail}
                </h4>
                <div className="flex gap-2 items-center content-end">
                  <p>
                    Created At &nbsp;:&nbsp;
                    {FormatDate({
                      date: biz.createdAt,
                      format: "MM-DD-YYYY",
                    })}
                  </p>
                </div>
              </div>
              <hr />
            </div>
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
