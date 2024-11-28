import getProduct from "@/actions/getProduct";
import getProducts from "@/actions/getProducts";
import SimilarProducts from "@/components/product/SimilarProducts";
import ProductInfo from "@/components/product/ProductInfo";
import BackButton from "@/components/BackButton";

type Params = Promise<{ productId: string[] }>;

const ProductPage = async ({ params }: { params: Params }) => {
  const { productId } = await params;
  const product = await getProduct(productId); // Await fetching product

  if (!product) return null;

  return <div className="flex flex-col p-4">{product.name}</div>;
};

export default ProductPage;
