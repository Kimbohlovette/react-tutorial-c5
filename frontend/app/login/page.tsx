"use client";
import { login } from "@/api/auth";
import { saveTransaction } from "@/api/create-transaction";
import Button from "@/components/Button";
import Navbar from "@/components/navbar";
import { LoginCredentials, TransactionType, UserCredentials } from "@/types/interfaces";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";


function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => setShowPassword(!showPassword)

    const handleLogin = () => {
        console.log("Executed!");
        const payload: LoginCredentials = {
            identifier: username,
            password,
        };

        const res = login(payload);
        
                console.log("Response from post: ", res);
        
                if (res.success) {
                    toast("Log in successful! Redirecting...");
                    setTimeout(() => {
                    window.location.href = "/dashboard"
                }, 2000);
                 } else {
                     toast.error("Incorrect credentials! Try again.");
                 }
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
                                required
                            />
                        </div>
                        <div className="flex relative flex-col gap-1">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Password
                            </label>
                            <input
                            name="password"
                            id="password"
                            required
                            type={showPassword? "text" : "password"}
                                className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                                value={password}
                                onChange={(value) =>
                                    setPassword(value.target.value)
                                }
                            />
                            <button type="button" onClick={togglePassword} className="absolute right-3 bottom-2 ">
                            {
                                showPassword ? (
                                    <img src="/eyelid-closed.png" alt="hide" className="w-5 h-5 invert "/>
                                ): (
                                    <img src="/eyelid-open.png" alt="show" className="w-5 h-5 invert" />
                                )
                            }
                            </button>
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
