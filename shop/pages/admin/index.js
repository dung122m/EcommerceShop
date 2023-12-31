import LayoutAdmin from "@/components/Admin/LayoutAdmin";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Dashboard from "@/components/Admin/Dashboard";
const admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const checkAdminLoggedIn = (accessToken) => {
    try {
      const decodedToken = jwt.decode(accessToken);

      if (decodedToken && decodedToken.data.admin_role === "superadmin") {
        return true;
      }
    } catch (error) {
      console.error("Error decoding access token:", error);
    } finally {
      setIsLoading(false);
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

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <LayoutAdmin>
      <Dashboard />
    </LayoutAdmin>
  );
};

export default admin;
