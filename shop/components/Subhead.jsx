import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Subhead = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    // Perform localStorage action
    const accessToken = localStorage.getItem("access_token");
    const storedEmail = localStorage.getItem("email");
    if (accessToken) {
      setisLoggedIn(true);
      setEmail(storedEmail);
    } else {
      setisLoggedIn(false);
    }
  }, []);
  const router = useRouter();

  function logout() {
    localStorage.removeItem("access_token");
    setisLoggedIn(false);
    router.push("/");
  }

  return (
    <div className="w-full flex justify-center md:justify-end  mr-2 pt-2 text-lg ">
      {isLoggedIn ? (
        <div className="">
          <ul className="flex gap-5  text-xs items-end font-medium ">
            <Link href="/store">
              <li className="hover:text-orange-600">Find a store</li>
            </Link>
            <Link href="/help">
              <li className="hover:text-orange-600">Help</li>
            </Link>

            <div className="flex gap-5 hover:cursor-pointer">
              <span>{email}</span>

              <li
                className="hover:text-orange-600 hover:cursor-pointer text-red-600"
                onClick={logout}
              >
                Log out
              </li>
            </div>
          </ul>
        </div>
      ) : (
        <div className="w-full flex justify-center md:justify-end mr-5 mt-2">
          <ul className="flex gap-5  text-xs items-end font-medium ">
            <Link href="/store">
              <li className="hover:text-orange-600">Find a store</li>
            </Link>
            <Link href="/help">
              <li className="hover:text-orange-600">Help</li>
            </Link>

            <div className="flex gap-5">
              <Link href="/register">
                <li className="hover:text-orange-600">Join us</li>
              </Link>
              <Link href="/login">
                <li className="hover:text-orange-600">Sign in</li>
              </Link>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Subhead;
