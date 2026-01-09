import { Routes, Route } from "react-router";
import Login from "./pages/authPages/Login";
import DefaultLayout from "./components/CustomComponents/DefaultLayout";

import ForgotPassword from "./pages/authPages/ForgotPassword";

import Intership from "./pages/internship/Intership";
import CreateInternship from "./pages/internship/CreateInternship";
import ApplicationList from "./pages/application/ApplicationList";
import UserList from "./pages/authPages/UserList";
import AllInternship from "./pages/internship/AllInternship";
import ApplicationView from "./pages/application/ApplicationView";
import UpdateInternship from "./pages/internship/UpdateInternship ";
import ApplicationUpdate from "./pages/application/ApplicationUpdate";
import RegisterNewUser from "./pages/authPages/NewUser";
import ProtectedRoute from "./components/CustomComponents/ProtectedRoute";
import DashBoard from "./pages/DashBoard";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout></DefaultLayout>}>
        <Route path="/" element={<ProtectedRoute><DashBoard></DashBoard></ProtectedRoute>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>

        <Route
          path="create-new-user"
          element={
            <ProtectedRoute>
              <RegisterNewUser></RegisterNewUser>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard></DashBoard>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="create_internship"
          element={
            <ProtectedRoute>
              <CreateInternship></CreateInternship>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="applications"
          element={
            <ProtectedRoute>
              <ApplicationList></ApplicationList>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="application-view/:id"
          element={
            <ProtectedRoute>
              <ApplicationView></ApplicationView>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="application-update/:id"
          element={
            <ProtectedRoute>
              <ApplicationUpdate></ApplicationUpdate>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="allinternships"
          element={
            <ProtectedRoute>
              <AllInternship></AllInternship>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="update_internship/:slug"
          element={
            <ProtectedRoute>
              <UpdateInternship></UpdateInternship>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="users"
          element={
            <ProtectedRoute>
              <UserList></UserList>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage></ProfilePage>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="notifications"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
