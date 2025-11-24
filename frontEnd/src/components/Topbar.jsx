import React from "react";
import logo from "@/assets/images/blog_logo.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { RiLoginBoxLine } from "react-icons/ri";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/images/user.png";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helper/showToast";
import { getEnv } from "@/helper/getEnv";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        { method: "GET", credentials: "include" }
      );
      const data = await response.json();
      if (!response.ok) return showToast("error", data.message);
      dispatch(removeUser());
      showToast("success", data.message);
      navigate("/");
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <div className="flex justify-between items-center w-full h-16 px-6 bg-white shadow-md border-b z-50">
      {/* Logo */}
      <div className="flex items-center w-1/4">
        <img src={logo} alt="Logo" className="w-36 h-15" />
      </div>

      {/* Search */}
      <div className="w-2/4 px-4 hidden md:block">
        <Search />
      </div>

      {/* User Actions */}
      <div className="w-1/4 flex justify-end items-center space-x-4">
        {!user.isLoggedIn ? (
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
            <Link to="/signin" className="flex items-center gap-2">
              <RiLoginBoxLine size={20} />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer ring-2 ring-gray-200 shadow-sm">
                <AvatarImage src={user.user.avatar || usericon} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60 p-2">
              <DropdownMenuLabel>
                <p className="font-semibold">{user.user.name}</p>
                <p className="text-sm text-gray-500">{user.user.email}</p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="hover:bg-gray-100 rounded-md">
                <Link to="/profile" className="flex items-center gap-2">
                  <FaUserCircle />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="hover:bg-gray-100 rounded-md">
                <Link to="/blog/add" className="flex items-center gap-2">
                  <FaPlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-start gap-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <TbLogout />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;

