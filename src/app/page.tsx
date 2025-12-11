'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import Image from "next/image";
import exciteLoginLogo from "@/public/assets/svgFiles/loginLogo.svg"

export default function Home() {
  const router = useRouter();
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <form className='w-88 space-y-5'>
        <fieldset className='w-full'>
          <Image src={exciteLoginLogo} alt='loginLogo' className='mx-auto' />
        </fieldset>
        <fieldset className='text-center space-y-1'>
          <h1 className='text-2xl font-semibold'>Log In into your account</h1>
          <p className='text-sm'>Welcome back! Please enter your details.</p>
        </fieldset>
        <fieldset>
          <Label>Work Email:</Label>
          <Input type='email' />
        </fieldset>
        <fieldset>
          <Label>Password:</Label>
          <Input type='password' />
        </fieldset>
        <fieldset className='flex justify-between'>
          <span className='text-xs font-semibold'>Remember for 30 days</span>
          <span className='text-xs font-semibold text-[#A7CC48]'>
            Forget Password
          </span>
        </fieldset>
        <fieldset className='w-full'>
          <Button type="button" className='w-full bg-[#A7CC48] hover:bg-[#A7CC48]/80 cursor-pointer' onClick={()=> router.push('/dashboard')}>
            Sign In
          </Button>
        </fieldset>
      </form>
    </div>
  );
}

