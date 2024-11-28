import getCategory from "@/actions/getCategory";
import getProducts from "@/actions/getProducts";
import Header from "@/components/admin/Header";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import ProductCard from "@/components/product/ProductCard";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { notFound } from "next/navigation"; // Import notFound for handling missing category cases

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    searchValue?: string;
  };
}

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: { categoryId: string };
  searchParams: {
    searchValue?: string;
  };
}) => {
  console.log("SearchValue:", searchParams.searchValue);

  // Fetch category and products
  const category = await getCategory(params.categoryId);
  const products = await getProducts(
    params.categoryId,
    searchParams.searchValue
  );

  // If category doesn't exist, return a 404 or a similar response
  if (!category) {
    notFound(); // Use notFound() to show a 404 page
  }

  return (
    <Container className="relative pt-32 flex flex-col items-center h-full">
      <Header title={category.name} />
      <Separator className="mt-4 mb-4" />
      {products.length > 0 ? (
        <>
          <div className="-ml-10 place-self-start">
            <BackButton />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-content-evenly">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <Card className="w-[350px] mt-40">
          <CardHeader>
            <CardTitle className="text-xl">
              Oops sorry! Come back later.
            </CardTitle>
            <CardDescription>
              No products are currently available under this category.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Link
              href="/"
              className={buttonVariants({
                size: "default",
                variant: "default",
              })}
            >
              Return to homepage
            </Link>
          </CardFooter>
        </Card>
      )}
    </Container>
  );
};

export default CategoryPage;
