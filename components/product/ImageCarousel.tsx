"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  productName?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  productName,
}) => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <Carousel className="w-full max-w-xs" setApi={setApi}>
      <CarouselContent className="ml-0">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-0">
            <div className="flex aspect-square">
              <Image
                src={image}
                alt={productName || ""}
                width={300}
                height={300}
                className="h-full w-full object-cover rounded-xl"
                draggable={false}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        onClick={(e) => {
          api?.scrollPrev();
          e.preventDefault();
        }}
        className="left-4 border border-neutral-400"
      />
      <CarouselNext
        onClick={(e) => {
          api?.scrollNext();
          e.preventDefault();
        }}
        className="right-4 border border-neutral-400"
      />
    </Carousel>
  );
};

export default ImageCarousel;
