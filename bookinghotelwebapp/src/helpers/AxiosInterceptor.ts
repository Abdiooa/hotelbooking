import axios from "axios";

const BASE_URL = "http://localhost:8070";
const axiosHttp = axios.create({
  baseURL: `${BASE_URL}`,
});

axiosHttp.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
);

axiosHttp.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosHttp;
