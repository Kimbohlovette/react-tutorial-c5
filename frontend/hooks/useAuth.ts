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
        const userId = data.user_id || data.id || data.ID;
         // Adjust based on your backend response
      if (userId) {
        localStorage.setItem("piggy_user_id", userId.toString());
        router.push("/");
      } else {
        alert(data.error || "User ID was not found in the response!");
      }
    } catch (err) {
      alert("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  // LOGIN
  const login = async (formData: any) => {
    setIsLoading(true);
    try {
      const res = await loginRequest(formData);
      const data = await res.json();

      const userId = data.user_id || data.id || data.ID;

      if (res.ok && userId) {
        
        localStorage.setItem("piggy_user_id", userId.toString());


        router.push("/"); 
      } else {
       
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, login, isLoading };
};

