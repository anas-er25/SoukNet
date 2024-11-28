import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>&#169; Tous droits réservés {new Date().getFullYear()}</p>
        <div className="flex items-center gap-4 justify-center text-2xl">
          <a href="" className="hover:text-primary-200">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-primary-200">
            <FaInstagram />
          </a>
          <a href="" className="hover:text-primary-200">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
