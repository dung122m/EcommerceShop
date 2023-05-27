import Link from "next/link";
import React from "react";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import {
  MdDevicesOther,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { GiConverseShoe } from "react-icons/gi";
import { BsFillCartFill } from "react-icons/bs";
const NavAdmin = () => {
  return (
    <aside className="pr-20 p-4 text-white">
      <Link
        href="/admin"
        className="flex gap-2 mb-4 font-bold text-lg items-center text-yellow-300 "
      >
        <RiAdminFill size={20} />
        <span>ADMIN</span>
      </Link>

      <nav className="flex flex-col gap-4 ">
        <Link href={"/admin"} className="flex gap-2 items-center">
          <AiFillHome />
          Dashboard
        </Link>
        <Link href={"/admin"} className="flex gap-2 items-center">
          <GiConverseShoe />
          Product
        </Link>
        <Link href={"/admin"} className="flex gap-2 items-center">
          <BsFillCartFill />
          Orders
        </Link>
        <Link href={"/admin"} className="flex gap-2 items-center">
          <AiFillSetting />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default NavAdmin;
