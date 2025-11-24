import { getEnv } from "@/helper/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import Loading from "./Loading";
import { Avatar, AvatarImage } from "./ui/avatar";
import moment from "moment";
import usericon from "@/assets/images/user.png";
import { useSelector } from "react-redux";

const CommentList = ({ props }) => {
  const user = useSelector((state) => state.user);

  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get/${props.blogid}`,
    { method: "get", credentials: "include" }
  );

  if (loading) return <Loading />;

  const totalComments =
    (data?.comments?.length || 0) + (props.newComments?.length || 0);

  return (
    <div>
      <h4 className="text-2xl font-bold">{totalComments} Comments</h4>

      <div className="mt-5">

        {/* Show newly added comments */}
        {props.newComments &&
          props.newComments.map((comment) => (
            <div key={comment._id} className="flex gap-2 mb-4 bg-gray-50 p-3 rounded">
              <Avatar>
                <AvatarImage src={user?.user?.avatar || usericon} />
              </Avatar>

              <div>
                <p className="font-semibold">{user?.user?.name}</p>
                <p className="text-sm text-gray-500">
                  {moment(comment.createdAt).format("DD-MM-YYYY")}
                </p>
                <div className="pt-3">{comment.comment}</div>
              </div>
            </div>
          ))}

        {/* Existing comments from database */}
        {data?.comments?.map((comment) => (
          <div key={comment._id} className="flex gap-2 mb-4">
            <Avatar>
              <AvatarImage src={comment.author.avatar || usericon} />
            </Avatar>

            <div>
              <p className="font-semibold">{comment.author.name}</p>
              <p className="text-sm text-gray-500">
                {moment(comment.createdAt).format("DD-MM-YYYY")}
              </p>
              <div className="pt-3">{comment.comment}</div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CommentList;
