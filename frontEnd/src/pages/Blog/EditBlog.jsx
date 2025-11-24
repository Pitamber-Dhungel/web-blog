import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import { showToast } from "@/helper/showToast";
import { getEnv } from "@/helper/getEnv";
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {decode} from 'entities'
import Loading from "@/components/Loading";
import { useParams } from "react-router-dom";

const EditBlog = () => {
    const {blogid}=useParams()
    const navigate=useNavigate()
    const user=useSelector((state)=>state.user)
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const {
    data: categoryData,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  });

  const {data:blogData,loading:blogLoading}=useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/edit/${blogid}`, {
    method: "get",
    credentials: "include",
  },[blogid])

  console.log(blogData)

  const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 character long"),
    category: z.string().min(3, "category is required"),
    slug: z.string().min(3, "Slug must be at least 3 character long"),
    blogContent: z
      .string()
      .min(3, "Blog content must be at least 3 character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      slug: "",
      blogContent: "",
    },
  });

  useEffect(()=>{
    if(blogData){
        setPreview(blogData.blog.featuredImage)
        form.setValue('category',blogData.blog.category._id)
        form.setValue('title',blogData.blog.title)
        form.setValue('slug',blogData.blog.slug)
        form.setValue('blogContent',decode(blogData.blog.blogContent || ''))
    }
  },[blogData])

const handleEditorData=(event,editor)=>{
    const data=editor.getData()
    form.setValue('blogContent',data)
}

  const blogTitle = form.watch("title");
  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  async function onSubmit(values) {
    try {
            const formData=new FormData()
            formData.append('file',file)
            formData.append('data',JSON.stringify(values))
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/blog/update/${blogid}`,
            {
              method: "PUT",
              credentials: "include",
              body: formData,
            }
          );
          const data = await response.json();
          if (!response.ok) {
            showToast("error", data.message);
            return;
          }
          form.reset()
          setFile()
          setPreview()
          showToast("success", data.message);
          navigate("/blog");
        } catch (error) {
          showToast("error", error.message);
        }
  }
  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };
  if(blogLoading) return <Loading />
  return (
    <div className="">
      <Card className="pt-5 max-w-screen-md mx-auto">
        <CardContent>
            <h1 className="text-2xl font-bold mb-4 text-center">Edit Blog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category:</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryData &&
                              categoryData.category.length > 0 &&
                              categoryData.category.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title:</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug:</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <span className="mb-2 block">Featured Image</span>
                <div>
                  <Dropzone
                    onDrop={(acceptedFiles) =>
                      handleFileSelection(acceptedFiles)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="flex justify-center items-center w-36 h-30 border-2 border-dashed">
                          <img src={filePreview} alt="" />
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <div className="border rounded-md p-2 w-full min-h-[300px] overflow-hidden">
                          <Editor props={{ initialData:field.value, onChange: handleEditorData }} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBlog;
