import {
  getAllApplications,
  getApplicationByIdApi,
  getApplicationsByUser,
} from "./applicationapi.js";
import { setAllApplications, setApplications } from "./applicationslice.js";

export const getApplicationsByUserAction = async (dispatch, userId) => {
  const applicationInfo = await getApplicationsByUser(userId);
  const { status, payload } = applicationInfo || {};
  console.log("getApplicationsByUserAction =>", status, payload);
  // You can dispatch an action to store applications in Redux if needed
  if (status === "success") {
    dispatch(setAllApplications(payload));
  }
};

export const getAllApplicationAction = () => async (dispatch) => {
  const applicationInfo = await getAllApplications();
  const { status, payload } = applicationInfo;

  if (status === "success") {
    dispatch(setAllApplications(payload));
  }
};

export const getApplicationByIdAction = (applicationId) => async (dispatch) => {
  try {
    const applicationInfo = await getApplicationByIdApi(applicationId);
    console.log("getApplicationByIdAction =>", applicationInfo);
    if (!applicationInfo) {
      console.error("getApplicationByIdApi returned no response");
      return;
    }
    const { status, payload } = applicationInfo;
    if (status === "success") {
      dispatch(setApplications(payload));
    } else {
      console.error("Failed to fetch application:", applicationInfo.message);
    }
  } catch (error) {
    console.error("Error in getApplicationByIdAction:", error);
  }
};
