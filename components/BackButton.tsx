"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import Container from "./Container";

const BackButton = () => {
  const router = useRouter();
  return (
    <Container className="w-full pb-4 ">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        type="button"
        className="text-xs"
      >
        <ArrowLeft size={16} /> Back to search results
      </Button>
    </Container>
  );
};

export default BackButton;
