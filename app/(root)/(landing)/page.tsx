import getPublishedProducts from "@/actions/getPublishedProducts";
import Container from "@/components/Container";
import Footer from "@/components/landing/Footer";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [query: string]: string | string[] | undefined }>;

export const revalidate = 0;

export default async function LandingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { query } = await searchParams;

  const searchValue = Array.isArray(query)
    ? query[0] // Use the first value if it's an array
    : query || ""; // Use the string value or an empty string as fallback

  console.log("****LOG:", searchValue);

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
