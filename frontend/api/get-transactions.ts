import { GetTransactionsParamsType, TransactionType } from "@/types/interfaces";
import axios from "axios";
export interface GetTransactionsRes {
	transactions: TransactionType[];
	error: any;
}
const BASEURL = "http://localhost:8080";
export const getAllTransactions = async (
	query: GetTransactionsParamsType,
): Promise<GetTransactionsRes> => {

	const queries = [];
	if (query.size) {
		queries.push("size=" + query.size);
	}

	if (query.type) {
		queries.push("type=" + query.type);
	}

	const url =
		BASEURL +
		"/api/v1/transactions" +
		(queries.length > 0 ? "?" : "") +
		queries.join("&");

	try {
		const storedId = localStorage.getItem("piggy_user_id");
    const userId = storedId === "undefined" || !storedId ? "" : storedId;
		const res = await axios.get(url, {
			headers: {
				"X-User-ID": userId,
			},
		});

		return {
			transactions: res.data as TransactionType[] || res.data as TransactionType[],
			error: null,
		};
	} catch (error) {
		return {
			transactions: [],
			error,
		};
	}
};



