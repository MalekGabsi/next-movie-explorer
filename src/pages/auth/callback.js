// pages/auth/callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
      } else if (data?.session) {
        console.log("Session retrieved:", data.session);
      }

      router.replace("/");
    };

    handleOAuthRedirect();
  }, []);

  return (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-b-4 border-gray-300"></div>
  </div>
);

}
