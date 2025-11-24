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
import React from "react";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom'
import { showToast } from "@/helper/showToast";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helper/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";

const Signin = () => {
  const dispatch =useDispatch();
    const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "Password must be at least 3 character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

 async function onSubmit(values) {
    try {
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials:'include',
              body: JSON.stringify(values),
            }
          );
          const data = await response.json();
          if (!response.ok) {
            showToast("error", data.message);
            return;
          }
          dispatch(setUser(data.user))
          //navigate to signin page
          showToast("success", data.message);
          navigate("/");
        } catch (error) {
          showToast("error", error.message);
        }
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[400px] p-6">
        <h1 className="text-2xl font-bold text-center mb-1">
          Enter Your Login Id
        </h1>
        <div>
            <GoogleLogin />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <Input type="password"
                        placeholder="Enter your password here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
           <div>
             <Button type="submit" className="w-full">
              Sign In
            </Button>
            <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>Don&apos;t have account?</p>
                <Link to='/signup' className="text-blue-500">Sign Up</Link>
            </div>
           </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signin;
