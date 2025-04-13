import { useState } from "react";
import { useRouter } from "next/router";
import { Film } from "lucide-react";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-toastify";
import Link from "next/link";
import { login } from "@/redux/features/authSlice"; 
import { useDispatch } from "react-redux";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");  
  const [username, setUsername] = useState("");  
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch(); 
  
    const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let user;
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              username: username,
            },
          },
        });
        if (error) throw error;
        user = data.user; 
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        user = data.user; 
      }

      // Dispatch user to global state (e.g., Redux store)
      dispatch(login(user)); 

      // Show success message and redirect
      toast.success("Account Logged In with Success!");
      router.push("/"); // Redirect to homepage or authenticated area

    } catch (error) {
      // Handle any errors that occur during the authentication process
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading spinner after process
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Use Supabase OAuth for Google login
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_APP_URL // Make sure this is correct in Vercel and locally
        }
      });

      if (error) {
        // Handle any errors that occur with Google login
        toast.error("Google Login Error: " + error.message);
      }

    } catch (error) {
      // Handle any other errors that might occur during Google login
      toast.error("Google Login Failed: " + error.message);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-6">
        <Film className="h-6 w-6 text-red-500" />
        <Link href="/">
        <span className="text-2xl text-white font-bold">
          <span className="text-red-500">Cinema</span>Lounge
        </span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center mb-2 font-bold font-display">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-muted-foreground opacity-70 text-center mb-7">
          {isSignUp ? "Sign up to get started" : "Sign in or create an account to continue"}
        </p>

        <form onSubmit={handleAuth} className="space-y-4" id="auth-form">
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <button
            type="submit"
            className="cursor-pointer w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="cursor-pointer mt-4 w-full p-2 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img
            src="/google.png"
            alt="Google"
            className="w-5 h-5"
          />
          <span>{isSignUp ? "Sign Up" : "Sign In"} with Google</span>
        </button>

        <div className="mt-6 text-center text-sm">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="cursor-pointer text-red-600 font-medium hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className=" cursor-pointer text-red-600 font-medium hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
