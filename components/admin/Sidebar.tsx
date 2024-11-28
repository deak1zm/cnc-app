"use client";

import {
  ChevronUp,
  GalleryVerticalEnd,
  Minus,
  Plus,
  User2,
} from "lucide-react";

import { SearchForm } from "@/components/SearchForm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import { buttonVariants } from "../ui/button";
import ProductModal from "./ProductModal";
import { useProductModal } from "@/hooks/use-modal-store";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Active",
          url: "#",
          isActive: true,
        },
        {
          title: "Drafts",
          url: "#",
        },
        {
          title: "Achieved",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      items: [
        {
          title: "All Orders",
          url: "#",
        },
        {
          title: "Pending / Processing",
          url: "#",
        },
        {
          title: "Completed / Fulfilled",
          url: "#",
        },
        {
          title: "Returns / Refunds",
          url: "#",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      items: [
        {
          title: "Customer List",
          url: "#",
        },
        {
          title: "Discount Codes",
          url: "#",
        },
      ],
    },
    {
      title: "Marketing & Content",
      url: "#",
      items: [
        {
          title: "Email Campaigns",
          url: "#",
        },
        {
          title: "Social Media Posts",
          url: "#",
        },
        {
          title: "SEO Tools",
          url: "#",
        },
      ],
    },
    {
      title: "Reports & Analytics",
      url: "#",
      items: [
        {
          title: "Sales Reports",
          url: "#",
        },
        {
          title: "Web Traffic",
          url: "#",
        },
        {
          title: "Material Inventory",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        {
          title: "General Store Settings",
          url: "#",
        },
        {
          title: "Payment Methods",
          url: "#",
        },
        {
          title: "Shipping Settings",
          url: "#",
        },
        {
          title: "Tax Configurations",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const productModal = useProductModal();
  const { user } = useUser();
  // if (!user) return null;
  const userEmail = user?.primaryEmailAddress?.toString() || "";

  return (
    <>
      <Sidebar {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex gap-2 text-sm p-2">
                <UserButton />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Admin Dashboard</span>
                  <span className="text-xs">{userEmail}</span>
                </div>
              </div>
            </SidebarMenuItem>
            <SidebarGroupAction
              onClick={productModal.onOpen}
              asChild
              title="Add Product"
              className={buttonVariants({
                size: "icon",
                variant: "outline",
                className: "h-8 w-8 p-1 mr-1",
              })}
            >
              <Plus />
            </SidebarGroupAction>
          </SidebarMenu>
          <SearchForm />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map((item, index) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={index === 1}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {item.title}{" "}
                        <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={item.isActive}
                              >
                                <a href={item.url}>{item.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
