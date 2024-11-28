import { Bell, ChevronDown, Heart } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserItems = () => {
  return (
    <div className="flex gap-1 items-center justify-between">
      <Button size="icon" variant="ghost" className="[&_svg]:size-6 w-12 h-12">
        <Heart />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
            className: "[&_svg]:size-6 w-12 h-12",
          })}
        >
          <Bell />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button size="default" variant="outline">
        Contact us
      </Button>
    </div>
  );
};

export default UserItems;
