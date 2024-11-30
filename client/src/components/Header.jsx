import { FaRegUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const isSearchPage = location.pathname === "/search";

    const redirectToLoginPage = () => {
      navigate("/login");
    };

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex justify-center flex-col gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          {/* logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>
          {/* search */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/* login and cart */}
          <div className="">
            {/* Mobile part*/}
            <button
              onClick={redirectToLoginPage}
              className="text-neutral-600 lg:hidden"
            >
              <FaRegUserCircle size={26} />
            </button>
            {/* Desktop part */}
            <div className="hidden lg:flex items-center gap-10">
              <button
                onClick={redirectToLoginPage}
                className="text-lg px-2"
              >
                Login
              </button>
              <button className="flex items-center gap-2 bg-secondary-200 hover:bg-green-600 px-3 py-3 rounded text-white">
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
