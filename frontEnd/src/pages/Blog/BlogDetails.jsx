
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helper/getEnv";
import { showToast } from "@/helper/showToast";
import Loading from "@/components/Loading";
import { deleteData } from "@/helper/handleDelete";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import moment from "moment/moment";


const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false);

  const { data: blogData, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-all`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  // DELETE FUNCTION
 const handleDelete = (id) => {
  const response = deleteData(
    `${getEnv('VITE_API_BASE_URL')}/blog/delete/${id}`
  );

  if (response) {
    setRefreshData(!refreshData);
    showToast('success', 'Data deleted.');
  } else {
    showToast('error', 'Data not deleted.');
  }
};
console.log(blogData)
  if (loading) return <Loading />;
  if (error) return <div>Error loading blogs</div>;

  return (
    <div>
      <Card>
        <CardHeader>
          <Button asChild>
            <Link to="/blog/add">Add Blog</Link>
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {blogData && blogData.blog.length > 0 ? (
                blogData.blog.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog?.author?.name}</TableCell>
                    <TableCell>{blog?.category.name}</TableCell>
                    <TableCell>{blog?.title}</TableCell>
                    <TableCell>{blog?.slug}</TableCell>
                    <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          asChild
                          variant="outline"
                        >
                          <Link to={`/blog/edit/${blog._id}`}><FaEdit /></Link>
                        </Button>

                        <Button
                          onClick={() => handleDelete(blog._id)}
                          variant="outline"
                          className="hover:bg-red-500 hover:text-white"
                        >
                          <MdDeleteSweep />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>No blogs found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
