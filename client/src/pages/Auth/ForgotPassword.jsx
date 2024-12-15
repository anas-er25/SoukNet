import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../../utils/Axios";
import AxiosToastError from "../../utils/AxiosToastError";
import SummaryApi from "../../common/SummaryApi";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

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
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state: data,
        });
        setData({
          email: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-2xl text-center font-semibold">
          Mot de passe oublié
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

          <button
            disabled={!valideValue}
            className={` ${
              valideValue
                ? "bg-secondary-200 hover:bg-secondary-100"
                : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide `}
          >
            Envoyer OTP
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

export default ForgotPassword;
