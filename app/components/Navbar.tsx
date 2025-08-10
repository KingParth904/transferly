
"use client"; 

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-teal-400">
          Transferly
        </Link>
        <div className="flex items-center space-x-4">
          {status === "loading" ? (

            <div className="h-5 w-5">
              <svg className="animate-spin h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : session ? (
         
            <>
              <span className="hidden sm:block">Hello, {session.user?.name}</span>
              <Link href="/dashboard" className="hover:text-teal-300 transition-colors">
                Dashboard
              </Link>
              <Link href="/transfer" className="hover:text-teal-300 transition-colors">
                Transfer
              </Link>
         
              <Button
                variant="secondary"
                text="Sign Out"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-3 py-2" 
              />
            </>
          ) : (
           
            <>
              <Link href="/signin" className="hover:text-teal-300 transition-colors">
                Sign In
              </Link>
        
              <Button
                variant="primary"
                text="Sign Up"
                onClick={() => router.push('/signup')}
                className="px-3 py-2"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
