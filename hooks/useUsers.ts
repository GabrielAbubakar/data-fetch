import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserById } from "../services";

export const USER_KEYS = {
  all: ["user"] as const,
  list: (params: any) => [...USER_KEYS.all, "list", params] as const,
  detail: (id: string) => [...USER_KEYS.all, "detail", id] as const,
};

export function useGetAllUsers(params: any) {
  return useQuery<User[]>({
    queryKey: USER_KEYS.list(params),
    queryFn: () => getAllUsers(params),
  });
}

export function useGetUserById(id: string) {
  return useQuery<User>({
    queryKey: USER_KEYS.detail(id),
    queryFn: () => getUserById(id),
  });
}
