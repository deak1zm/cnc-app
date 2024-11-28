import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  const routes = [
    {
      href: "/mission",
      label: "About Us",
      target: "",
    },
    {
      href: "/contact",
      label: "Contact Us",
      target: "",
    },
    {
      href: "https://www.termsfeed.com/live/dd84faaa-7df6-4d88-84a6-66a1fcce4a54",
      label: "Privacy Policy",
      target: "_blank",
    },
    {
      href: "https://www.termsfeed.com/live/4418a1d1-977c-4ee9-bab8-dde205a67725",
      label: "Terms & Conditions",
      target: "_blank",
    },
  ];

  return (
    <footer className="flex flex-col gap-8 p-8 pt-96">
      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="flex items-center gap-6">
          {/* <Link href="/" aria-label="Redirect to home">
            <Icons.lightLogo className="z-30 block w-[10.5rem] dark:hidden" />
            <Icons.darkLogo className="z-30 hidden w-[10.5rem] dark:block" />
          </Link> */}
          <SocialIcons />
        </div>
        <Separator className="lg:hidden" />
        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-ful w-fit text-sm font-medium transition-colors hover:text-primary"
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
      <Separator />
      <div className="grid w-full place-content-center">
        <p className="grid max-w-[1000px] text-center text-xs text-foreground">
          © 2024 Ebonwood CNC Co. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
