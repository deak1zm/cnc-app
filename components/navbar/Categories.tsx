"use client";

import CategoryBox from "./CategoryBox";
import Container from "../Container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { usePathname, useSearchParams } from "next/navigation";
import { Category } from "@/types";
import { getIconComponent } from "@/lib/dynamicIcons";

interface CategoriesProps {
  categories: Category[] | null;
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage || !categories) return null;

  return (
    <Container className="relative">
      {/* <div className="absolute inset-0 z-20 border-b bg-gradient-to-r from-background from-[-20%] via-transparent via-50% to-background to-[120%]" /> */}
      <Carousel
        opts={{ align: "start", skipSnaps: true, slidesToScroll: "auto" }}
        className="max-w-[2520px] xl:mx-20 md:mx-10 sm:mx-2 mx-4 my-1  "
      >
        <CarouselContent className="mx-2 h-20 w-full">
          {categories.map((category: Category, index) => {
            const Icon = getIconComponent(category.icon);

            if (!Icon) {
              return null;
            }

            return (
              <CarouselItem key={index} className="basis-20 px-2">
                <CategoryBox
                  category={category}
                  selected={pathname === `/category/${category.id}`}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="z-20" />
        <CarouselNext className="z-20" />
      </Carousel>
    </Container>
  );
};

export default Categories;
