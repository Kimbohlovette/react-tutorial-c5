/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserAccountInfo, UserAccountInfo } from "@/api/get-account";
import { getToken } from "@/utils/auth";
import { useEffect, useState } from "react";

export const useFetchAccountInfo = () => {
	const [accountInfo, setAccountInfo] = useState<UserAccountInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAccountInfo = async () => {
			try {
				setLoading(true);
				setError(null);
				
				// Check if user is authenticated
				const token = getToken();
				if (!token) {
					setLoading(false);
					return;
				}
				
				const res = await getUserAccountInfo();
				if (res.error) {
					setError("Failed to load account info");
					setAccountInfo(null);
				} else {
					setAccountInfo(res.data);
				}
			} catch (err: any) {
				console.error("Failed to fetch account info:", err);
				setError(err.message || "Failed to load account info");
			} finally {
				setLoading(false);
			}
		};

		fetchAccountInfo();
	}, []);

	return { accountInfo, loading, error };
};
