import db from "@/lib/supabase/db";
import React from "react";
import UpdateForm from "./UpdateForm";
import { eq } from "drizzle-orm";
import { businesses } from "@/migrations/schema";
import TitleBorder from "@/components/global/TitleBorder";
import BackButton from "@/components/global/BackButton";

type Props = {
  params: {
    bizId: string;
  };
};

const page = async ({ params: { bizId } }: Props) => {
  const result = await db.query.businesses.findFirst({
    where: eq(businesses.id, bizId),
  });
  if (!result) return;

  return (
    <div className="max-w-7xl mx-auto px-6 max-md:px-3">
      <div className="w-full bg-gray-50 rounded-md shadow-lg px-12 py-6 max-md:px-4 max-md:py-2">
        <div className="block sm:flex sm:items-start sm:justify-between gap-2">
          <TitleBorder title="Update Business" />
          <BackButton title="Business List" url={`/dashboard`} dir="right" />
        </div>
        <UpdateForm id={bizId} title={result.title} />
      </div>
      <br />
    </div>
  );
};

export default page;
