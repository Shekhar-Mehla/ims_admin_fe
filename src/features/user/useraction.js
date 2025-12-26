import { loginUser } from "./userapi.js";
import { setUser } from "./userslice.js";
export const loginAction = (userData) => async (dispatch) => {
  const userInfo = await loginUser(userData);
  console.log(userInfo);
  const { status, payload } = userInfo;
  console.log(status, payload);
  sessionStorage.setItem("accesstoken", payload.accessToken);
  localStorage.setItem("refreshtoken", payload.refreshToken);
  status === "success" && dispatch(setUser(payload));
  return { status, payload };
};
