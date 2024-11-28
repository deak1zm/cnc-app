import getProduct from "@/actions/getProduct";
import getProducts from "@/actions/getProducts";
import SimilarProducts from "@/components/product/SimilarProducts";
import ProductInfo from "@/components/product/ProductInfo";
import BackButton from "@/components/BackButton";

type Params = Promise<{ productId: any }>;

const ProductPage = async (props: { params: Params }) => {
  const params = await props.params;
  const product = await getProduct(params.productId); // Await fetching product
  const suggestedProducts = await getProducts(); // Await fetching suggested products

  if (!product) return null;

  return (
    <div className="flex flex-col pt-28">
      <BackButton />
      <ProductInfo product={product} />
      <SimilarProducts products={suggestedProducts} />
    </div>
  );
};

export default ProductPage;
