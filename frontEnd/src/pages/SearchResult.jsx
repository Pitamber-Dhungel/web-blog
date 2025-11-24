import BlogCard from '@/components/BlogCard'
import { getEnv } from '@/helper/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import {useSearchParams} from 'react-router-dom'

const SearchResult = () => {
    
    const [searchParams]=useSearchParams()
    const q=searchParams.get('q')
    const { data: blogData, loading, error } = useFetch(
          `${getEnv("VITE_API_BASE_URL")}/blog/search?q=${q}`,
          {
            method: "get",
            credentials: "include",
          });
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
  )
}

export default SearchResult