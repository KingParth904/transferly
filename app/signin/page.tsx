
import Link from "next/link";
import SigninForm from "../components/auth/SigninForm";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <SigninForm />
        
        <p className="mt-4 text-sm text-gray-400">
          Dont have an account?{" "}
          <Link href="/signup" className="font-medium text-teal-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
