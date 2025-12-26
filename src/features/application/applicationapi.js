import { apiProcessor } from "../../services/apiprocessor";
const apiBaseUrl = import.meta.env.VITE_BASE_API_URL;

const applicationApi = apiBaseUrl + "/api/v1/application";
export const applyForInternship = async (applicationData) => {
  const url = `${applicationApi}/apply`;
  const method = "POST";
  const payload = applicationData;
  return await apiProcessor({ url, method, payload });
};
export const getApplicationsByUser = async (userId) => {
  const url = `${applicationApi}/user/${userId}`;
  const method = "GET";
  return await apiProcessor({ url, method });
};
export const getAllApplications = async () => {
  const url = `${applicationApi}/get-all-applications`;
  const method = "GET";
  return await apiProcessor({ url, method, isPrivate: true });
};
export const updateApplicationStatusApi = async (applicationId, status) => {
  const url = `${applicationApi}/update-application-status/${applicationId}`;
  const method = "PATCH";
  const payload = { status };
  return await apiProcessor({ url, method, payload, isPrivate: true });
};

export const getApplicationByIdApi = async (applicationId) => {
  const url = `${applicationApi}/get-application-by-id/${applicationId}`;
  const method = "GET";
  return await apiProcessor({ url, method, isPrivate: true });
};
