import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/images/blog_logo.png";
import { FaHome, FaBlog, FaUserCog } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaComments } from "react-icons/fa6";
import { GoDot } from "react-icons/go";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helper/getEnv";
import { RouteBlogByCategory } from "@/helper/RouterName";

const AppSidebar = () => {
  const { data: categoryData} = useFetch(
      `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
      {
        method: "get",
        credentials: "include",
      }
    );
  return (
    <Sidebar className="h-full bg-white border-r border-gray-200 shadow-lg">
      {/* Logo */}
      <SidebarHeader className="flex justify-center py-6 bg-white border-b border-gray-200">
      </SidebarHeader>

      <SidebarContent className="bg-white pt-6">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-blue-50 rounded-lg">
                <FaHome />
                <Link to="">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-blue-50 rounded-lg">
                <BiSolidCategoryAlt />
                <Link to="/categories">Categories</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-blue-50 rounded-lg">
                <FaBlog />
                <Link to="/blog">Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-blue-50 rounded-lg">
                <FaComments />
                <Link to="">Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-blue-50 rounded-lg">
                <FaUserCog />
                <Link to="/profile">Users</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500">Categories</SidebarGroupLabel>
          <SidebarMenu>
            {
              categoryData && categoryData.category.length>0 && categoryData.category.map(category=><SidebarMenuItem key={category._id}>
              <SidebarMenuButton className="hover:bg-blue-50 rounded-lg">
                <GoDot />
                <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>)
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-white border-t border-gray-200 h-16" />
    </Sidebar>
  );
};

export default AppSidebar;
