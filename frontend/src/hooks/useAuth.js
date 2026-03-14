import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

//login mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    },
  });
};

//signup mutation
export const useSignup = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post("/auth/signup", userData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    },
  });
};
