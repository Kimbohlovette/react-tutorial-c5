import { GetTransactionsParamsType, LoginCredentials, TransactionType, UserCredentials } from "@/types/interfaces";
import axios from "axios";

export interface ResponseType {
	success: boolean;
	error: any;
}

const BASEURL = "http://localhost:8080";


export const CreateUser = (payload: UserCredentials) => {
    console.log("Fetch function executed!");
    let response: ResponseType = {
        error: null,
        success: true,
    };
    axios
    	.post(BASEURL + "/api/v1/register", payload)
    	.then((res) => {
    		response = {
    			error: undefined,
    			success: true,
    		};
    	})
    
    	.catch((err) => {
    		response = {
    			error: err,
    			success: false,
    		};
    	});
    return response;
};


// export const GetUser = async (
// 	query: GetTransactionsParamsType,
// ): Promise<GetTransactionsRes> => {
// 	const queries = [];
// 	if (query.size) {
// 		queries.push("size=" + query.size);
// 	}

// 	if (query.type) {
// 		queries.push("type=" + query.type);
// 	}

// 	const url =
// 		BASEURL +
// 		"/api/v1/transactions" +
// 		(queries.length > 0 ? "?" : "") +
// 		queries.join("&");

// 	try {
// 		const res = await axios.get(url);

// 		return {
// 			transactions: res.data as TransactionType[],
// 			error: null,
// 		};
// 	} catch (error) {
// 		return {
// 			transactions: [],
// 			error,
// 		};
// 	}
// };



