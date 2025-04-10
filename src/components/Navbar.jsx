import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Film, } from "lucide-react";

export default function Navbar({ user, handleSignOut, getInitials }) {
  const router = useRouter();

  return (
    <header className="backdrop-blur-sm sticky top-0 z-10" style={{ backgroundColor: 'rgb(1, 4, 14)' }}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Film className="h-6 w-6 text-red-500" />
          <span className="text-2xl text-white font-bold">
            <span className="text-red-500">Cinema</span>Lounge
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`font-medium ${router.pathname === '/' ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
          >
            Home
          </Link>
          <Link
            href="/search"
            className={`font-medium ${router.pathname === '/search' ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
          >
            Search
          </Link>
          <Link
            href="/favorites"
            className={`font-medium ${router.pathname === '/favorites' ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
          >
            Favorites
          </Link>
        </nav>

        {user ? (
          <div className="flex items-center">
            <div className="relative">
              <button className="h-10 w-10 rounded-full bg-gray-300">
                <Image
                  src={user.user_metadata?.avatar_url || '/default-avatar.png'}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </button>
              <div className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1">
                {getInitials()}
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-cinema-red text-white p-2 rounded"
            onClick={() => router.push('/auth')}
          >
            Sign In
          </button>
        )}
      </div>

      
    
    </header>
  );
}
