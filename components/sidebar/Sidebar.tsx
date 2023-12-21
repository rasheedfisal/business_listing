import { BookPlus, LayoutGrid } from "lucide-react";
import React from "react";
import CustomLink from "./CustomLink";
import Logout from "./Logout";

const Sidebar = () => {
  return (
    <div
      className="bg-gray-50 min-w-full px-4 py-2 flex flex-col gap-1 sticky top-0 h-screen max-md:items-center max-md:px-2"
      style={{
        boxShadow:
          "4px 0 6px -1px rgb(0 0 0 / 0.1),2px 0 4px -2px rgb(0 0 0 / 0.1)",
      }}
    >
      {/* <img
        src="/hireflash.png"
        alt=""
        className="w-44 h-auto mt-2 mb-5 max-md:hidden"
      /> */}
      <span className="mt-2 mb-5 max-md:hidden text-2xl font-bold">
        Biz List
      </span>
      <img
        src="https://img.icons8.com/?size=100&id=rAyFE7C2Av8s&format=png&color=22C3E6"
        alt=""
        className="w-8 h-auto mt-2 mb-5 md:hidden"
      />
      <div className="group relative">
        <button className="py-2 px-4 flex text-right rounded-md hover:shadow-inner hover:bg-indigo-100 group w-full max-md:py-2 max-md:px-2 max-md:text-lg">
          <LayoutGrid />
          <span className="max-md:hidden">&nbsp;&nbsp;Business</span>
        </button>
        <div className="relative top-2 hidden group-focus-within:grid place-items-center bg-gray-50 w-44 py-4 rounded-md shadow-lg outline outline-2 outline-indigo-200 mb-4 max-md:py-0 max-md:w-full">
          <div className="flex flex-col gap-1">
            <CustomLink
              path={`dashboard/new`}
              title="Create"
              icon={<BookPlus />}
            />
          </div>
        </div>
      </div>

      <Logout />
    </div>
  );
};

export default Sidebar;
