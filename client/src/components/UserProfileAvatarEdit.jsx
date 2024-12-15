import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import { setAvatar } from "../redux/userSlice";
const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      const { data: responseData } = response;
      dispatch(setAvatar(responseData.data.avatar));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-opacity-60 bg-neutral-900">
      <div className="flex flex-col items-center justify-center w-full max-w-sm p-4 bg-white rounded">
        <button
          onClick={close}
          className="block ml-auto text-neutral-800 w-fit"
        >
          <IoClose size={25} />
        </button>
        <div className="flex items-center w-20 h-20 overflow-hidden rounded-full drop-shadow-sm">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={60} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadAvatar">
            <div className="px-4 py-1 my-3 text-sm border rounded cursor-pointer border-primary-200 hover:bg-primary-200">
              {loading ? (
                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
              ) : (
                "Télécharger"
              )}
            </div>
            <input
              type="file"
              onChange={handleUploadAvatarImage}
              id="uploadAvatar"
              className="hidden"
            />
          </label>
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
