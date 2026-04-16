import { GetTransactionsParamsType, TransactionType } from "@/types/interfaces";
import axios from "axios";
export interface GetTransactionsRes {
	transactions: TransactionType[];
	error: any;
}
const BASEURL = "http://localhost:8065";
export const getAllTransactions = (query: GetTransactionsParamsType) => {
	let filtered = transactions;
	if (query.size) {
		filtered = transactions.slice(0, Number(query.size));
	}
	if (query.type) {
		filtered = transactions.filter((t) => t.type === query.type);
	}
	let response: GetTransactionsRes = {
		transactions: filtered,
		error: null,
	};

	// axios
	// 	.get("/api/v1/transactions")
	// 	.then((res) => {
	// 		response = {
	// 			transactions: res.data as TransactionType[],
	// 			error: null,
	// 		};
	// 	})
	// 	.catch((error) => {
	// 		response = {
	// 			transactions: [],
	// 			error,
	// 		};
	// 	});
	return response;
};

export const transactions: TransactionType[] = [
	{
		amount: 5000,
		reason: "Salary",
		createdAt: "2026-01-01T08:00:00Z",
		type: "saving",
	},
	{
		amount: "1500",
		reason: "Groceries",
		createdAt: "2026-01-02T10:30:00Z",
		type: "withdrawal",
	},
	{
		amount: 2000,
		reason: "Freelance work",
		createdAt: "2026-01-03T14:15:00Z",
		type: "saving",
	},
	{
		amount: 800,
		reason: "Transport",
		createdAt: "2026-01-04T07:45:00Z",
		type: "withdrawal",
	},
	{
		amount: 1200,
		reason: "Gift received",
		createdAt: "2026-01-05T12:00:00Z",
		type: "saving",
	},
	{
		amount: "600",
		reason: "Snacks",
		createdAt: "2026-01-06T16:20:00Z",
		type: "withdrawal",
	},
	{
		amount: 3000,
		reason: "Bonus",
		createdAt: "2026-01-07T09:10:00Z",
		type: "saving",
	},
	{
		amount: 1000,
		reason: "Electricity bill",
		createdAt: "2026-01-08T11:00:00Z",
		type: "withdrawal",
	},
	{
		amount: "700",
		reason: "Internet subscription",
		createdAt: "2026-01-09T18:30:00Z",
		type: "withdrawal",
	},
	{
		amount: 2500,
		reason: "Side hustle",
		createdAt: "2026-01-10T13:00:00Z",
		type: "saving",
	},

	{
		amount: 400,
		reason: "Lunch",
		createdAt: "2026-01-11T12:20:00Z",
		type: "withdrawal",
	},
	{
		amount: 1800,
		reason: "Project payment",
		createdAt: "2026-01-12T15:45:00Z",
		type: "saving",
	},
	{
		amount: "900",
		reason: "Fuel",
		createdAt: "2026-01-13T08:30:00Z",
		type: "withdrawal",
	},
	{
		amount: 2200,
		reason: "Consulting",
		createdAt: "2026-01-14T10:10:00Z",
		type: "saving",
	},
	{
		amount: 500,
		reason: "Drinks",
		createdAt: "2026-01-15T19:00:00Z",
		type: "withdrawal",
	},
	{
		amount: "3500",
		reason: "Investment return",
		createdAt: "2026-01-16T09:00:00Z",
		type: "saving",
	},
	{
		amount: 1200,
		reason: "Shopping",
		createdAt: "2026-01-17T17:25:00Z",
		type: "withdrawal",
	},
	{
		amount: 2700,
		reason: "Online sales",
		createdAt: "2026-01-18T11:40:00Z",
		type: "saving",
	},
	{
		amount: "650",
		reason: "Taxi",
		createdAt: "2026-01-19T06:50:00Z",
		type: "withdrawal",
	},
	{
		amount: 3100,
		reason: "Contract payment",
		createdAt: "2026-01-20T14:00:00Z",
		type: "saving",
	},

	{
		amount: 450,
		reason: "Coffee",
		createdAt: "2026-01-21T08:10:00Z",
		type: "withdrawal",
	},
	{
		amount: "2000",
		reason: "Savings deposit",
		createdAt: "2026-01-22T10:00:00Z",
		type: "saving",
	},
	{
		amount: 950,
		reason: "Dinner",
		createdAt: "2026-01-23T20:00:00Z",
		type: "withdrawal",
	},
	{
		amount: 4000,
		reason: "Business income",
		createdAt: "2026-01-24T09:30:00Z",
		type: "saving",
	},
	{
		amount: "1100",
		reason: "Medical expenses",
		createdAt: "2026-01-25T13:20:00Z",
		type: "withdrawal",
	},
	{
		amount: 2800,
		reason: "App revenue",
		createdAt: "2026-01-26T16:00:00Z",
		type: "saving",
	},
	{
		amount: 750,
		reason: "Utilities",
		createdAt: "2026-01-27T07:00:00Z",
		type: "withdrawal",
	},
	{
		amount: "3300",
		reason: "Client payment",
		createdAt: "2026-01-28T15:00:00Z",
		type: "saving",
	},
	{
		amount: 600,
		reason: "Gym",
		createdAt: "2026-01-29T18:45:00Z",
		type: "withdrawal",
	},
	{
		amount: 5000,
		reason: "Annual bonus",
		createdAt: "2026-01-30T12:00:00Z",
		type: "saving",
	},
];
