import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
    } catch (error) {}
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Head>
        <title>Log in </title>
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
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email address"
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>
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
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>
        <div className="text-center text-xs text-black/[0.7] m-5">
          By logging in, you agree to Nike's Privacy Policy and Terms of Use.
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-md active:opacity-75 font-bold "
        >
          SIGN IN
        </button>

        <div className="text-center text-sm text-black/[0.7] m-5">
          Not a member ?{" "}
          <span className="text-black underline">
            <Link href="/signin"> Join us</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
