export interface TransactionType {
	amount: number | string;
	reason: string;
	createdAt: string;
	type: "saving" | "withdrawal";
	id?: string;
}

export interface GetTransactionsParamsType {
	type?: "saving" | "withdrawal";
	size?: number;
}

export interface UserCredential {
	username: string;
	password: string;
	createdAt: string;
	deleatedAt?: string;
	updatedAt?: string;
	id?: string;
}
