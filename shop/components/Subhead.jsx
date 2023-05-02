import Link from "next/link";
import React from "react";

const Subhead = () => {
  const data = [
    { id: 1, name: "Find a store ", url: "/store" },
    { id: 2, name: "Help ", url: "/help" },
    { id: 3, name: "Join us ", url: "/register" },
    { id: 4, name: "Sign in", url: "/login" },
  ];
  return (
    <div className="w-full flex justify-center md:justify-end mr-5 mt-2">
      <ul className="flex gap-5  text-xs items-end font-medium ">
        {data.map((item) => (
          <Link href={item.url}>
            <li className="hover:text-orange-600" key={item.id}>
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Subhead;
