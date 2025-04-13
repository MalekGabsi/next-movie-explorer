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

  const { user, loading } = useUser(); // Access user and loading state from the context

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!isAuthPage && !isNotFoundPage && user && (
        <NavMenu user={user} handleSignOut={handleSignOut} getInitials={getInitials} />
      )}

      <main>{children}</main>

      <ToastContainer position="top-right" autoClose={3000} style={{ marginTop: "80px" }} />
    </div>
  );
};

export default Layout;
