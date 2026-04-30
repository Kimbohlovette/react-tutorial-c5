"use client";
import StatsCard from "@/components/Card";
import Navbar from "@/components/navbar";
import TransactionsList from "@/components/TransactionsList";
import Button from "@/components/Button";
import { useGetTransactions } from "@/hooks/useFetchTransactions";
import Link from "next/link";


export default function LandingPage() {
	
	return (
		<>
			<div className="flex flex-col flex-1 min-h-screen bg-slate-50 dark:bg-slate-900">
				<header className="w-full border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
			<div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-4">
				<Link
					href="/"
					className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight"
				>
					🐷 Piggy
				</Link>
				<nav className="flex items-center gap-6">
					
					<div className="flex items-center gap-4 text-sm font-medium">
						<Link
							href="/register"
							className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition-colors"
						>
							Sign up
						</Link>
		
					</div>
				</nav>
			</div>
		</header>
				<main className="flex-1 w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-8">
					<section className="flex gap-4">
						{/* <img src="../assets/landing-page.png" alt="" /> */}
					</section>
					<section className="flex gap-3 justify-center m-auto">
						<Button
							text="Get Started"
							onClick={() => {
								window.location.href = "/register";
							}}
						/>
						<Button
							text="Login"
							variant="secondary"
							onClick={() => {
								window.location.href = "/login";
							}}
						/>
						
					</section>
					<section>
						
					</section>
				</main>
			</div>
		</>
	);
}
