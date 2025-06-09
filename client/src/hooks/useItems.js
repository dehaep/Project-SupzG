import { useQuery } from "@tanstack/react-query";
import { getItems } from "../api/items";

export const useItems = () => {
    return useQuery({
        queryKey: ["items"],
        queryFn: getItems,
        refetchInterval: 3000, // Real-time update every 3 seconds
    });
};
