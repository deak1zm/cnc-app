"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import qs from "query-string";

const Search = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams?.get("categoryId");

  // Debugging logs
  console.log("Value (immediate):", value);
  console.log("Debounced Value:", debouncedValue);
  console.log("Current Category ID:", currentCategoryId);
  console.log("Pathname:", pathname);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "/", // Ensure pathname is valid
        query: {
          // categoryId: currentCategoryId,
          query: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    console.log("Generated URL:", url); // Log the generated URL
    router.push(url);
  }, [debouncedValue, pathname, router]);

  return (
    <div className="relative flex items-center w-full">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="py-6 rounded-full pr-14 pl-6 !ring-0 !focus:ring-0 !focus-visible:ring-0 focus:outline-none"
      />
      {/* Button */}
      <Button
        size="icon"
        className="absolute right-2 rounded-full [&_svg]:size-5"
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
