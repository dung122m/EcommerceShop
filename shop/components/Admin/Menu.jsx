import React from "react";
import Link from "next/link";
const Menu = ({ Tabs }) => {
  return (
    <div className="px-4">
      {Tabs.map((tab) => (
        <div className="px-1 py-2 rounded-md text-white flex items-center gap-x-2 ">
          <Link href={tab.href}>
            <div>{tab.icon}</div>
            <div>{tab.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
