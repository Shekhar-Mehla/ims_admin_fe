import axios from "axios";
import { toast } from "react-toastify";

const getAccessToken = () => {
  return sessionStorage.getItem("accesstoken");
};
const getRefreshToken = () => {
  return localStorage.getItem("refreshtoken");
};

export const apiProcessor = async ({
  url,
  method,
  payload,
  isPrivate,
  isAcessJWT = true,
}) => {
  console.log(payload);
  try {
    const headers = {};
    if (isPrivate) {
      const token = isAcessJWT ? getAccessToken() : getRefreshToken();
      headers.authorization = `Bearer ${token}`;
    }
    const responsePending = axios({
      url,
      method,
      data: payload,
      headers,
    });
    console.log(responsePending);
    toast.promise(responsePending, {
      pending: "Processing your request...",
    });
    const { data } = await responsePending;
    console.log(data);
    if (data?.status === "success") {
      toast.success(data?.message || "Request successful");
    } else if (data?.status === "error") {
      toast.error(data?.message || "Request failed");
    }
    return data;
  } catch (error) {
    console.log("ERROR:", error.response?.data);
    console.log("STATUS:", error.response?.status);
    console.log("MESSAGE:", error.message);
  }
};
