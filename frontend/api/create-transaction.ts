/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionType } from "@/types/interfaces";
import { api } from "@/utils/auth";

export interface ResponseType {
	success: boolean;
	error: any;
}

export const saveTransaction = async (payload: TransactionType): Promise<ResponseType> => {
	console.log("Fetch function executed!");
	try {
		await api.post("/api/v1/transactions", payload);
		return {
			error: null,
			success: true,
		};
	} catch (err) {
		return {
			error: err,
			success: false,
		};
	}
};