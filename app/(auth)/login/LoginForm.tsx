"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/Loader";
import { actionLoginUser } from "@/lib/server-actions/auth-actions";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      toast({
        variant: "destructive",
        title: "Oops Somthing Happend!",
        description: error.message,
      });
    }
    router.replace("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-10 py-5 w-fit rounded-lg shadow-xl space-y-3 bg-gray-50 max-md:w-11/12 max-md:px-5"
      >
        {/* <!-- Logo --> */}
        <div className="flex justify-center items-center">
          <img
            src="https://img.icons8.com/?size=100&id=rAyFE7C2Av8s&format=png&color=22C3E6"
            alt=""
            className="w-16 h-auto"
          />
          <span className="font-bold text-3xl">Biz List</span>
        </div>
        {/* <!-- Header --> */}
        <div className="my-8">
          <h2 className="font-semibold text-2xl">Sign In</h2>
          <p>Welcome!</p>
        </div>
        <FormDescription className="text-slate-400">
          Business Listing and Productivity Platform
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  className="block w-96 max-md:w-full rounded-md border-2 border-gray-300 px-4 py-2 bg-gray-50 hover:outline-none focus:outline-none focus:border-primary placeholder:text-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="block w-96 max-md:w-full rounded-md border-2 border-gray-300 px-4 py-2 bg-gray-50 hover:outline-none focus:outline-none focus:border-primary placeholder:text-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full p-6 text-slate-50"
          size="lg"
          disabled={isLoading}
        >
          {!isLoading ? "Login" : <Loader />}
        </Button>
        <span>
          Dont have an account?{" "}
          <Link href="/signup" className="text-primary">
            Sign Up
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default LoginForm;
