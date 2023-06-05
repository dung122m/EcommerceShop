import LayoutAdmin from "@/components/LayoutAdmin";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
const admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const checkAdminLoggedIn = (accessToken) => {
    try {
      const decodedToken = jwt.decode(accessToken);

      if (decodedToken && decodedToken.data.admin_role === "superadmin") {
        return true;
      }
    } catch (error) {
      console.error("Error decoding access token:", error);
    }

    return false;
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessAdmin");
    const isAdminLoggedIn = checkAdminLoggedIn(accessToken);
    setIsAdmin(isAdminLoggedIn);

    if (!isAdminLoggedIn) {
      router.push("/");
    }
  }, []);

  return <LayoutAdmin>Hello Admin </LayoutAdmin>;
};

export default admin;
