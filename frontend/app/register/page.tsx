"use client";
import {  register } from "@/api/auth";
import Button from "@/components/Button";
import {UserCredentials } from "@/types/interfaces";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();
    
    const togglePassword = () => setShowPassword(!showPassword);

    const handleRegister = () => {
        console.log("Executed!");
        const payload: UserCredentials = {
            username,
            email,
            password,
            createdAt: Date(),
        };

        const res = register(payload);

        console.log("Response from post: ", res);

        if (res.success) {
            toast("Account creation successful! Redirecting...");
            setTimeout(() => {
			router.push("/login")
		}, 2000);
         } else {
             toast.error("Failed to create account! Try again.");
         }
    };

    return (
        <div className="flex flex-col flex-1 min-h-screen bg-slate-50 dark:bg-slate-900">
            <main className="flex flex-1 items-center justify-center px-6 py-10">
                <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8">
                    <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
                        Register
                    </h1>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Email
                            </label>
                            <input
                            type="email"
                            name="email"
                            id="email"
                                className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                                placeholder="enter email"
                                value={email}
                                onChange={(v) => setEmail(v.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Username
                            </label>
                            <input
                            type="text"
                            name="username"
                            id="username"
                                className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                                placeholder="enter username"
                                value={username}
                                onChange={(v) => setUsername(v.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="flex flex-col gap-1 relative">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Password
                            </label>
                            <input
                            type={showPassword? "text" : "password"}
                            name="password"
                            id="password"
                            required
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
                            <Button text="Sign up" onClick={handleRegister} />
                        </div>
                         <br />
                        <p>Already have an account? <a href="/login" className="text-blue-400 underline">Sign in</a></p>
                    </form>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
}

export default RegisterPage;
