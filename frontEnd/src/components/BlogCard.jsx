import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage } from './ui/avatar';
import { FaCalendarAlt } from "react-icons/fa";
import usericon from '@/assets/images/user.png'
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helper/RouterName';

const BlogCard = ({ props }) => {
  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
      <Card className="overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white">
        <CardContent className="p-4">

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src={props.author.avatar || usericon} />
              </Avatar>
              <span className="font-medium text-gray-700">{props.author.name}</span>
            </div>

            {props.author.role === "admin" && (
              <Badge className="bg-violet-500 text-white border-none">Admin</Badge>
            )}
          </div>

          <div className="w-full">
            <img
              src={props.featuredImage}
              alt=""
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div className="mt-4">
            <p className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <FaCalendarAlt />
              <span>{moment(props.createdAt).format("DD-MM-YYYY")}</span>
            </p>

            <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 hover:text-violet-600 transition">
              {props.title}
            </h2>
          </div>

        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
