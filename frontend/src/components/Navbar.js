import Link from "next/link";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="fixed-top">
      <nav className="bg-black flex">
        <div className="container inline-flex mx-auto justify-between text-white p-5">
          <div className="">
            <Link href="/" className="text-2xl">
              teFon
            </Link>
          </div>
          <ul className="inline-flex space-x-2">
            <li>
              <Link
                href="/login"
                className="space-x-1 flex flex-row items-center justify-center"
              >
                <FaUser /> <span>login</span>
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="space-x-1 flex flex-row items-center justify-center"
              >
                <FaUser /> <span>register</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
