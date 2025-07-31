"use client";

import { useState } from "react";
import { Button } from "@/app/components/Button"; // Make sure the path is correct
import { Input } from "./components/Input";
import { Lock } from "lucide-react";


export default function LoadingTest() {
  const [isLoading, setIsLoading] = useState(false);

  const handleFakeApiCall = () => {
    // 1. Set loading to true immediately when the function starts
    setIsLoading(true);
    console.log("Loading started...");

    // 2. Simulate a network request that takes 3 seconds
    setTimeout(() => {
      // 3. After 3 seconds, the "API call" is complete
      setIsLoading(false);
      console.log("Loading finished!");
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Button Loading Test</h1>
      
      <Button
        variant="primary"
        text="Click to Load"
        onClick={handleFakeApiCall}
        loading={isLoading} // Pass the loading state to the button
      />

      <p className="mt-4">
        Current loading state: {isLoading ? "Loading..." : "Idle"}
      </p>
      <Input label="Password" type="password" placeholder="Enter Your Password "
      startIcon={<Lock size={18}/>}/>
    </div>
  );
}