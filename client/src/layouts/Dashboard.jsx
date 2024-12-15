import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container grid lg:grid-cols-[250px,1fr] p-3 mx-auto ">
        {/* left for menu */}
        <div className="sticky hidden py-4 overflow-auto top-24 lg:block">
          <UserMenu />
        </div>
        {/* right for content */}
              <div className="p-4 bg-white">
                  <Outlet/>
        </div>
      </div>
    </section>
  );
}

export default Dashboard
