import React from 'react';
import { useRouter } from 'next/router'; 
import Link from 'next/link';

const NotFound = () => {
  const router = useRouter(); 
  
  React.useEffect(() => {
    console.error(`Page not found: ${router.asPath}`); 
  }, [router]);

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center m-0 pt-10">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg mt-4">Oops! The page you are looking for do not exist.</p>
      <Link href="/" className="mt-8 px-6 py-2 bg-red-500 rounded-md text-white hover:bg-red-600">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
