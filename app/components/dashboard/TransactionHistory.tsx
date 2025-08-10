// In: /components/dashboard/TransactionHistory.tsx

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import TransactionItem, { Transaction } from "./TransactionItems";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Transaction[]>("/api/transactions/history");
        setTransactions(response.data);
      } catch (err) {
        setError("Could not fetch transaction history.");
        console.error("Failed to fetch history:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      // Skeleton loader for the list
      return (
        <div className="space-y-4">
          <div className="h-16 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="h-16 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="h-16 bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      );
    }

    if (error) {
      return <p className="text-red-400 text-center">{error}</p>;
    }

    if (transactions.length === 0) {
      return <p className="text-gray-400 text-center">No transactions yet.</p>;
    }

    return (
      <div className="space-y-4">
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} transaction={tx} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
      {renderContent()}
    </div>
  );
}
