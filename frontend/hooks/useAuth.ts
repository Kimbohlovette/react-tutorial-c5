import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerRequest, loginRequest } from "@/api/auth";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signup = async (formData: any) => {
    setIsLoading(true);
    try {
      const res = await registerRequest(formData);
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("piggy_user_id", data.user_id);
        router.push("/dashboard");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      alert("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};
