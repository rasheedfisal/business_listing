import TitleBorder from "@/components/global/TitleBorder";
import React from "react";
import db from "@/lib/supabase/db";
import FormatDate from "@/lib/Date";
import { businesses, users } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";
import { Calendar, GripVertical, Mail } from "lucide-react";
import RemoveBusiness from "@/app/(main)/dashboard/RemoveBusiness";
import Link from "next/link";
import ListRows from "./ListRows";

const GetBusinesses = async () => {
  try {
    return await db
      .select({
        id: businesses.id,
        title: businesses.title,
        createdAt: businesses.createdAt,
        userEmail: users.email,
      })
      .from(businesses)
      .innerJoin(users, eq(users.id, businesses.createdBy));
  } catch (error) {
    console.log(error);
  }
};

const BusinessList = async () => {
  const result = await GetBusinesses();
  if (!result) return;
  return (
    <div className="bg-gray-50 w-full px-12 py-6 rounded-md shadow-lg mb-4 max-md:px-4 max-md:py-2">
      <div className="block md:flex md:items-center md:justify-between space-y-2 mb-3">
        <TitleBorder title="Current Businesses" />
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
