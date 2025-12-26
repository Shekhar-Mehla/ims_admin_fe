import { Routes, Route } from "react-router";
import Login from "./pages/authPages/Login";
import DefaultLayout from "./components/CustomComponents/DefaultLayout";
import Home from "./pages/Home";
import Register from "./pages/authPages/Register";
import ForgotPassword from "./pages/authPages/ForgotPassword";

import Intership from "./pages/internship/Intership";
import CreateInternship from "./pages/internship/CreateInternship";
import ApplicationList from "./pages/application/ApplicationList";
import UserList from "./pages/authPages/UserList";
import AllInternship from "./pages/internship/AllInternship";
import ApplicationView from "./pages/application/ApplicationView";
import UpdateInternship from "./pages/internship/UpdateInternship ";
import ApplicationUpdate from "./pages/application/ApplicationUpdate";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout></DefaultLayout>}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route
          path="create_internship"
          element={<CreateInternship></CreateInternship>}
        ></Route>
        <Route
          path="applications"
          element={<ApplicationList></ApplicationList>}
        ></Route>
        <Route
          path="application-view/:id"
          element={<ApplicationView></ApplicationView>}
        ></Route>
        <Route
          path="application-update/:id"
          element={<ApplicationUpdate></ApplicationUpdate>}
        ></Route>

        <Route
          path="allinternships"
          element={<AllInternship></AllInternship>}
        ></Route>
        <Route
          path="update_internship/:slug"
          element={<UpdateInternship></UpdateInternship>}
        ></Route>
        <Route path="users" element={<UserList></UserList>}></Route>
        <Route
          path="forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
