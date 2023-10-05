import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OauthBtn from "../components/OauthBtn";

const SignUp = () => {
  const [formData, setFromData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const APIbaseURL = "http://localhost:3000";
  const handelChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      // set loading is true
      setLoading(true);

      // post data
      const res = await fetch(APIbaseURL + "/api/v1/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // get the response
      const data = await res.json();
      console.log(data);
      if (data.success !== false) {
        setError(null);
        navigate("/sign-in");
      } else {
        setError(data.msg);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(formData);
  return (
    <div className="mx-auto max-w-xl p-3">
      <h1 className="font-semibold text-2xl md:text-3xl text-center my-4">
        Sign Up
      </h1>
      {error && (
        <div className="my-2 text-center">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form className="flex flex-col space-y-4" onSubmit={handelSubmit}>
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
          {loading ? "Loading..." : "Sing up"}
        </button>
        <OauthBtn />
      </form>
      <div className="mt-4 gap-2 flex text-sm">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700 font-medium">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
