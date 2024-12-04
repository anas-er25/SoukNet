import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../../utils/AxiosToastError";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const ResestPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);
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
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Les mots de passe ne sont pas identiques", {
        duration: 4000,
      });
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  console.log("data: ", data);

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-2xl text-center font-semibold">
          Réinitialiser le mot de passe
        </p>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="newPassword">Nouveau Mot de passe:</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-secondary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={data.newPassword}
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
            <label htmlFor="confirmPassword">Confirmé le Mot de passe:</label>
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
              valideValue ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide `}
          >
            Réinitialiser
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResestPassword;
