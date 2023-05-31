import React, { useState, useEffect, useContext } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import Subhead from "./Subhead";
import MenuMobile from "./MenuMobile";
import axios from "../pages/api/axios";
import { useSelector } from "react-redux";
const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [select, setSelect] = useState(null);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [categories, setCategories] = useState(null);
  const { cartItems } = useSelector((state) => state.cart);
  const controlNav = () => {
    if (window.innerWidth > 1024) {
      if (window.scrollY > 200) {
        if (scrollY > lastScrollY && !mobileMenu) {
          setShow("-translate-y-[85px]");
        } else {
          setShow("shadow-sm");
        }
      } else {
        setShow("translate-y-0");
      }
    } else {
      if (window.scrollY > 200) {
        setShow("-translate-y-[105px]");
      } else {
        setShow("translate-y-0");
      }
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNav);
    return () => {
      window.removeEventListener("scroll", controlNav);
    };
  }, [lastScrollY]);
  const getCategory = async () => {
    const { data } = await axios.get("/categories");
    setCategories(data?.data?.records);
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <header
      className={`w-full bg-white flex items-center justify-center z-20 sticky top-0 transition-transform duration-300 ${show} flex-col`}
    >
      {<Subhead />}
      <Wrapper>
        <div className=" flex flex-col lg:flex-row md:gap-10 gap-2 justify-between">
          <Link href="/" className="flex justify-center flex-col items-center">
            <img
              src="https://i.pinimg.com/736x/8d/62/79/8d6279c04b35d101f029db1e2057a9b5.jpg"
              alt=""
              className="w-[60px]"
            />
          </Link>
          <div className="flex items-center justify-between text-center lg:gap-20 flex-col lg:flex-row ">
            <Menu
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
              categories={categories}
            />

            {mobileMenu && (
              <MenuMobile
                setMobileMenu={setMobileMenu}
                showCatMenu={showCatMenu}
                setShowCatMenu={setShowCatMenu}
                categories={categories}
              />
            )}

            <div className="flex items-center justify-center mx-2 md:mx-0 gap-4 text-black  ">
              <div>
                <AiOutlineSearch />
              </div>
              <div>
                <input
                  className="border-2 rounded-full px-3"
                  type="text"
                  placeholder="Search"
                />
              </div>
              <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                <IoMdHeartEmpty />
                <div className="h-[14px] md:h-[18px] absolute min-w-[14px] md:min-2-[18px] rounded-full bg-black top-1 left-5 flex justify-center items-center md:left-7 text-white text-[10px] md:text-[12px] px-1 ">
                  5
                </div>
              </div>
              <Link href="/cart">
                {
                  <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                    <BsCart />
                    <div className="h-[14px] md:h-[18px] absolute min-w-[14px] md:min-2-[18px] rounded-full bg-black top-1 left-5 flex justify-center items-center md:left-7 text-white text-[10px] md:text-[12px] px-1 ">
                      {cartItems.length}
                    </div>
                  </div>
                }
              </Link>

              {/* mobile menu start */}
              <div className="md:hidden w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
                {mobileMenu ? (
                  <VscChromeClose
                    className=" "
                    onClick={() => setMobileMenu(false)}
                  />
                ) : (
                  <BiMenuAltRight
                    className=" "
                    onClick={() => setMobileMenu(true)}
                  />
                )}
              </div>
            </div>
            {/* Mobile menu end */}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
