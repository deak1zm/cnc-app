"use client";

import Link from "next/link";
import { Product } from "@/types";
import { Heart } from "lucide-react";
import ImageCarousel from "./ImageCarousel";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isFavorite = false;

  const formattedPrice = product.price.toFixed(2);

  return (
    <Link
      key={product.id}
      href={`/product/${product.id}`}
      className="group relative flex flex-col"
    >
      <ImageCarousel images={product.image_paths} productName={product.name} />
      <div className="mt-2">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 font-semibold">
          ${formattedPrice} <span className="font-normal"></span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
