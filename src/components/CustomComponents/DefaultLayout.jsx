import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import SideBar from "../../pages/sidebar/SideBar";

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <SideBar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
