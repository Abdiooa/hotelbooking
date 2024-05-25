import axiosHttp from "../../helpers/AxiosInterceptor";
import { LoginData, RegisterData } from "../common/Types";

export const authenticate = async (loginData: LoginData) => {
  return axiosHttp.post("/api/v1/auth/authenticate", loginData);
};

export const signup = async (formData: RegisterData) => {
  return axiosHttp.post("/api/v1/auth/signup", formData);
};

export const getUserById = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("user not authenticate!");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return axiosHttp.get(`/api/v1/users/${id}`, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserByEmail = async (email: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("user not authenticate!");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return axiosHttp.get(`/api/v1/users/${email}`, config);
  } catch (error) {
    return Promise.reject(error);
  }
};
