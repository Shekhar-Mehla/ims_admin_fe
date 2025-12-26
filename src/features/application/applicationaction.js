import {
  getAllApplications,
  getApplicationByIdApi,
  getApplicationsByUser,
} from "./applicationapi.js";
import { setAllApplications, setApplications } from "./applicationslice.js";

export const getApplicationsByUserAction = async (dispatch, userId) => {
  const applicationInfo = await getApplicationsByUser(userId);
  const { status, payload } = applicationInfo;
  console.log(status, payload);
  // You can dispatch an action to store applications in Redux if needed
  status === "success" && dispatch(getApplication(payload));
};

export const getAllApplicationAction = () => async (dispatch) => {
  const applicationInfo = await getAllApplications();
  const { status, payload } = applicationInfo;

  if (status === "success") {
    dispatch(setAllApplications(payload));
  }
};

export const getApplicationByIdAction = (applicationId) => async (dispatch) => {
  const applicationInfo = await getApplicationByIdApi(applicationId);
  const { status, payload } = applicationInfo;
  if (status === "success") {
    dispatch(setApplications(payload));
  }
};
