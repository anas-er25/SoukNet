import { FaRegUserCircle } from "react-icons/fa";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { BsCart4 } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
import Search from "./Search";
import useMobile from "../hooks/useMobile";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserMenu from "./UserMenu";
const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const isSearchPage = location.pathname === "/search";

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }

    navigate("/user");
  };

  return (
    <header className="sticky top-0 flex flex-col justify-center h-24 gap-1 bg-white lg:h-20 lg:shadow-md">
      {!(isSearchPage && isMobile) && (
        <div className="container flex items-center justify-between px-2 mx-auto">
          {/* logo */}
          <div className="h-full">
            <Link to={"/"} className="flex items-center justify-center h-full">
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
              className="text-neutral-600 lg:hidden"
              onClick={handleMobileUser}
            >
              <FaRegUserCircle size={26} />
            </button>
            {/* Desktop part */}
            <div
              onClick={() => setOpenUserMenu((preve) => !preve)}
              className="items-center hidden gap-10 select-none lg:flex"
            >
              {user?._id ? (
                <div className="relative">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <p>Compte</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="p-4 bg-white rounded min-w-52 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="px-2 text-lg">
                  Login
                </button>
              )}
              <button className="flex items-center gap-2 px-3 py-3 text-white rounded bg-secondary-200 hover:bg-secondary-100">
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

      <div className="container px-2 mx-auto lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
