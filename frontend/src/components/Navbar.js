import Link from "next/link";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { customerLogout } from "@/features/actions/authActions";

const Navbar = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(customerLogout())
      .then(({ message }) => {
        router.push("/");
        toast.success(message);
      })
      .catch((message) => toast.error(message));
  };

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
            {token ? (
              <li>
                <button
                  className="space-x-1 flex flex-row items-center justify-center"
                  onClick={handleLogout}
                >
                  <FaUser /> <span>Logout</span>
                </button>
              </li>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
