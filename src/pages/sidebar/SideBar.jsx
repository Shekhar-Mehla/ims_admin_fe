import React, { useState } from "react";
import { Home, FileUser, Briefcase, UserRound } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Reusable collapsible menu item with smooth animation
const CollapsibleMenuItem = ({ icon: Icon, title, subItems }) => {
  const [open, setOpen] = useState(false);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setOpen(!open)}
        className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span>{title}</span>
          </div>
          {/* Smooth rotating arrow */}
          <span
            className={`transform transition-transform duration-200 ${
              open ? "rotate-90" : "rotate-0"
            }`}
          >
            ▸
          </span>
        </div>
      </SidebarMenuButton>

      {open && (
        <div className="ml-6 flex flex-col gap-1 mt-1">
          {subItems.map((subItem) => (
            <SidebarMenuItem key={subItem.title}>
              <SidebarMenuButton asChild>
                <a
                  href={subItem.url}
                  className="block px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {subItem.title}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </div>
      )}
    </SidebarMenuItem>
  );
};

const SideBar = () => {
  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Users", url: "/users", icon: UserRound },
  ];

  const collapsibleItems = [
    {
      title: "Internship",
      icon: Briefcase,
      subItems: [
        { title: "List Internship", url: "/allinternships" },
        { title: "Create Internship", url: "/create_internship" },
      ],
    },
    {
      title: "Applications",
      icon: FileUser,
      subItems: [
        { title: "List Applications", url: "/applications" },
        { title: "Create Application", url: "/create_application" },
      ],
    },
  ];

  return (
    <Sidebar className="block" collapsible="icon">
      <SidebarContent>
        <div className="p-2">
          <SidebarTrigger className="absolute top-2 right-2" />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Regular items */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Collapsible items */}
              {collapsibleItems.map((item) => (
                <CollapsibleMenuItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  subItems={item.subItems}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
