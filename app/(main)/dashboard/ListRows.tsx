"use client";
import { Calendar, Mail, MoreVertical } from "lucide-react";
import Link from "next/link";
import React from "react";
import RemoveBusiness from "./RemoveBusiness";
import FormatDate from "@/lib/Date";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import Loader from "@/components/global/Loader";

type Props = {
  id: string;
  title: string;
  userEmail: string;
  createdAt: string;
};

const ListRows = ({ id, title, userEmail, createdAt }: Props) => {
  const { user } = useSupabaseUser();
  if (!user) return <Loader />;
  return (
    <div key={id} className="block space-y-3">
      <div
        className={`relative group ${user.email !== userEmail ? "hidden" : ""}`}
      >
        <button className={`absolute top-0 right-0`}>
          <MoreVertical className="text-lg relative" />
        </button>
        <div className="absolute top-1 right-6 hidden group-focus-within:grid place-items-center bg-gray-50 min-w-fit py-4 px-2 rounded-md shadow-lg outline outline-2 outline-indigo-200">
          <div className="flex flex-col">
            <Link
              href={`/dashboard/${id}/`}
              className="py-2 px-4 text-left hover:rounded-md hover:shadow-inner hover:bg-indigo-100"
            >
              Update
            </Link>
            <RemoveBusiness id={id} />
          </div>
        </div>
      </div>
      <div className="flex items-start gap-4 max-md:gap-1 max-md:flex-col">
        <div className="flex flex-col gap-1 flex-1">
          <h2 className="text-xl font-semibold text-primary">{title}</h2>
          <div className="flex flex-wrap items-center justify-start gap-3">
            <p className="flex items-center justify-start text-sm">
              <Mail /> &nbsp;&nbsp;
              {userEmail}
            </p>
            <p className="flex items-center justify-start text-sm">
              <Calendar /> &nbsp;&nbsp;
              {FormatDate({
                date: createdAt,
                format: "MM-DD-YYYY",
              })}
            </p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ListRows;
