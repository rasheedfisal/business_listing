"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Input
      placeholder="search business"
      className="w-44 p-3"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
};

export default SearchBar;
