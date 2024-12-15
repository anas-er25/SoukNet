import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import getUserDetails from "./utils/getUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/userSlice";
function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await getUserDetails();
    dispatch(setUserDetails(userData.data));
  }
  useEffect(() => {
    fetchUser();
  },[])
  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster/>
    </>
  );
}

export default App;
