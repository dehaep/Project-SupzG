import { useQuery } from "@tanstack/react-query";
import API from "../api/axiosInstance";

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
        const res = await API.get("/users");
        return res.data;
        },
        refetchInterval: 3000,
    });
};
