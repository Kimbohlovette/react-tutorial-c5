import { TransactionType } from "@/types/interfaces";
import axios from "axios";

export interface ResponseType {
	success: boolean;
	error: any;
}

const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

export const saveTransaction = (payload: TransactionType) => {
	console.log("Fetch function executed!");
	let response: ResponseType = {
		error: null,
		success: true,
	};
	// axios
	// 	.post(BASEURL + "/api/v1/transactions", payload)
	// 	.then((res) => {
	// 		response = {
	// 			error: undefined,
	// 			success: true,
	// 		};
	// 	})
	// 	.catch((err) => {
	// 		response = {
	// 			error: err,
	// 			success: false,
	// 		};
	// 	});
	return response;
};
