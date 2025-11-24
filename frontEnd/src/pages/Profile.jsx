import { Card } from "@/components/ui/card";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/helper/showToast";
import { getEnv } from "@/helper/getEnv";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import userImage from "@/assets/images/user.png";
import { useEffect } from "react";
import { FaCamera } from "react-icons/fa6";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { setUser } from "@/redux/user/user.slice";

const Profile = () => {
    const [filePreview,setPreview]=useState();
    const [file,setFile]=useState();
  const user = useSelector((state) => state.user);

  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const dispatch = useDispatch();
  const formSchema = z.object({
    name: z.string().min(3, "name must be atleast 3 character long"),
    email: z.string().email(),
    bio: z.string().min(10, "Bio must be atleast  10 charatcer long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {
        const formData=new FormData()
        formData.append('file',file)
        formData.append('data',JSON.stringify(values))
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`,
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
      dispatch(setUser(data.user));
      //navigate to signin page
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  const handleFileSelection=(files)=>{
    const file=files[0];
    const preview=URL.createObjectURL(file)
    setFile(file)
    setPreview(preview)
  }
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto p-8 border border-gray-200 rounded-2xl bg-white mb-1.5">
      {/* Avatar Section */}
      <div className="flex justify-center mb-6">
        <Dropzone onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Avatar className="w-20 h-20 ring-4 ring-gray-100 shadow-md relative group">
                <AvatarImage src={filePreview? filePreview:userData?.user?.avatar || userImage} />
                <div
                  className="absolute z-50 w-full h-full
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    justify-center items-center bg-opacity-20
    border-2 border-violet-500 rounded-full
    group-hover:flex hidden cursor-pointer"
                >
                  <FaCamera />
                </div>
              </Avatar>
            </div>
          )}
        </Dropzone>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    className="h-11 rounded-xl focus:ring-2 focus:ring-blue-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="h-11 rounded-xl focus:ring-2 focus:ring-blue-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    className="min-h-[120px] rounded-xl focus:ring-2 focus:ring-blue-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter a new password"
                    className="h-11 rounded-xl focus:ring-2 focus:ring-blue-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button */}
          <Button
            type="submit"
            className="w-full h-12 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default Profile;
