import React, { useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import ImageCarousel from "../product/ImageCarousel";

interface ImageUploadProps {
  images: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  disabled,
  onChange,
  onRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClientComponentClient();

  // State for handling the local image preview
  const [selectedImagePreview, setSelectedImagePreview] = useState<
    string | null
  >(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the selected file
    const previewUrl = URL.createObjectURL(file);
    setSelectedImagePreview(previewUrl);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("product_images")
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading file:", error.message);
        setSelectedImagePreview(null); // Reset the preview on error
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("product_images")
        .getPublicUrl(data.path);

      if (publicUrlData) {
        onChange(publicUrlData.publicUrl); // Pass the URL to the parent component
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setSelectedImagePreview(null); // Reset the preview on unexpected error
    }
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <Button
        onClick={handleUploadClick}
        disabled={disabled}
        size="lg"
        variant="outline"
      >
        Select image file
      </Button>
      <ImageCarousel images={images} />
      {/* Display images with delete button */}
      <div className="flex flex-wrap gap-2">
        {images.map((url) => (
          <div key={url} className="relative">
            <Image src={url} alt="Uploaded image" width={100} height={100} />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={() => onRemove(url)} // Pass the image URL to the remove function
              className="absolute top-0 right-0 m-2 w-6 h-6"
            >
              <Trash className="h-1 w-1" />
            </Button>
          </div>
        ))}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
        disabled={disabled}
      />
    </div>
  );
};

export default ImageUpload;
