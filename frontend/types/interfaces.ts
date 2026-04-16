export interface TransactionType {
	amount: number | string;
	reason: string;
	createdAt: string;
	type: "saving" | "withdrawal";
}

export interface GetTransactionsParamsType {
	type?: "saving" | "withdrawal";
	size?: number;
}
