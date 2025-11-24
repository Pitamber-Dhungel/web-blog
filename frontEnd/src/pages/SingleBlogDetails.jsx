import Loading from '@/components/Loading';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getEnv } from '@/helper/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react';
import { useParams } from "react-router-dom";
import { decode } from 'entities';
import Comment from '@/components/Comment';

const SingleBlogDetails = () => {
  const { blog } = useParams();

  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  if (loading) return <Loading />;

  return (
    <div className='flex justify-between gap-20'>
      {data && data.blog && (
        <div className='border rounded w-[90%] p-5'>
          
          <h1 className='text-2xl font-bold mb-5'>{data.blog.title}</h1>

          <div className='flex items-center gap-5'>
            <Avatar>
              <AvatarImage src={data.blog.author.avatar} />
            </Avatar>
            <span>{data.blog.author.name}</span>
          </div>

          <div className='my-5'>
            <img
              src={data.blog.featuredImage}
              alt=""
              className='rounded h-[400px] w-4/5'
            />
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: data.blog.blogContent ? decode(data.blog.blogContent) : ""
            }}
          />

          <div className="border-t mt-5 pt-5">
            <Comment props={{ blogid: data.blog._id }} />
          </div>

        </div>
      )}

    </div>
  );
};

export default SingleBlogDetails;
