import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
const MenuMobile = ({ setMobileMenu }) => {
  const data = [
    { id: 0, name: "Home", url: "/" },
    { id: 1, name: "New & Featured", url: "/featured" },
    { id: 2, name: "Men", url: "/men" },
    { id: 3, name: "Women", url: "/women" },
    { id: 4, name: "Kids", url: "/kids" },
    { id: 5, name: "Sale", url: "/sale" },
  ];
  const [select, setSelect] = useState("");
  return (
    <div>
      <ul className="flex flex-col md:hidden font-semi absolute bg-white top-[80px] left-0 w-full h-[calc(100vh - 70px)] border-t">
        {data.map((item) => (
          <React.Fragment key={item.name}>
            <li
              className={`border-b px-4 py-4 flex flex-col hover:text-red-600 hover:transition hover:duration-300 hover:ease-in)  ${
                item.name === select ? "text-red-600" : ""
              }`}
              onClick={() => setSelect(item.name)}
            >
              <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                {item.name}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default MenuMobile;
