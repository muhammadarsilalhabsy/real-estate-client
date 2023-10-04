import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="mx-auto max-w-xl p-3">
      <h1 className="font-semibold text-2xl md:text-3xl text-center my-4">
        Sign Up
      </h1>
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username..."
          id="username"
          className="p-3 border rounded-lg w-full outline-none"
        />

        <input
          type="email"
          placeholder="Email..."
          id="email"
          className="p-3 border rounded-lg w-full outline-none"
        />

        <input
          type="password"
          placeholder="Password..."
          id="password"
          className="p-3 border rounded-lg w-full outline-none"
        />
        <button className="uppercase p-3 w-full bg-slate-700 hover:opacity-90 disabled:opacity-80 rounded-lg text-white font-medium">
          Sing up
        </button>
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
