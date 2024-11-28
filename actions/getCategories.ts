import { createClient } from "@/supabase/server";
import { Category } from "@/types";

const getCategories = async (): Promise<Category[]> => {
  const supabase = await createClient();

  // Query the categories table to fetch the categories
  const { data, error } = await supabase
    .from("categories") // Table name
    .select("*") // Select all fields or specify only the fields you need
    .order('created_at', {ascending: false});

  // Handle any errors
  if (error) {
    console.error("Error fetching categories:", error.message);
  }

  return (data as Category[]) || []; // Return the fetched categories
};

export default getCategories;
