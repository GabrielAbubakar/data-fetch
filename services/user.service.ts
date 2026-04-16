import { User } from "@/types";
import { apiClient } from "../api";

export const getAllUsers = async (params: any): Promise<User[]> => {
  const res = await apiClient.get("/users", {
    params,
  });
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await apiClient.get(`/users/${id}`);
  return res.data;
};
