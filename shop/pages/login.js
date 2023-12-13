import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/router";
// import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCheck } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import axios from "./api/axios";
import { useDispatch } from "react-redux";
// import jwt from "jsonwebtoken";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [validPwd, setValidPwd] = useState(false);
  const [validName, setValidName] = useState(false);
  const userRef = useRef();
  const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,24}|^admin$/;
  const EMAIL_REGEX =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|^adminn$/;
  const router = useRouter();
  const dispatch = useDispatch();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password]);
  useEffect(() => {
    setValidName(EMAIL_REGEX.test(email));
  }, [email]);
  async function handleSubmit(e) {
    e.preventDefault();
    const aceses = localStorage.getItem("accessAdmin");
    let data = JSON.stringify({
      email: email,
      password: password,
    });
    try {
      if (email === "adminn") {
        let dataAdmin = JSON.stringify({
          username: email,
          password: password,
        });
        const response = await axios.post("/admins/login", dataAdmin);
        const accessAdmin = response.data.data.access_token;

        localStorage.setItem("accessAdmin", response.data.data.access_token);
        toast.success("Login successful");
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      } else {
        const response = await axios.post("/auth/login", data); // Gọi API đăng nhập
        const accessToken = response?.data?.data?.access_token;
        localStorage.setItem("access_token", accessToken);

        localStorage.setItem("id", response?.data?.data?.user.id);
        toast.success("Login successful");
        setTimeout(() => {
          router.push("/");
          window.location.href = "/";
        }, 500);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else toast.error(error?.response?.data?.error);
    }
  }

  return (
    <div className="flex justify-center items-center  bg-white">
      <Head>
        <title>Sign in </title>
      </Head>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg"
      >
        <div className="flex justify-center items-center">
          {" "}
          <img
            src="https://i.pinimg.com/736x/8d/62/79/8d6279c04b35d101f029db1e2057a9b5.jpg"
            alt=""
            className="w-[100px] "
          />
        </div>

        <h2 className="text-2xl font-extrabold mb-6 text-center">
          YOUR ACCOUNT FOR EVERYTHING NIKE
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className=" text-gray-700 font-bold mb-2 flex items-center gap-2"
          >
            Email:
            <span className={validName ? "text-green-700 text-xl" : "hidden"}>
              <AiOutlineCheck />
            </span>
            <span
              className={
                validName || !email ? "hidden" : "text-red-600 text-xl"
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            placeholder="Email address"
            className="w-full border border-gray-400 p-2 rounded-md"
          />
          <p
            id="uidnote"
            className={`${
              validName || !email ? "hidden" : "relative"
            } text-red-400 mt-2 text-sm`}
          >
            Please enter a valid email address
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="pwd"
            className=" text-gray-700 font-bold mb-2 flex items-center gap-2"
          >
            Password
            <span className={validPwd ? "text-green-700 text-xl" : "hidden"}>
              <AiOutlineCheck />
            </span>
            <span
              className={
                validPwd || !password ? "hidden" : "text-red-600 text-xl"
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            type="password"
            id="pwd"
            ref={userRef}
            autoComplete="off"
            name="pwd"
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="uidnote"
            placeholder="Password"
            className="w-full border border-gray-400 p-2 rounded-md"
          />
          <p
            id="uidnote"
            className={`${
              validPwd || !password ? "hidden" : "relative"
            } text-red-400 mt-2 text-sm`}
          >
            Password must be at least 8 characters <br />
            Including at least 1 number and 1 letter.
          </p>
        </div>
        <div className="text-center text-xs text-black/[0.7] m-5">
          By logging in, you agree to Nike's Privacy Policy and Terms of Use.
        </div>
        <button
          className={`${
            !email || !password || !validName || !validPwd
              ? "cursor-not-allowed opacity-50 w-full"
              : " "
          }" w-full bg-black text-white p-2 rounded-md active:opacity-75 font-bold active:scale-95  hover:opacity-75 transition-transform "`}
        >
          SIGN IN
        </button>

        <div className="text-center text-sm text-black/[0.7] m-5">
          Not a member ?{" "}
          <span className="text-black underline">
            <Link href="/register"> Join us</Link>
          </span>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
