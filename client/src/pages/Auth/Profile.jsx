import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../../components/UserProfileAvatarEdit";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import AxiosToastError from "../../utils/AxiosToastError";
import toast from "react-hot-toast";
import getUserDetails from "../../utils/getUserDetails";
import { setUserDetails } from "../../redux/userSlice";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user.name,
    mobile: user.mobile,
    email: user.email,
  });
  useEffect(() => {
    setUserData({
      name: user.name,
      mobile: user.mobile,
      email: user.email,
    });
  }, [user]);
  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setUserData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUser,
        data:userData
      })
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message)
        const userData = await getUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      {/* Profile upload and display image */}
      <div className="flex items-center w-20 h-20 overflow-hidden rounded-full drop-shadow-sm">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={60} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="px-3 py-1 mt-3 text-sm border rounded-full border-primary-100 hover:border-primary-200 hover:bg-primary-100 min-w-20"
      >
        Modifier
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
      )}
      {/* name, mobile, email, change password */}
      <form className="grid gap-4 my-4" onSubmit={handleSubmit}>
        <div className="grid ">
          <label htmlFor="name">Nom :</label>
          <input
            value={userData.name}
            onChange={handleOnChnage}
            type="text"
            name="name"
            id="name"
            placeholder="Entrez votre nom"
            className="p-2 rounded outline-primary-200 bg-blue-50"
            required
          />
        </div>
        <div className="grid ">
          <label htmlFor="email">Email :</label>
          <input
            value={userData.email}
            onChange={handleOnChnage}
            type="text"
            name="email"
            id="email"
            placeholder="Entrez votre email"
            className="p-2 rounded outline-primary-200 bg-blue-50"
            required
          />
        </div>
        <div className="grid ">
          <label htmlFor="mobile">Numéro de portable :</label>
          <input
            value={userData.mobile}
            onChange={handleOnChnage}
            type="tel"
            min={10}
            max={13}
            name="mobile"
            id="mobile"
            placeholder="Entrez votre Numéro de portable"
            className="p-2 rounded outline-primary-200 bg-blue-50"
            required
          />
        </div>
        <button className="flex items-center justify-center px-4 py-2 font-semibold border rounded border-primary-100 text-primary-100 hover:text-neutral-600 hover:bg-primary-100">
          {loading ? <AiOutlineLoading3Quarters size={20} className="animate-spin" /> : "Valider"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
