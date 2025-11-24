import React, { useEffect, useState } from "react";
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
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { getEnv } from "@/helper/getEnv";
import { showToast } from "@/helper/showToast";
import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";

const CategoryDetails = () => {
  const { data: categoryData, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categoryData && categoryData.category) {
      setCategories(categoryData.category);
    }
  }, [categoryData]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        showToast("success", data.message || "Category deleted");
        setCategories((prev) => prev.filter((c) => c._id !== id));
      } else {
        showToast("error", data.message || "Failed to delete category");
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>Error loading categories</div>;

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to="/category/add">Add Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="hover:bg-green-500 hover:text-white"
                      >
                        <Link to={`/category/edit/${category._id}`}>
                          <FaEdit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDelete(category._id)}
                        variant="outline"
                        className="hover:bg-red-500 hover:text-white"
                      >
                        <MdDeleteSweep />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No categories found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
