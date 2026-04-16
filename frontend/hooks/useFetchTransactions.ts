import { getAllTransactions } from "@/api/get-transactions";
import { GetTransactionsParamsType, TransactionType } from "@/types/interfaces";
import { useEffect, useState } from "react";

export const useGetTransactions = (query: GetTransactionsParamsType) => {
	const [transactions, setTransactions] = useState<TransactionType[]>([]);
	useEffect(() => {
		const res = getAllTransactions(query);
		//Check if there is an error
		if (res.error) {
			console.log("Error occured fetching transactions: ", res.error);
		}
		setTransactions(res.transactions);
	}, [query.size, query.type]);

	return transactions;
};
