import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  url: string;
  dir: "left" | "right";
};

const BackButton = ({ title, url, dir }: Props) => {
  return (
    <Link
      href={url}
      className="flex items-center gap-2 py-1 px-2 hover:rounded-md hover:shadow-inner hover:bg-indigo-100"
    >
      {dir === "right" ? (
        <>
          <MoveRight />
          <h2>{title}</h2>
        </>
      ) : (
        <>
          <h2>{title}</h2>
          <MoveLeft />
        </>
      )}
    </Link>
  );
};

export default BackButton;
