import { TransactionType } from "@/types/interfaces";
import axios from "axios";

export interface ResponseType {
  success: boolean;
  error: any;
}

const BASEURL = "http://localhost:8080";

export const saveTransaction = async (
  payload: TransactionType,
): Promise<ResponseType> => {
  console.log("Fetch function executed!");

  const userId = localStorage.getItem("piggy_user_id");
  try {
    const res = await axios.post(BASEURL + "/api/v1/transactions", payload, {
      headers: {
        "X-User-ID": userId || "",
      }
    });
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
