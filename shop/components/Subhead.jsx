import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FiUser } from "react-icons/fi";
import { resetCart } from "../store/cartSlice";

const Subhead = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Perform localStorage action
    const accessToken = localStorage.getItem("access_token");
    const name = localStorage.getItem("name");
    if (accessToken) {
      setisLoggedIn(true);
      setName(name);
    } else {
      setisLoggedIn(false);
    }
  }, []);

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("userCart");
    localStorage.removeItem("results");
    setisLoggedIn(false);
    dispatch(resetCart());
    router.push("/");
  }

  return (
    <div className="w-full flex justify-center md:justify-end mr-10 pt-2 text-lg ">
      <ul className="flex gap-5  text-xs items-end font-bold  ">
        <Link href="/store">
          <li className="hover:text-neutral-500 ">Find a store</li>
        </Link>
        <Link href="/help">
          <li className="hover:text-neutral-500">Help</li>
        </Link>

        {isLoggedIn ? (
          <div className="flex gap-5 items-center">
            <div
              className={`relative flex hover:cursor-pointer gap-3 px-1 group ${
                isMenuOpen ? "z-10" : ""
              }`}
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <span className="">{name}</span>

              <FiUser className="h-4 w-4 ml-1 cursor-pointer" />
              {isMenuOpen && (
                <ul className="absolute top-full lg:min-w-[200px] transition right-0 duration-300 ease-in-out transform py-5 px-2 text-neutral-500 text-sm bg-white shadow rounded">
                  <li className="text-xl mb-2 text-black">Account</li>
                  <li className="hover:text-black cursor-pointer py-1">
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li className="hover:text-black cursor-pointer py-1 ">
                    <Link href="/orders">Orders</Link>
                  </li>
                  <li
                    className="hover:text-black cursor-pointer py-1"
                    onClick={logout}
                  >
                    Log out
                  </li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-5">
            <Link href="/register">
              <li className="hover:text-orange-600">Join us</li>
            </Link>
            <Link href="/login">
              <li className="hover:text-orange-600">Sign in</li>
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Subhead;
