import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Film, Menu, X } from "lucide-react";

export default function Navbar({ user, handleSignOut, getInitials }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLink = (href, label) => (
    <Link
      href={href}
      className={`font-medium transition-colors duration-200 ${
        router.pathname === href
          ? "text-red-500"
          : "text-gray-300 hover:text-white"
      }`}
      onClick={() => setMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-opacity-30 bg-black shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Film className="h-6 w-6 text-red-500" />
          <span className="text-2xl text-white font-bold">
            <span className="text-red-500">Cinema</span>Lounge
          </span>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-200 hover:text-white focus:outline-none transition duration-200"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLink("/", "Home")}
          {navLink("/search", "Search")}
          {navLink("/favorites", "Favorites")}
        </nav>

        {/* Desktop User Section */}
        <div className="hidden md:block">
          {user ? (
            <div className="relative">
              <Image
                src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-gray-300 hover:border-white transition duration-200"
              />
              <div className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">
                {getInitials()}
              </div>
            </div>
          ) : (
            <button
              className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded"
              onClick={() => router.push("/auth")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black bg-opacity-80 px-6 pb-4 pt-2 flex flex-col gap-4">
          {navLink("/", "Home")}
          {navLink("/search", "Search")}
          {navLink("/favorites", "Favorites")}

          {user ? (
            <div className="flex items-center gap-3 mt-4">
              <Image
                src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full border border-gray-400"
              />
              <span className="text-white text-sm font-semibold">{getInitials()}</span>
            </div>
          ) : (
            <button
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-2 transition"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/auth");
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
