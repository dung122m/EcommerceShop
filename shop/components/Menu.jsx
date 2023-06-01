import React, { useState } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import Search from "./Search";
const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Sale", url: "/sale" },
  ];
  const subMenuData = [
    { id: 5, name: "All Products", url: "/category/All" },
    { id: 1, name: "Men", url: "/category/Men" },
    { id: 2, name: "Woman", url: "/category/Woman" },
    { id: 3, name: "Kid", url: "/category/Kid" },
  ];

  return (
    <div>
      <div className="flex items-center justify-center"></div>
      <ul className="hidden md:flex items-center gap-8 font-medium justify-center text-black">
        {data.map((item) => (
          <React.Fragment key={item.id}>
            {!!item.subMenu ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown />

                {showCatMenu && (
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 text-black shadow-lg">
                    {subMenuData.map((submenu) => {
                      return (
                        <Link
                          key={submenu.id}
                          href={submenu.url}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                            {submenu.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="cursor-pointer">
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
