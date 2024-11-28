import { Star, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SellerInfo() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt="Seller avatar"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">Jane's Pottery</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              4.9 (1,234 reviews)
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-4">
        I've been crafting ceramics for over 10 years. Each piece is made with
        love and attention to detail.
      </p>
      <div className="flex items-center text-sm text-gray-600">
        <Award className="w-4 h-4 mr-1" />
        <span>Star Seller</span>
      </div>
    </div>
  );
}
