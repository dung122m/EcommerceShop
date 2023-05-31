import React, { useState } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
const MenuMobile = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,
}) => {
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
      <ul className="flex flex-col md:hidden font-semibold absolute top-[125px] left-0 w-full h-[calc(100vh - 50px)] bg-white border-t text-black">
        {data.map((item) => (
          <React.Fragment key={item.id}>
            {!!item.subMenu ? (
              <li
                className="cursor-pointer justify-center items-center py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-center items-center gap-2 ">
                  {" "}
                  {item.name}
                  <BsChevronDown />
                </div>

                {showCatMenu && (
                  <ul className="bg-black/[0.05] flex flex-col items-center s-mx-5 mt-4 -mb-4">
                    {subMenuData.map((submenu) => {
                      return (
                        <Link
                          key={submenu.id}
                          href={`/category/${submenu.name}`}
                          onClick={() => {
                            setShowCatMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {submenu.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="py-4 px-5 border-b">
                <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default MenuMobile;
