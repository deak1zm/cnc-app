import { createClient } from "@/supabase/server";
import { Product } from "@/types";

interface GetPublishedProductsProps {
  searchValue?: string, 
};

const getPublishedProducts = async ({searchValue}: GetPublishedProductsProps): Promise<Product[]> => {
  const supabase = await createClient();

  let query = supabase
    .from("products") // Table name
    .select("*") // Select all fields or specify only the fields you need
    .eq("is_published", true) // Filter by published products
    .order("created_at", { ascending: false }); // Order by created_at in descending order

  // If searchValue is provided, filter by name, description, or details using ilike
  if (searchValue) {
    query = query.or(
     `name.ilike.%${searchValue}%,description.ilike.%${searchValue}%`
    );
  }

  // Execute the query
  const { data, error } = await query;

  // Handle any errors
  if (error) {
    console.error("Error fetching products:", error.message);
  }

  return (data as Product[]) || []; // Return the fetched products
};

export default getPublishedProducts;
