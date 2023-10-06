import { useState } from "react";
import { getCurrentUser } from "../utils/data";

const Profile = () => {
  const user = getCurrentUser();
  const [formData, setFromData] = useState({});
  const [loading, setLoading] = useState(false);
  const handelChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className="p-3 mx-auto max-w-xl">
      <h1 className="text-center font-semibold text-3xl my-4">Profile</h1>
      <form className="my-8 flex flex-col space-y-4">
        <img
          src={user.photo}
          alt={`${user.username} profile`}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <input
          onChange={handelChange}
          type="text"
          placeholder="Username..."
          id="username"
          className="p-3 border rounded-lg w-full outline-none"
        />

        <input
          onChange={handelChange}
          type="email"
          placeholder="Email..."
          id="email"
          className="p-3 border rounded-lg w-full outline-none"
        />

        <input
          onChange={handelChange}
          type="password"
          placeholder="Password..."
          id="password"
          className="p-3 border rounded-lg w-full outline-none"
        />
        <button
          className="uppercase p-3 w-full bg-slate-700 hover:opacity-90 disabled:opacity-80 rounded-lg text-white font-medium"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="text-red-700 text-sm flex justify-between">
        <span className="cursor-pointer hover:text-red-500">
          Delete Account
        </span>
        <span className="cursor-pointer hover:text-red-500">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
