import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { Separator } from "../ui/separator";
import Container from "../Container";

interface SimilarProductsProps {
  products: Product[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ products }) => {
  return (
    <Container className="py-24">
      <h2 className="text-2xl font-bold my-6">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default SimilarProducts;
