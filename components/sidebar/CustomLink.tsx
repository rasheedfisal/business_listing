import Link from "next/link";
import React from "react";

type Props = {
  path: string;
  title: string;
  icon: JSX.Element;
};

const CustomLink = ({ path, title, icon }: Props) => {
  return (
    <Link
      href={path}
      className="py-2 px-4 flex text-right rounded-md hover:shadow-inner hover:bg-indigo-100 max-md:py-2 max-md:px-2"
    >
      {icon}
      <span className="inline max-md:hidden">&nbsp;&nbsp; {title}</span>
    </Link>
  );
};

export default CustomLink;
