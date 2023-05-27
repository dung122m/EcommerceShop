import React, { useState } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Sale", url: "/sale" },
  ];
  const subMenuData = [
    { id: 1, name: "Men", doc_count: 11 },
    { id: 2, name: "Woman", doc_count: 12 },
    { id: 3, name: "Kid", doc_count: 13 },
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
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
                    {categories.map((submenu) => {
                      return (
                        <Link
                          key={submenu.id}
                          href={`/category/${submenu.name.replace(
                            /\s+/g,
                            "-"
                          )}`}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                            {submenu.name}
                            {/* <span className="opacity-50 text-sm">
                              {submenu.doc_count}
                            </span> */}
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
