
"use client";

import { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";

import { Search, User, DollarSign } from "lucide-react";
import { Input } from "../Input";
import { Button } from "../Button";

interface SearchUser {
  id: string;
  username: string;
}

export default function TransferCard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<SearchUser | null>(null);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Effect to search for users as the user types (with debouncing)
  useEffect(() => {
    // Reset state if search query is cleared
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`/api/user/search?query=${searchQuery}`);
          setSearchResults(response.data);
        } catch (err) {
          console.error("Failed to search users:", err);
        }
      };
      fetchUsers();
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(debounceTimer); // Cleanup timer
  }, [searchQuery]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !amount) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("/api/transactions/transfer", {
        toUserId: selectedUser.id,
        amount: parseFloat(amount),
      });
      setSuccess(`Successfully sent $${amount} to ${selectedUser.username}!`);
      // Reset form
      setSelectedUser(null);
      setSearchQuery("");
      setAmount("");
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Transfer failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedUser) {
    // View for when a user has been selected
    return (
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-4">
          <User className="text-teal-400" />
          <p className="text-lg font-medium text-white">
            Sending to: <span className="font-bold">{selectedUser.username}</span>
          </p>
        </div>
        <form onSubmit={handleTransfer} className="space-y-4">
          <Input
            id="amount"
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
            startIcon={<DollarSign size={18} className="text-gray-400" />}
          />
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              text="Cancel"
              onClick={() => setSelectedUser(null)}
              className="w-full"
            />
            <Button
              variant="primary"
              text="Send"
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="w-full"
            />
          </div>
        </form>
      </div>
    );
  }

  // Default view for searching for a user
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 animate-fade-in-up">
      <Input
        id="search"
        label="Find a user to send money to"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by username or email..."
        startIcon={<Search size={18} className="text-gray-400" />}
      />
      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="mt-4 space-y-2">
          {searchResults.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer"
            >
              <User className="text-gray-400" />
              <span className="text-white">{user.username}</span>
            </div>
          ))}
        </div>
      )}
      {/* Display success or error messages */}
      {success && <p className="mt-4 text-sm text-green-400 text-center">{success}</p>}
      {error && <p className="mt-4 text-sm text-red-400 text-center">{error}</p>}
    </div>
  );
}
