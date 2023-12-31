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
const NavShipper = () => {
  const inactiveLink = "flex gap-2 items-center p-2";
  const activeLink = inactiveLink + " bg-white text-black rounded-l-lg";
  const router = useRouter();
  const { pathname } = router;
  const handleLogout = () => {
    localStorage.removeItem("accessAdmin");
    localStorage.removeItem("auth");

    router.push("/");
  };
  return (
    <aside className=" p-4 text-white pr-0">
      <Link
        href="/shipper"
        className="flex gap-2 mb-4 font-bold text-lg items-center  text-yellow-300 mr-32 "
      >
        <RiAdminFill size={20} />
        <span>SHIPPER PAGE </span>
      </Link>

      <nav className="flex flex-col gap-4 ">
        <Link
          href={"/shipper"}
          className={pathname == "/shipper" ? activeLink : inactiveLink}
        >
          <BsFillCartFill />
          Dashboard
        </Link>
        <Link
          href={"/shipper/orders"}
          className={pathname.includes("/orders") ? activeLink : inactiveLink}
        >
          <BsFillCartFill />
          Orders
        </Link>
        <Link
          href={"/shipper/settings"}
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

export default NavShipper;
