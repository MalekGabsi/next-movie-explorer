// src/components/Layout.js
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext"; // Import the useUser hook
import NavMenu from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/utils/supabaseClient"; // Import supabase client

const Layout = ({ children }) => {
  const router = useRouter();
  const isAuthPage = router.pathname.includes("/auth");
  const isNotFoundPage = router.pathname === "/404";

  const { user, loading } = useUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const getInitials = (user) => {
    const name = user?.user_metadata?.full_name || user?.email || "";
    const [first = "", second = ""] = name.split(" ");
    return (first[0] || "").toUpperCase() + (second[0] || "").toUpperCase();
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-b-4 border-gray-300"></div>
          </div>
          ;
  }

  return (
    <div>
      {!isAuthPage && !isNotFoundPage  && (
        <NavMenu user={user} handleSignOut={handleSignOut} getInitials={getInitials} />
      )}

      <main>{children}</main>

      <ToastContainer position="top-right" autoClose={3000} style={{ marginTop: "80px" }} />
    </div>
  );
};

export default Layout;
