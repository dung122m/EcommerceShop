import React, { useState } from "react";
import Link from "next/link";
const Menu = ({}) => {
  const data = [
    { id: 1, name: "New & Featured", url: "/featured" },
    { id: 2, name: "Men", url: "/men" },
    { id: 3, name: "Women", url: "/women" },
    { id: 4, name: "Kids", url: "/kids" },
    { id: 5, name: "Sale", url: "/sale" },
  ];

  return (
    <div>
      <div className="flex items-center justify-center"></div>
      <ul className="hidden md:flex items-center gap-8 font-medium justify-center text-black">
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <li
              className={` hover:border-b-2 hover:border-black hover:transition hover:duration-300 hover:ease-in)  `}
            >
              <Link href={item?.url}>{item.name}</Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
