import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/Layout/Layout";
import Index from "@/pages/Index";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import Profile from "@/pages/Profile";
import AddCategory from "@/pages/Category/AddCategory";
import CategoryDetails from "@/pages/Category/CategoryDetails";
import EditCategory from "@/pages/Category/EditCategory";
import AddBlog from "@/pages/Blog/AddBlog";
import BlogDetails from "@/pages/Blog/BlogDetails";
import EditBlog from "@/pages/Blog/EditBlog";
import SingleBlogDetails from "@/pages/SingleBlogDetails";
import {RouteBlogByCategory, RouteBlogDetails, RouteSeacrh} from '@/helper/RouterName'
import BlogByCategory from "@/pages/BlogByCategory";
import SearchResult from "@/pages/SearchResult";

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />

           <Route path="/profile" element={<Profile />} />

          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/categories" element={<CategoryDetails />} />
          <Route path="/category/edit/:category_id" element={<EditCategory />} />

          <Route path="/blog/add" element={<AddBlog />} />
          <Route path="/blog" element={<BlogDetails />} />
          <Route path="/blog/edit/:blogid" element={<EditBlog />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSeacrh()} element={<SearchResult />} />

        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;