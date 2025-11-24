import React from 'react'
import { Button } from './ui/button'
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '@/helper/firebase';
import { getEnv } from '@/helper/getEnv';
import { showToast } from '@/helper/showToast';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const GoogleLogin = () => {
  const dispatch =useDispatch();
  const navigate = useNavigate();
    const handleGoogleLogin=async()=>{ 
        try {
                  const googleResponse=await signInWithPopup(auth, provider);
                  const {displayName, email, photoURL}=googleResponse.user;
                  const values={
                    name:displayName,
                    email:email,
                    avatar:photoURL
                  }
                  const response = await fetch(
                    `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
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
    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
        <FaGoogle/>Continue With Google</Button>
  )
}

export default GoogleLogin