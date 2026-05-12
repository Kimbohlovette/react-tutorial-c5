/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetTransactionsParamsType, TransactionType } from "@/types/interfaces";
import { api } from "@/utils/auth";

export interface GetTransactionsRes {
	transactions: TransactionType[];
	error: any;
}

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

	const url = "/api/v1/transactions" + (queries.length > 0 ? "?" : "") + queries.join("&");

	try {
		const res = await api.get(url);

		return {
			transactions: res.data as TransactionType[],
			error: null,
		};
	} catch (error) {
		return {
			transactions: [],
			error,
		};
	}
};