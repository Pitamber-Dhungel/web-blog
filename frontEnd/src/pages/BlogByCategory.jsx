import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';
import { getEnv } from '@/helper/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react';
import { useParams } from 'react-router-dom';

const BlogByCategory = () => {
  const { category } = useParams();

  const { data: blogData, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`,
    {
      method: "GET",
      credentials: "include",
    },[category]
  );

  if (loading) return <Loading />;

  return (
    <div className='grid grid-cols-3 gap-10'>
      {blogData?.blog?.length > 0 ? (
        blogData.blog.map((blog, index) => (
          <BlogCard key={index} props={blog} />
        ))
      ) : (
        <div>Data Not Found.</div>
      )}
    </div>
  );
};

export default BlogByCategory;
