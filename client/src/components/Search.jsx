import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false)
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);


  const redirectToSearchPage = () => {
    navigate("/search");
  }

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200">
      <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
        <FaSearch size={20} />
      </button>
      <div className="w-full h-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                'Chercher "lait"',
                1000,
                'Chercher "pain"',
                1000,
                'Chercher "sucre"',
                1000,
                'Chercher "fromage cottage"',
                1000,
                'Chercher "œufs"',
                1000,
                'Chercher "beurre"',
                1000,
                'Chercher "pommes"',
                1000,
                'Chercher "tomates"',
                1000,
                'Chercher "poulet"',
                1000,
                'Chercher "salade"',
                1000,
                'Chercher "bananes"',
                1000,
                'Chercher "riz"',
                1000,
                'Chercher "café"',
                1000,
                'Chercher "thé"',
                1000,
                'Chercher "avocats"',
                1000,
                'Chercher "haricots"',
                1000,
                'Chercher "pommes de terre"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              className="w-full h-full p-3 text-sm text-neutral-700 outline-none focus:ring-slate-600"
              placeholder="Rechercher..."
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;