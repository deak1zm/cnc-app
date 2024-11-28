import getPublishedProducts from "@/actions/getPublishedProducts";
import Container from "@/components/Container";
import Footer from "@/components/landing/Footer";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types";

interface LandingPageProps {
  searchParams: { searchValue?: string };
}

export const revalidate = 0;

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const params = await searchParams;
  const searchValue = params?.searchValue || "";
  const products = await getPublishedProducts({ searchValue });

  return (
    <>
      {products && products.length > 0 ? (
        <Container className="pt-52 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-content-evenly">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Container>
      ) : (
        <div className="pt-60 h-full w-full text-center text-gray-500">
          No products found.
        </div>
      )}
      <Footer />
    </>
  );
}
