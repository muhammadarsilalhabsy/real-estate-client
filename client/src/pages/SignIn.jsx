import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../features/user/userSlice";

const SignIn = () => {
  const [formData, setFromData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get data from global (initialState)
  const { loading, error } = useSelector(
    (state) => state.persistedReducer.user
  );

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
      dispatch(signInStart());

      // post data
      const res = await fetch(APIbaseURL + "/api/v1/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // get the response
      const data = await res.json();

      if (data.success !== false) {
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        dispatch(signInFailure(data.msg));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(formData);
  return (
    <div className="mx-auto max-w-xl p-3">
      <h1 className="font-semibold text-2xl md:text-3xl text-center my-4">
        Sign In
      </h1>
      {error && (
        <div className="my-2 text-center">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form className="flex flex-col space-y-4" onSubmit={handelSubmit}>
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
          {loading ? "Loading..." : "Sing In"}
        </button>
      </form>
      <div className="mt-4 gap-2 flex text-sm">
        <p>{"Don't have an account?"}</p>
        <Link to="/sign-up">
          <span className="text-blue-700 font-medium">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
