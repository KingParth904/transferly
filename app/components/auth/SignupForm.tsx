
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios"; 
import { Mail, Lock, User } from "lucide-react";
import { Input } from "../Input";
import { Button } from "../Button";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await axios.post('/api/register/signup', {
        username,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Failed to sign in after registration.");
      } else if (result?.ok) {
        router.push('/dashboard');
      }

    } catch (err) { 
   
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/50 rounded-xl border border-gray-700 animate-fade-in-up">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Create an Account</h1>
        <p className="text-gray-400">Join Transferly today</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="yourusername"
          required
          autoComplete="username"
          startIcon={<User size={18} className="text-gray-400" />}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          required
          autoComplete="email"
          startIcon={<Mail size={18} className="text-gray-400" />}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="new-password"
          startIcon={<Lock size={18} className="text-gray-400" />}
        />
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <Button
          variant="primary"
          text="Create Account"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          className="w-full"
        />
      </form>
    </div>
  );
}
