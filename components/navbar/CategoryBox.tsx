"use client";

import { getIconComponent } from "@/lib/dynamicIcons";
import Link from "next/link";
import { Category } from "@/types";

interface CatergoryBoxProps {
  category: Category;
  selected?: boolean;
}

const CategoryBox: React.FC<CatergoryBoxProps> = ({ category, selected }) => {
  const Icon = getIconComponent(category.icon);

  if (!Icon) {
    return null;
  }

  return (
    <Link
      href={`/category/${category.id}`}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 
      hover:text-neutral-800 hover:border-b-neutral-200 transition cursor-pointer select-none  
      ${
        selected
          ? "border-b-neutral-800 text-neutral-900"
          : "border-transparent text-neutral-700"
      }`}
    >
      <Icon />
      <p className="font-medium text-xs text-center">{category.name}</p>
    </Link>
  );
};

export default CategoryBox;
