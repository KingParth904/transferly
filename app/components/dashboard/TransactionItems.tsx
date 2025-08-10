// In: /components/dashboard/TransactionItem.tsx

import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

// Define the shape of a single transaction object
export interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  status: string;
  timestamp: string;
  peer: {
    username: string;
  };
}

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isSent = transaction.type === 'sent';
  const amountColor = isSent ? 'text-red-400' : 'text-green-400';
  const amountSign = isSent ? '-' : '+';
  const Icon = isSent ? ArrowUpRight : ArrowDownLeft;
  const description = isSent ? `Sent to ${transaction.peer.username}` : `Received from ${transaction.peer.username}`;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center gap-4">
        <div className={`flex items-center justify-center h-10 w-10 rounded-full ${isSent ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
          <Icon className={amountColor} size={20} />
        </div>
        <div>
          <p className="font-semibold text-white">{description}</p>
          <p className="text-sm text-gray-400">
            {new Date(transaction.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className={`font-bold text-lg ${amountColor}`}>
        {amountSign}${transaction.amount.toFixed(2)}
      </p>
    </div>
  );
}
