import getProduct from "@/actions/getProduct";
import getProducts from "@/actions/getProducts";
import Header from "@/components/admin/Header";
import Container from "@/components/Container";
import ProductGallery from "@/components/product/ProductGalley";
import ProductCard from "@/components/product/ProductCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Product } from "@/types";
import { Heart, Share2, SquareArrowOutUpRight, Star } from "lucide-react";
import SellerInfo from "@/components/product/SellerInfo";
import SimilarProducts from "@/components/product/SimilarProducts";
import Link from "next/link";
import ProductInfo from "@/components/product/ProductInfo";
import BackButton from "@/components/BackButton";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { productId } = await params;

  const product = await getProduct(productId);
  const suggestedProducts = await getProducts();

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
