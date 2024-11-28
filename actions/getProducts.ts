import { createClient } from "@/supabase/server";
import { Product } from "@/types";

const getProducts = async (categoryId?: string, searchValue?: string): Promise<Product[]> => {
  const supabase = await createClient();

  let query = supabase
    .from("products") // Table name
    .select("*") // Select all fields or specify only the fields you need
    .order('created_at', { ascending: false }); // Order by created_at by default

  // If categoryId is provided, filter by category
  if (categoryId) {
    query = query.contains('categories', [categoryId]);
  }

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

export default getProducts;
