"use client"
import { useState } from "react"
import { Input } from "../Input";
import { Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

export default function SigninForm(){
    const [email , setEmail] = useState("");
    const [password , setpassword] = useState("");
    const [error , setError] = useState("");
    const [isloading , setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try{
            const result = await signIn("credentials",{
                redirect:false,
                email,password
            });
            if(result?.error){
                setError("Invalid Email or Password")
            }else if(result?.ok){
                router.push("/dashboard");
            }
        }
        catch(_e){
            setError("An Unexpected Error occured . Please try again")
        } finally{
            setIsLoading(false);
        }
    }
    
    return <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/50 rounded-xl border border-gray-700 animate-fade-in-up">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-white ">Welcome Back</h1>
            <p className="text-gray-400">Sign in To Continue to Transferly</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
            id = "email"
            label = "Email"
            type="email"
            value = {email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            placeholder="example@gmail.com"
            required
            autoComplete="email"
            startIcon={<Mail size={18} className="text-gray-400"/>}/>
            <Input
            id = "password"
            label = "Password"
            type="password"
            value = {password}
            onChange={(e)=>{
                setpassword(e.target.value)
            }}
            placeholder="*********"
            required
            autoComplete="current-password"
            startIcon={<Lock size={18} className="text-gray-400"/>}/>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button
            variant="primary"
            text = "Sign In"
            type="submit"
            loading = {isloading}
            disabled = {isloading}
            className = "w-full"/>

        </form>
    </div>
}