import TitleBorder from "@/components/global/TitleBorder";
import React from "react";
import db from "@/lib/supabase/db";
import FormatDate from "@/lib/Date";
import { businesses, users } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";
import { Calendar, GripVertical, Link, Mail } from "lucide-react";

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
            <div key={biz.id} className="block">
              <div className="relative group">
                <button className="absolute top-0 left-0">
                  <GripVertical className="text-lg relative" />
                </button>
                <div className="absolute top-1 left-6 hidden group-focus-within:grid place-items-center bg-gray-50 min-w-fit py-4 px-2 rounded-md shadow-lg outline outline-2 outline-indigo-200">
                  <div className="flex flex-col">
                    <Link
                      href={`/dashboard/${biz.id}/`}
                      className="py-2 px-4 text-right hover:rounded-md hover:shadow-inner hover:bg-indigo-100"
                    >
                      Update
                    </Link>
                    <button className="py-2 px-4 text-right hover:rounded-md hover:shadow-inner hover:bg-indigo-100">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 max-md:gap-1 max-md:flex-col">
                <div className="flex flex-col gap-1 flex-1">
                  <h2 className="text-xl font-semibold text-primary hover:underline cursor-pointer">
                    {biz.title}
                  </h2>
                  <div className="flex flex-wrap items-center justify-start gap-3">
                    <p className="flex items-center justify-start text-sm">
                      <Mail /> &nbsp;&nbsp;
                      {biz?.userEmail}
                    </p>
                    <p className="flex items-center justify-start text-sm">
                      <Calendar /> &nbsp;&nbsp;
                      {FormatDate({
                        date: biz?.createdAt,
                        format: "MM-DD-YYYY",
                      })}
                    </p>
                  </div>
                </div>
              </div>
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
