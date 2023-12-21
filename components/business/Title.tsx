"use client";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import React from "react";

const Title = () => {
  const { user } = useSupabaseUser();
  if (!user) return;
  return (
    <h2 className="text-2xl font-semibold mt-20 mb-4 max-md:mt-12 max-md:text-xl">
      welcome, {user?.email}
    </h2>
  );
};

export default Title;
