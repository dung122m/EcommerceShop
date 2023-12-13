import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

const ProfileWrapper = () => {
  return (
    <div
      className="bg-white divide-y-2 divide-gray-100 px-8 py-8 border-b border-gray-200
     drop-shadow-lg"
    >
      <ProfileHeader />
      <ProfileBody />
    </div>
  );
};

export default ProfileWrapper;
