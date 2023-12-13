import React from "react";
import Menu from "./Menu";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { GiConverseShoe } from "react-icons/gi";
import { FaBox } from "react-icons/fa";

const Tabs = [
  { icon: <FaHome />, name: "Home", current: true, href: "/admin" },
  { icon: <FaRegUser />, name: "Users", current: true, href: "/admin/orders" },
  { icon: <FaBox />, name: "Orders", current: true, href: "/orders" },
  {
    icon: <GiConverseShoe />,
    name: "Products",
    current: true,
    href: "/orders",
  },
];
const Sidebar = () => {
  return (
    <div className="bg-indigo-600 h-full w-full overflow-hidden px-4 py-10">
      <Menu Tabs={Tabs} />
    </div>
  );
};

export default Sidebar;
