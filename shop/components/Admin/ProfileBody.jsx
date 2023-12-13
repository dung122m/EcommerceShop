import React from "react";
const buttons = [
  {
    name: "Add",
    bg: "bg-white",
    color: "text-gray-900",
    hoverbg: "bg-slate-200",
  },
  {
    name: "Send",
    bg: "bg-indigo-500",
    color: "text-white",
    hoverbg: "bg-indigo-700",
  },
];
const user = {
  name: "Admin",
  imageSrc:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
};
const ProfileBody = () => {
  return (
    <div className="py-8 flex justify-between">
      <div className="flex gap-x-4">
        <img src={user.imageSrc} alt="" className="rounded-full w-12 h-12" />
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <h1 className="text-gray-900 font-bold text-xl">Hello Admin</h1>
        </div>
      </div>
      <div>
        <div className="flex space-x-4">
          {buttons.map((button) => (
            <button
              className={`${button.bg} ${button.color} hover:opacity-70 border rounded-md px-4 py-2`}
            >
              {button.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileBody;
