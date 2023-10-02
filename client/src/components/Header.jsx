import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-semibold text-sm md:text-xl flex flex-wrap">
            <span className="text-slate-500">M19Y</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        {/* input */}
        <form className="p-3 flex items-center rounded-md bg-white">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent w-24 md:w-64"
            id="search"
          />
          <label htmlFor="search" className="cursor-pointer">
            <FaSearch className="text-[20px] text-slate-500" />
          </label>
        </form>

        {/* nav */}
        <ul className="flex text-slate-700 sm:space-x-4 text-sm font-medium md:text-base">
          <li className="hidden sm:inline hover:text-black">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline hover:text-black">
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/sign-in" className="hover:text-black">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
