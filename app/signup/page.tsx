
import Link from "next/link";
import SignUpForm from "../components/auth/SignupForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <SignUpForm />
        <p className="mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-teal-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}