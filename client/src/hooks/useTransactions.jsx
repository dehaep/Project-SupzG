import { useQuery } from "@tanstack/react-query";
import API from "../api/axiosInstance";

// Fetch semua transaksi
const fetchTransactions = async () => {
    const res = await API.get("/transactions");
    return res.data;
    };

export const useTransactions = () => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: fetchTransactions,
        refetchInterval: 3000, // 🔁 Real-time update tiap 3 detik
    });
};
