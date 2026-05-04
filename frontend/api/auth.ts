import { GetTransactionsParamsType, LoginCredentials, TransactionType, UserCredentials } from "@/types/interfaces";
import axios from "axios";

export interface ResponseType {
	success: boolean;
	error: any;
}

const BASEURL = process.env.NEXT_PUBLIC_BASEURL;


export const register = (payload: UserCredentials) => {
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

export const login = (payload:LoginCredentials ) => {
    console.log("Fetch function executed!");
    let response: ResponseType = {
        error: null,
        success: true,
    };
    axios
    	.post(BASEURL + "/api/v1/login", payload)
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



