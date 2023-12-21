import React from "react";

type Props = {
  children: React.ReactNode;
};

const Template = ({ children }: Props) => {
  return (
    <div className="bg-gray-100 w-full min-h-screen grid place-items-center">
      {children}
    </div>
  );
};

export default Template;
