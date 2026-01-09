import { fetchNewAccessTokenApi, getUserProfile, loginUser, getAllUsers, updateProfile, changePassword, logoutUser, deleteUserApi } from "./userapi.js";
import { setUser, setUsersList } from "./userslice.js";
export const loginAction = (userData) => async (dispatch) => {
  const tokens = await loginUser(userData);

  const { status, payload } = tokens;
  console.log(payload, "...");

  if (status === "success" && payload) {
    sessionStorage.setItem("accessToken", payload.accessToken);
    localStorage.setItem("refreshToken", payload.refreshToken);
    const user = await getUserProfile();
    if (user.status === "success" && user.payload) {
      return dispatch(setUser(user.payload));
    }
  }
};



export const updateProfileAction = (profileData) => async (dispatch) => {
  const user = await updateProfile(profileData);
  if (user.status === "success" && user.payload) {
    return dispatch(setUser(user.payload));
  }
};

export const changePasswordAction = (passwordData) => async (dispatch) => {
  const user = await changePassword(passwordData);
  if (user.status === "success" && user.payload) {
    return dispatch(setUser(user.payload));
  }
};
export const fethProfileAction = () => async (dispatch) => {
  const user = await getUserProfile();
  if (user.status === "success" && user.payload) {
    return dispatch(setUser(user.payload));
  }
};

export const getAllUsersAction = () => async (dispatch) => {
    const response = await getAllUsers();
    if (response.status === "success" && response.payload) {
        return dispatch(setUsersList(response.payload));
    }
}



export const autologinAction = () => {
  return async (dispatch) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return;
    }
    // dispatch(setLoading(true));
    
    try {
      if (accessToken) {
        // dispatch(fetchProfileAction());
        const response = await getUserProfile();
        if (
          response?.status === "error" &&
          response?.message === "jwt expired"
        ) {
          const tokens = await fetchNewAccessTokenApi();
          
          if (tokens.status === "success" && tokens?.payload) {
            sessionStorage.setItem("accessToken", tokens?.payload);

            const getUser = await getUserProfile();
            if (getUser?.status === "success") {
              dispatch(setUser(getUser?.payload));
              return { success: true };
            }
          }
        }
        if (response?.status === "success" && response?.payload) {
          dispatch(setUser(response?.payload));
          return { success: true };
        }
      }
    } catch (error) {
      console.error("Auto-login error:", error);
      throw error;
    }
  };
};


export const logoutAction = () => {
  return async (dispatch) => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed on server:", error);
    } finally {
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
      return { success: true };
    }
  };
};

export const deleteUserAction = (userId) => async (dispatch) => {
    const response = await deleteUserApi(userId);
    if (response.status === "success") {
        dispatch(getAllUsersAction()); // Refresh the list
        return { success: true, message: response.message };
    }
    return { success: false, message: response.message };
};
