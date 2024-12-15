import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../../utils/Axios";
import AxiosToastError from "../../utils/AxiosToastError";
import SummaryApi from "../../common/SummaryApi";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const valideValue = Object.values(data).every((el) => el);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if the password == confirmpassword
    if (data.password !== data.confirmPassword) {
      toast.error("Les mots de passe ne sont pas identiques", {
        duration: 4000,
      });
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-2xl text-center font-semibold">
          Bienvenue à Souk<span className="text-secondary-200">Net</span>
        </p>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="name">Nom:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Entrer votre Nom"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-secondary-200"
              required
              autoFocus
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Entrer votre Email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-secondary-200"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Mot de passe:</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-secondary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="***********"
                className="w-full outline-none bg-blue-50"
                required
              />
              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirmée le mot de passe:</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-secondary-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="***********"
                className="w-full outline-none bg-blue-50"
                required
              />
              <div
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={` ${
              valideValue
                ? "bg-secondary-200 hover:bg-secondary-100"
                : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide `}
          >
            S&apos;inscrire
          </button>
        </form>
        <p>
          Vous avez déjà un compte?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-secondary-200 hover:text-secondary-100"
          >
            Connectez-vous ici.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
