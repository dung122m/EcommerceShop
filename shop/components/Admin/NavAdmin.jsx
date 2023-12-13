import Link from "next/link";
import React from "react";
import {
  AiFillHome,
  AiFillSetting,
  AiOutlinePoweroff,
  AiOutlineUser,
} from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import {
  MdDevicesOther,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { GiConverseShoe } from "react-icons/gi";
import { BsFillCartFill } from "react-icons/bs";
import { useRouter } from "next/router";
const NavAdmin = () => {
  const inactiveLink = "flex gap-2 items-center p-2";
  const activeLink = inactiveLink + " bg-white text-black rounded-l-lg";
  const router = useRouter();
  const { pathname } = router;
  const handleLogout = () => {
    localStorage.removeItem("accessAdmin");

    // Chuyển hướng về trang home
    router.push("/");
  };
  return (
    <aside className=" p-4 text-white pr-0">
      <Link
        href="/admin"
        className="flex gap-2 mb-4 font-bold text-lg items-center  text-yellow-300 mr-32 "
      >
        <RiAdminFill size={20} />
        <span>ADMIN </span>
      </Link>

      <nav className="flex flex-col gap-4 ">
        <Link
          href={"/admin"}
          className={pathname == "/admin" ? activeLink : inactiveLink}
        >
          <AiFillHome />
          Dashboard
        </Link>
        <Link
          href={"/admin/products"}
          className={pathname.includes("/products") ? activeLink : inactiveLink}
        >
          <GiConverseShoe />
          Products
        </Link>
        <Link
          href={"/admin/orders"}
          className={pathname.includes("/orders") ? activeLink : inactiveLink}
        >
          <BsFillCartFill />
          Orders
        </Link>
        <Link
          href={"/admin/users"}
          className={pathname.includes("/users") ? activeLink : inactiveLink}
        >
          <AiOutlineUser />
          Users
        </Link>
        <Link
          href={"/admin/settings"}
          className={pathname.includes("/settings") ? activeLink : inactiveLink}
        >
          <AiFillSetting />
          Settings
        </Link>{" "}
        <button className="flex gap-2 items-center p-2" onClick={handleLogout}>
          <AiOutlinePoweroff />
          Log out
        </button>
      </nav>
    </aside>
  );
};

export default NavAdmin;
