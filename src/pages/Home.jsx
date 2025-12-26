import React from "react";
import ApplicationFormPage from "./ApplicationFormPage";
import SideBar from "./sidebar/SideBar";
import DefaultLayout from "../components/CustomComponents/DefaultLayout";

const Home = () => {
  return (
    <>
      <DefaultLayout>
        <SideBar></SideBar>
      </DefaultLayout>
    </>
  );
};

export default Home;
