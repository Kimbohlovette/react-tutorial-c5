"use client";
import { saveTransaction } from "@/api/create-transaction";
import Button from "@/components/Button";
import Navbar from "@/components/navbar";
import { TransactionType, UserCredential } from "@/types/interfaces";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Handle save transaction
    // const handleSave = () => {
    //     console.log("Executed!");
    //     const payload: TransactionType = {
    //         username,
    //         reason,
    //         type: "saving",
    //         createdAt: Date(),
    //     };
    //     const res = saveTransaction(payload);

    //     console.log("Response from fetch: ", res);

    //     if (res.success) {
    //         toast("Saving action successful! Redirecting...");
    //     } else {
    //         toast.error("Failed to save money! Try again.");
    //     }
    // };

    const handleLogin = () => {
        console.log("Executed!");
        const payload: UserCredential = {
            username,
            password,
            createdAt: Date(),
        };

        window.location.href = "/dashboard";
        // const res = saveTransaction(payload);

        // console.log("Response from fetch: ", res);

        // if (res.success) {
        //     toast("Saving action successful! Redirecting...");
        // } else {
        //     toast.error("Failed to save money! Try again.");
        // }
    };

    return (
        <div className="flex flex-col flex-1 min-h-screen bg-slate-50 dark:bg-slate-900">
            <main className="flex flex-1 items-center justify-center px-6 py-10">
                <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8">
                    <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
                        Login
                    </h1>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Username
                            </label>
                            <input
                                className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                                placeholder="username or email"
                                value={username}
                                onChange={(v) => setUsername(v.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Password
                            </label>
                            <input
                                className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                                value={password}
                                onChange={(value) =>
                                    setPassword(value.target.value)
                                }
                            />
                        </div>
                        <div className="pt-2">
                            <Button text="Sign in" onClick={handleLogin} />
                        </div>
                        <br />
                        <p>Don't have an account yet? <a href="/register" className="text-blue-400 underline">Sign up</a></p>
                    </form>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
}

export default LoginPage;
