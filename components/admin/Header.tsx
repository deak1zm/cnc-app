import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <h1 className="text-2xl font-bold text-header sm:text-3xl">{title}</h1>
  );
};

export default Header;
