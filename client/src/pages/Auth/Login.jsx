import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../../utils/Axios";
import AxiosToastError from "../../utils/AxiosToastError";
import SummaryApi from "../../common/SummaryApi";

const Login = () => {
  const [data, setData] = useState({
    
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
    
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          email: "",
          password: "",
        });
        
          localStorage.setItem("accesstoken", response.data.data.accesstoken);
          localStorage.setItem("refreshtoken", response.data.data.refreshtoken);
        navigate("/");
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

            <Link
              to={"/forgot-password"}
              className="block ml-auto font-semibold hover:text-primary-200"
            >
              {" "}
              Mot de passe oublié?{" "}
            </Link>
          </div>

          <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide `}
          >
            Se connecter
          </button>
        </form>
        <p>
          Vous n&apos;avez pas un compte?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-secondary-200 hover:text-green-700"
          >
            Inscrivez-vous ici.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
