import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ email: null });
  const [accessToken, setAccessToken] = useState(null);
  const updateUser = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };
  const updateAccessToken = (newAccessToken) => {
    setAccessToken(newAccessToken);
  };

  return (
    <UserContext.Provider
      value={{ userInfo, updateUser, accessToken, updateAccessToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
