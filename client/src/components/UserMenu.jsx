import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../redux/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FiExternalLink } from "react-icons/fi";
// eslint-disable-next-line react/prop-types
const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.UserLogout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const handleClose = async  () => {
    if (close) {
      close();
    }
  }
  return (
    <div>
      <div className="font-semibold">Mon compte</div>
      <div className="flex items-center gap-2 text-sm">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}
        </span>
        <Link onClick={handleClose} to={"/dashboard/profile"} className="hover:text-secondary-200">
          <FiExternalLink size={15} />
        </Link>
      </div>
      <Divider />
      <div className="grid gap-2 text-sm">
        <Link onClick={handleClose} to={"/dashboard/myorders"} className="px-2 py-1 rounded hover:bg-secondary-100">
          Mes commandes
        </Link>
        <Link onClick={handleClose} to={"/dashboard/address"} className="px-2 py-1 rounded hover:bg-secondary-100">
          Mon adresse
        </Link>
        <button
          onClick={handleLogOut}
          className="px-2 py-1 text-left rounded hover:bg-red-200"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
