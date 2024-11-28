import getCategories from "@/actions/getCategories";
import getProduct from "@/actions/getProduct";
import ProductModal from "@/components/admin/ProductModal";

export const revalidate = 0;

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  // const product = await getProduct(params.productId);
  const categories = await getCategories();

  return <div className="p-4"></div>;
}
