"use client"

import axios from "axios";
import { signIn, useSession } from 'next-auth/react'
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";


import { Input } from "@/components/ui/input";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Link from "next/link";



const FormSchema = z
  .object({
    name: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must have at least 6 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const SignUpForm = () => {
      
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });

    const onSubmit = async (values: z.infer<typeof FormSchema> ) => {
        
        // Register User

        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json' 
          },
        
          body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password
        })
      })
        if(response.ok) {
          router.push('/sign-in')
        } else {
          console.error( 'Registration failed')
        }
    }

    return (
        < >
    
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        
      <div 
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <div className="text-blue-800 font-bold mb-2 text-2xl">
            <h2>Signin</h2>
        </div>
        <div className="text-gray-400  mb-2 ">
            <h3>Signin to access client files</h3>
        </div>
    <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>

             
             <div className="pb-3 ">    
              <FormField
            
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800 font-semibold" >Name</FormLabel>
                  <FormControl>
                    <Input  disabled={isLoading}  placeholder="Testing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            
            <div className="pb-3">                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-800 font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading}  placeholder="testing@bt.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

            </div>
            <div className="pb-3"> 
                <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800 font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type='password'  placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            
            <div className="pb-3"> 
                <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800 font-semibold">Confirm Password</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type='password'   placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  
            <Button disabled={isLoading}  className="w-full bg-blue-800 hover:bg-blue-500" type="submit">
             Register
            </Button>
          
                </div>
              </form>
            </Form>

            <div className="mt-6">
            <div 
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <p className='text-center text-sm text-gray-600 mt-2'>
        If you already have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-in'>
          Sign in
        </Link>
      </p>
            </div>
          </div>
        </div>
        </div>
        
   </>
    )
   

}