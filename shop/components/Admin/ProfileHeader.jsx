import React from "react";
import { CiSearch } from "react-icons/ci";
const ProfileHeader = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div>
            <CiSearch />
          </div>
          <div>Search</div>
        </div>

        <div>
          <div>
            <img src="" alt="" />
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
