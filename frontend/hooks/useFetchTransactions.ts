/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllTransactions } from "@/api/get-transactions";
import { getToken } from "@/utils/auth";
import { GetTransactionsParamsType, TransactionType } from "@/types/interfaces";
import { useEffect, useState } from "react";

export const useGetTransactions = (query: GetTransactionsParamsType) => {
	const [transactions, setTransactions] = useState<TransactionType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				setLoading(true);
				setError(null);
				
				// Check if user is authenticated
				const token = getToken();
				if (!token) {
					setLoading(false);
					return;
				}
				
				const res = await getAllTransactions(query);
				setTransactions(res.transactions || []);
			} catch (err: any) {
				console.error("Failed to fetch transactions:", err);
				setError(err.message || "Failed to load transactions");
			} finally {
				setLoading(false);
			}
		};

		fetchTransactions();
	}, [query.size, query.type]);

	return transactions;
};
