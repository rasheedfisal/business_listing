"use client";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { actionLogoutUser } from "@/lib/server-actions/auth-actions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  const { user } = useSupabaseUser();
  const router = useRouter();

  const logout = async () => {
    try {
      await actionLogoutUser();
      router.replace("/login");
    } catch (error) {}
  };
  return (
    <div className="absolute bottom-16 md:bottom-5 group">
      <div className="relative">
        <div className="hidden group-focus-within:grid place-items-center bg-gray-50 w-44 py-4 rounded-md shadow-lg outline outline-2 outline-indigo-200 mb-2 max-md:group-focus-within:absolute max-md:bottom-0 max-md:left-0.5 max-md:py-0 max-md:w-fit">
          <div className="flex flex-col gap-1">
            <button
              className="py-2 px-4 flex text-right rounded-md hover:shadow-inner hover:bg-indigo-100 max-md:py-2 max-md:px-[0.6rem]"
              onClick={logout}
            >
              <LogOut />
              <span className="inline max-md:hidden">&nbsp;&nbsp; Logout</span>
            </button>
          </div>
        </div>
      </div>
      <button>
        <img
          src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.email}&backgroundColor=0891b2&scale=83`}
          alt=""
          className="border-2 border-indigo-200 rounded-full w-14 h-14 max-md:w-10 max-md:h-10"
        />
      </button>
    </div>
  );
};

export default Logout;
