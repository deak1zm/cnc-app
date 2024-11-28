"use client";

import Header from "@/components/admin/Header";
import Container from "@/components/Container";
import ProductGallery from "@/components/product/ProductGalley";
import { Button, buttonVariants } from "@/components/ui/button";
import { Product } from "@/types";
import { Share2, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useState } from "react";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Track if content is expanded

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed); // Toggle expanded state
  };

  const formattedPrice = product.price.toFixed(2);
  const truncatedDescription = product.description.slice(0, 200);

  return (
    <Container className="w-full h-full">
      <div className="flex flex-col md:flex-row gap-8 w-full h-full">
        <ProductGallery images={product.image_paths} />
        <div className="flex flex-col gap-3 flex-grow w-1/5 h-full">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold">${formattedPrice}</p>
          <Collapsible className="relative">
            {isCollapsed ? (
              <p className="text-base text-gray-700">
                {truncatedDescription}...{" "}
                <CollapsibleTrigger asChild onClick={toggleCollapse}>
                  <Button variant="link" className="h-2 p-0 text-base">
                    Learn more
                  </Button>
                </CollapsibleTrigger>
              </p>
            ) : null}
            {!isCollapsed && (
              <CollapsibleContent>
                <p className="text-base text-gray-700">
                  {product.description}
                  <CollapsibleTrigger asChild onClick={toggleCollapse}>
                    <Button variant="link" className="h-2 pl-1 text-base">
                      Show less
                    </Button>
                  </CollapsibleTrigger>
                </p>
              </CollapsibleContent>
            )}
          </Collapsible>

          <div className="p-4 bg-green-100 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Our Guarantees</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                All of our products are made by hand
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Returns & exchanges accepted
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Fast shipping guaranteed
              </li>
            </ul>
          </div>
          <div className="flex space-x-4 mb-6">
            <Link
              href={product.etsy_link}
              className={buttonVariants({
                size: "lg",
                className:
                  "flex-grow bg-red-600 max-w-xs !text-base rounded-full",
              })}
            >
              Purchase on Etsy <SquareArrowOutUpRight />
            </Link>
            {/* <Button size="lg" variant="outline">
            <Heart className="w-5 h-5" />
            <span className="sr-only">Add to favorites</span>
          </Button>
          <Button size="lg" variant="outline">
            <Share2 className="w-5 h-5" />
            <span className="sr-only">Share</span>
          </Button> */}
          </div>
          <div className="border-t border-b py-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <ul className="list-disc list-inside text-gray-700">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          {/* <SellerInfo /> */}
        </div>
      </div>
      {/* <Reviews /> */}
    </Container>
  );
};

export default ProductInfo;
