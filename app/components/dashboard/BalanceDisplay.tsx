"use client"
import axios from "axios";
import { useEffect, useState } from "react";

interface Userdata{
    balance : number;
}
export default function BalanceDisplay(){
    const [data , setdata] = useState<Userdata | null>(null);
    const [isloading , setIsloading] = useState(true);
    const [error , setError] = useState<string | null >(null);

    useEffect(()=>{
        const fetchBalance = async ()=>{
            try{
                setIsloading(true);
                const response = await axios.get<Userdata>("/api/user/me");
                setdata(response.data);
            }catch(err){
                setError("Could not fetch balance");
                console.error("Failed to fetch balance" , err);
            }finally{
                setIsloading(false);
            }
        };
        fetchBalance();
    },[]);

    const renderContent = ()=>{
        if (isloading) {
      return (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-gray-700 rounded w-1/2"></div>
        </div>
      );
    }
    if(error){
        return <p className="text-red-400">{error}</p>
    }
    if(data){
        return (
            <>
            <p className="text-em text-gray-400">Current Balance</p>
            <p className="text-4xl font-bold text-white">${data.balance.toFixed(2)}</p>
            </>
        );
    }
    return null ;
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            {renderContent()}
        </div>
    )
}