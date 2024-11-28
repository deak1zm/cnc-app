import getProducts from "@/actions/getProducts";
import Header from "@/components/admin/Header";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/supabase/server";
import { Product } from "@/types";
import { GaugeCircle } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="relative flex h-full -ml-8 w-full flex-col gap-4 p-6 px-4 sm:px-8 lg:px-12">
      <Header title="Products" />
      <Separator />
      <DataTable columns={columns} data={products} />
    </div>
  );
}
