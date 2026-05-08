import { api } from "@/utils/auth";

export interface UserAccountInfo {
	id: number;
	email: string;
	name: string;
	balance: number;
	createdAt: string;
}

export interface UserAccountResponse {
	data: UserAccountInfo | null;
	error: unknown;
}

export const getUserAccountInfo = async (): Promise<UserAccountResponse> => {
	try {
		const res = await api.get("/api/v1/account");
		return {
			data: res.data as UserAccountInfo,
			error: null,
		};
	} catch (error) {
		console.error("Failed to fetch account info:", error);
		return {
			data: null,
			error,
		};
	}
};
