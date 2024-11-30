import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../../utils/Axios";
import AxiosToastError from "../../utils/AxiosToastError";
import SummaryApi from "../../common/SummaryApi";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);

  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();
  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password")
    }
  },[])

  const valideValue = data.every((el) => el);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: location.state?.email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        // navigate("/verification-otp");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-2xl text-center font-semibold">Entrez OTP</p>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="otp">Entrez Votre OTP :</label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {data.map((item, index) => {
                return (
                  <input
                    key={"otp" + index}
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    type="text"
                    id="otp"
                    name="otp"
                    maxLength={1}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log("value : " + value);
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    className="bg-blue-50 p-2 w-full max-w-16 border rounded outline-none focus:border-secondary-200 text-center font-semibold"
                    required
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide `}
          >
            Vérifier l&apos;OTP
          </button>
        </form>
        <p>
          Vous avez déjà un compte?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-secondary-200 hover:text-green-700"
          >
            Connectez-vous ici.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
