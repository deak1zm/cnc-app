import { createClient } from "@/supabase/server";
import { Product } from "@/types";

const getProduct = async (id: string[]): Promise<Product | null> => {
  const supabase = await createClient();

  // Query the products table to fetch a specific product by id
  const { data, error } = await supabase
    .from("products") // Table name
    .select("*") // Select all fields or specify only the fields you need
    .eq("id", id.toString()) // Filter by id
    .single(); // Ensures only one product is returned

  // Handle any errors
  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }

  return data as Product | null; // Return the fetched product or null
};

export default getProduct;
