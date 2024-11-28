import { createClient } from "@/supabase/server";
import { Category } from "@/types";

const getCategory = async (id: string): Promise<Category | null> => {
  const supabase = await createClient();

  // Query the categories table to fetch the category by ID
  const { data, error } = await supabase
    .from("categories") // Table name
    .select("*") // Select all fields or specify only the fields you need
    .eq("id", id) // Filter by id
    .single(); // Use .single() to ensure only one record is returned

  // Handle any errors
  if (error) {
    console.error("Error fetching category:", error.message);
    return null;
  }

  // Return the fetched category or null if no data is found
  return data as Category | null;
};

export default getCategory;
