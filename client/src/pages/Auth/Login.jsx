import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../../utils/Axios";
import AxiosToastError from "../../utils/AxiosToastError";
import SummaryApi from "../../common/SummaryApi";
import getUserDetails from "../../utils/getUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/userSlice";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        const userDetails = await getUserDetails();
        dispatch(setUserDetails(userDetails.data));

        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="container w-full px-2 mx-auto">
      <div className="w-full max-w-lg mx-auto my-4 bg-white rounded p-7">
        <p className="text-2xl font-semibold text-center">
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
              className="p-2 border rounded outline-none bg-blue-50 focus:border-secondary-200"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Mot de passe:</label>
            <div className="flex items-center p-2 border rounded bg-blue-50 focus-within:border-secondary-200">
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
              valideValue
                ? "bg-secondary-200 hover:bg-secondary-100"
                : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide `}
          >
            Se connecter
          </button>
        </form>
        <p>
          Vous n&apos;avez pas un compte?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-secondary-200 hover:text-secondary-100"
          >
            Inscrivez-vous ici.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
