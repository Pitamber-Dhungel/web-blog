import React, { useState } from 'react';
import { FaRegCommentDots } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from './ui/button';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getEnv } from '@/helper/getEnv';
import { showToast } from '@/helper/showToast';
import { Textarea } from './ui/textarea';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import CommentList from './CommentList';

const Comment = ({ props }) => {

  const [newComments, setNewComments] = useState([]); // store all new comments
  const user = useSelector((state) => state.user);

  const formSchema = z.object({
    comment: z.string().min(3, "Comment must be at least 3 characters."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { comment: "" },
  });

  async function onSubmit(values) {
    try {
      const newValues = {
        ...values,
        blogid: props.blogid,
        author: user.user._id,
      };

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/comment/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newValues),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }

      // Add new comment to list without replacing old ones
      setNewComments((prev) => [...prev, data.comment]);

      form.reset();
      showToast("success", data.message);

    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div>
      <h4 className="flex items-center gap-2 text-2xl font-bold">
        <FaRegCommentDots className="text-violet-500" /> Comment
      </h4>

      {user && user.isLoggedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type your comment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      ) : (
        <Button asChild>
          <Link to="/signin">Sign In</Link>
        </Button>
      )}

      <div className="mt-5">
        <CommentList props={{ blogid: props.blogid, newComments }} />
      </div>
    </div>
  );
};

export default Comment;

