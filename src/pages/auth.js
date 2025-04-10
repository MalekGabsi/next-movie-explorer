import { useState, useEffect } from "react";
import { useRouter } from "next/router";  // Import useRouter for navigation


const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();  // Use Next.js router for navigation

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Please check your email for verification link",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      router.push("/");  // Redirect to home after successful sign-in
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cinema-dark p-4">
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-2xl font-bold">
          <span className="text-cinema-red">Cinema</span>Lounge
        </h1>
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center mb-4">Welcome</h2>
        <p className="text-center mb-6">Sign in or create an account to continue</p>

        <div className="tabs mb-6">
          <div className="flex justify-center gap-4">
            <button
              className="tab-button"
              onClick={() => router.push("/auth#signin")}
            >
              Sign In
            </button>
            <button
              className="tab-button"
              onClick={() => router.push("/auth#signup")}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-4" id="signin">
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-cinema-red text-white rounded-md hover:bg-cinema-red/90"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp} className="space-y-4 mt-6" id="signup">
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-cinema-red text-white rounded-md hover:bg-cinema-red/90"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
