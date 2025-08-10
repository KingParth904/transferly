
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import BalanceDisplay from "../components/dashboard/BalanceDisplay";
import TransactionHistory from "../components/dashboard/TransactionHistory";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);


  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Welcome back, <span className="text-teal-400">{session.user?.name}</span>
        </h1>
        <p className="text-gray-400 mt-2">Here is a summary of your account.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TransactionHistory/>
        </div>

        <div className="lg:col-span-1">
          <BalanceDisplay />
        </div>
      </div>
    </div>
  );
}
