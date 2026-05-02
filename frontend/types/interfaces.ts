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

export interface UserCredentials {
	username: string;
	email: string;
	password: string;
	createdAt: string;
	deleatedAt?: string;
	updatedAt?: string;
	id?: string;
}

export interface LoginCredentials {
	identifier: string;
	password: string;
}
