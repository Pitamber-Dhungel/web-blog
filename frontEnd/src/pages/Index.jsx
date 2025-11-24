import React from 'react'
import { Button } from "@/components/ui/button";
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/helper/getEnv';
import Loading from '@/components/Loading';
import BlogCard from '@/components/BlogCard';

const Index = () => {
  const { data: blogData, loading, error } = useFetch(
      `${getEnv("VITE_API_BASE_URL")}/blog/get-all`,
      {
        method: "get",
        credentials: "include",
      });
      if(loading) return <Loading />
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
  {
    blogData && blogData.blog.length > 0
      ? blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)
      : <div>Data Not Found</div>
  }
</div>
  )
}

export default Index