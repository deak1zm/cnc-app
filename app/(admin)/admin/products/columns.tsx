"use client";

import { Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ProductId",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "is_published",
    header: "Published",
  },
];
