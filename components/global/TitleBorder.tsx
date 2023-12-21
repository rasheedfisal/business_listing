import React from "react";
type props = {
  title: string;
};
const TitleBorder = ({ title }: props) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="w-10 border-b-2 border-black mt-1 mb-2"></p>
    </div>
  );
};

export default TitleBorder;
