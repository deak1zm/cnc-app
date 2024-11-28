import Link from "next/link";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const SocialIcons = () => {
  return (
    <div className="flex w-fit items-center gap-3 text-muted-foreground">
      <Link
        href="https://www.tiktok.com/"
        className="cursor-pointer transition hover:opacity-75"
        target="_blank"
        aria-label="MedStudForty TikTok"
      >
        <FaTiktok className="h-5 w-5" />
      </Link>
      <Link
        href="https://www.youtube.com/"
        className="cursor-pointer transition hover:opacity-75"
        target="_blank"
        aria-label="MedStudForty YouTube"
      >
        <FaYoutube className="h-6 w-6" />
      </Link>
      <Link
        href="https://www.instagram.com/"
        className="cursor-pointer transition hover:opacity-75"
        target="_blank"
        aria-label="MedStudForty Instagram"
      >
        <FaInstagram className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default SocialIcons;
