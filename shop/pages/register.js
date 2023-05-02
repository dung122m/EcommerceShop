import Head from "next/head";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

export default function Register() {
  const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    console.log(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Head>
        <title>Sign Up</title>
      </Head>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </section>
      <form className="w-full max-w-md bg-white p-8 rounded-lg">
        <div className="flex justify-center items-center">
          {" "}
          <img
            src="https://i.pinimg.com/736x/8d/62/79/8d6279c04b35d101f029db1e2057a9b5.jpg"
            alt=""
            className="w-[100px] "
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
            Email :
            <span className={validName ? "text-green-700" : "hidden"}>
              <AiOutlineCheck />
            </span>
            <span className={validName || !user ? "hidden" : "text-red-600"}>
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
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
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
        {/* <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Your Phone Number"
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div> */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>
        <div className="text-center text-xs text-black/[0.7] m-5">
          By creating an account, you agree to Nike's Privacy Policy and Terms
          of Use.
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-md active:opacity-75 font-bold "
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
}
