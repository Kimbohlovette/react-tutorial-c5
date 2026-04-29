import { TransactionType } from "@/types/interfaces";
import axios from "axios";

export interface ResponseType {
  success: boolean;
  error: any;
}

const BASEURL = "http://localhost:8065";

export const saveTransaction = async (
  payload: TransactionType,
): Promise<ResponseType> => {
  console.log("Fetch function executed!");

  try {
    const res = await axios.post(BASEURL + "/api/v1/transactions", payload);
    return {
      success: true,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};
