import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { React, useState, useRef, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "./api/axios";
const Register = () => {
  const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PHONE_REGEX = /^\+?\d{1,2}?\d{9}$/;
  const userRef = useRef();
  const phoneRef = useRef();
  const router = useRouter();
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      phone_number: phone,
      email: user,
      password: pwd,
    });

    try {
      const response = await axios.post("/auth/register", data); // Gọi API đăng ký
      toast.success(response?.data.status);
      router.push("/login");
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error(error?.response?.data?.error);
      }
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(EMAIL_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  return (
    <div className="flex justify-center items-center bg-white">
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
      <Head>
        <title>Sign Up</title>
      </Head>

      <form
        className="w-full max-w-md bg-white p-8 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center items-center">
          {" "}
          <img
            src="https://i.pinimg.com/736x/8d/62/79/8d6279c04b35d101f029db1e2057a9b5.jpg"
            alt=""
            className="w-[100px]"
          />
        </div>

        <h2 className="text-2xl font-extrabold mb-6 text-center">
          BECOME A NIKE MEMBER
        </h2>
        <div className="text-sm text-black/[0.7] mb-6 text-center">
          Create your Nike Member profile and get first access to the very best
          of Nike products, inspiration and community.
        </div>

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
              className={validName || !user ? "hidden" : "text-red-600 text-xl"}
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
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            placeholder="Email address"
            className="w-full border border-gray-400 p-2 rounded-md"
          />
          <p
            id="uidnote"
            className={`${
              validName || !user ? "hidden" : "relative"
            } text-red-400 mt-2 text-sm`}
          >
            Please enter a valid email address
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className=" text-gray-700 font-bold mb-2 flex items-center gap-2"
          >
            Phone Number
            <span className={validPhone ? "text-green-700 text-xl" : "hidden"}>
              <AiOutlineCheck />
            </span>
            <span
              className={
                validPhone || !phone ? "hidden" : "text-red-600 text-xl"
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            type="text"
            id="phone"
            ref={phoneRef}
            autoComplete="off"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            required
            aria-invalid={validPhone ? "false" : "true"}
            aria-describedby="uidnote"
            placeholder="Phone Number"
            className="w-full border border-gray-400 p-2 rounded-md"
          />
          <p
            id="uidnote"
            className={`${
              validPhone || !phone ? "hidden" : "relative"
            } text-red-400 mt-2 text-sm`}
          >
            Please enter a valid phone number
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
              className={validPwd || !pwd ? "hidden" : "text-red-600 text-xl"}
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
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="uidnote"
            placeholder="Password"
            className="w-full border border-gray-400 p-2 rounded-md"
          />
          <p
            id="uidnote"
            className={`${
              validPwd || !pwd ? "hidden" : "relative"
            } text-red-400 mt-2 text-sm`}
          >
            Password must be at least 8 characters <br />
            Including at least 1 number and 1 letter.
          </p>
        </div>
        <div className="text-center text-xs text-black/[0.7] m-5">
          By creating an account, you agree to Nike's Privacy Policy and Terms
          of Use.
        </div>

        <button
          className={`${
            !user || !pwd || !phone || !validName || !validPwd || !validPhone
              ? "cursor-not-allowed opacity-50 w-full"
              : " "
          }" w-full bg-black text-white p-2 rounded-md active:opacity-75 font-bold active:scale-95  hover:opacity-75 transition-transform "`}
        >
          JOIN US
        </button>

        <div className="text-center text-sm text-black/[0.7] m-5">
          Already a Member?
          <span className="text-black underline">
            <Link href="/login"> Sign In.</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
export default Register;
