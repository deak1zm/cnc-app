import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import grid from "@/public/images/grid.svg";
import getCategories from "@/actions/getCategories";
import Footer from "@/components/landing/Footer";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <>
      <Image
        src={grid}
        alt="Hero Grid"
        fill
        className="-z-20 h-screen object-cover object-top opacity-[0.08] dark:opacity-30"
      />
      <div className="absolute inset-0 -z-20 border-b bg-gradient-to-r from-transparent via-background to-transparent" />
      {categories && <Navbar categories={categories} />}
      {children}
    </>
  );
}
