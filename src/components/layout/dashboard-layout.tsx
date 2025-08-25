import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";


const DashboardLayout = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="flex w-full items-center justify-center">
        <AppSidebar />
        <div className="flex flex-1 flex-col items-start justify-start">
          <Navbar />
          <div className="h-[calc(100vh-64px)] w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
