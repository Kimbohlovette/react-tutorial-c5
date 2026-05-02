import { GetTransactionsParamsType, LoginCredentials, TransactionType, UserCredentials } from "@/types/interfaces";
import axios from "axios";

export interface ResponseType {
	success: boolean;
	error: any;
}

const BASEURL = "http://localhost:8080";


export const Register = (payload: UserCredentials) => {
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

export const Login = (payload:LoginCredentials ) => {
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



