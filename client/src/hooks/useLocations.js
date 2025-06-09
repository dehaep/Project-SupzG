import { useQuery } from "@tanstack/react-query";
import API from "../api/axiosInstance";

// Fetch all locations
const fetchLocations = async () => {
    const res = await API.get("/locations");
    return res.data;
};

export const useLocations = () => {
    return useQuery({
        queryKey: ["locations"],
        queryFn: fetchLocations,
        refetchInterval: 3000, // Real-time update every 3 seconds
    });
};
