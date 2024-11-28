"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserItems from "./UserItems";
import Categories from "./Categories";
import getCategories from "@/actions/getCategories";
import { Category } from "@/types";
import { useEffect, useState } from "react";

interface NavbarProps {
  categories: Category[];
}

const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Adjust scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-30 transition-all bg-white/60 backdrop-blur-md shadow-md">
      <div className="py-4 shadow-md">
        <Container>
          <div className="flex flex-row items-center justify-between gap-6">
            <Logo />
            <Search />
            <UserItems />
          </div>
        </Container>
      </div>
      <Categories categories={categories} />
    </div>
  );
};

export default Navbar;
