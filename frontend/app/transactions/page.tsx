"use client";
import TransactionsList from "@/components/TransactionsList";
import Navbar from "@/components/navbar";
import { useGetTransactions } from "@/hooks/useFetchTransactions";
import { GetTransactionsParamsType, TransactionType } from "@/types/interfaces";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

// Separate component that uses useSearchParams
function TransactionsContent() {
	const query = useSearchParams();
	const type = query.get("type");
	const filtered = useGetTransactions({
		type: type as "saving" | "withdrawal" | undefined,
		size: undefined,
	} as GetTransactionsParamsType);

	console.log("IN Transactions: ", filtered);

	return (
		<>
			<h1 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
				{type === "saving" ? "All Savings" : type === "withdrawal" ? "All Withdrawals" : "All Transactions"}
			</h1>
			{filtered && filtered.length > 0 ? (
				<TransactionsList transactions={filtered} />
			) : (
				<div className="text-center py-8 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
					No transactions found.
				</div>
			)}
		</>
	);
}

// Loading fallback component
function TransactionsLoading() {
	return (
		<div className="text-center py-8 text-slate-500 dark:text-slate-400">
			Loading transactions...
		</div>
	);
}

// Main page component
function TransactionsPage() {
	return (
		<div className="flex flex-col flex-1 min-h-screen bg-slate-50 dark:bg-slate-900">
			<Navbar />
			<main className="w-full max-w-3xl mx-auto px-6 py-10">
				<Suspense fallback={<TransactionsLoading />}>
					<TransactionsContent />
				</Suspense>
			</main>
		</div>
	);
}

export default TransactionsPage;
