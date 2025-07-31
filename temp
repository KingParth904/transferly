
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
      {/* Hero Section */}
      <section className="animate-fade-in-up">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
          The Future of Payments is{" "}
          <span className="bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
            Instant.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
          Join Transferly for seamless, secure, and real-time transactions.
          Send and receive money with the speed of a thought.
        </p>
        <div className="mt-10 flex justify-center items-center gap-4">
          <Link 
            href="/signup" 
            className="group inline-flex items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-24 sm:mt-32 animate-fade-in-up animation-delay-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700">
            <Zap className="h-10 w-10 mx-auto text-teal-400" />
            <h3 className="mt-4 text-xl font-semibold">Lightning Fast</h3>
            <p className="mt-2 text-gray-400">
              Transactions are processed in real-time. No more waiting.
            </p>
          </div>
          <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700">
            <ShieldCheck className="h-10 w-10 mx-auto text-teal-400" />
            <h3 className="mt-4 text-xl font-semibold">Bank-Grade Security</h3>
            <p className="mt-2 text-gray-400">
              Your data and funds are protected with end-to-end encryption.
            </p>
          </div>
          <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700">
            <Smartphone className="h-10 w-10 mx-auto text-teal-400" />
            <h3 className="mt-4 text-xl font-semibold">Mobile Friendly</h3>
            <p className="mt-2 text-gray-400">
              A beautiful experience on any device, anywhere you go.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
