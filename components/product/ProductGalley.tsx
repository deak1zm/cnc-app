"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-row gap-2 w-1/2 overflow-none rounded-l-xl ">
      <div className="relative flex flex-col gap-2 w-full">
        <Image
          src={mainImage}
          alt="Main product image"
          fill
          className="object-cover aspect-square rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2 ">
        {images.map((image, index) => (
          <button
            key={index}
            className="relative rounded-md overflow-y-scroll w-16 h-16 focus:outline-none focus:ring-2 focus:ring-gray-800"
            onClick={() => setMainImage(image)}
          >
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              fill
              className="object-cover rounded-md aspect-square focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
