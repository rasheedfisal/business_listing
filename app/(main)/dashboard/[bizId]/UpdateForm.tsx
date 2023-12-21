"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateBusinessSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/Loader";
import { updateBusiness } from "@/lib/server-actions/business-actions";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  id: string;
  title: string;
};

const UpdateForm = ({ id, title }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<Partial<z.infer<typeof CreateBusinessSchema>>>({
    mode: "onChange",
    resolver: zodResolver(CreateBusinessSchema),
    defaultValues: { title },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<
    Partial<z.infer<typeof CreateBusinessSchema>>
  > = async (formData) => {
    const { error } = await updateBusiness(formData, id);
    if (error) {
      form.reset();
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
    router.push("/dashboard");
  };

  const cancelFn = () => {
    router.replace("/dashboard");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="title"
                  placeholder="Title"
                  className="block w-96 max-md:w-full rounded-md border-2 border-gray-300 px-4 py-2 bg-gray-50 hover:outline-none focus:outline-none focus:border-primary placeholder:text-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-6 flex gap-2 max-md:mb-4">
          <Button
            className="rounded-md bg-gray-50 border-2 border-primary text-primary px-4 py-2 transition ease-in-out focus:scale-95 hover:-translate-y-1"
            type="reset"
            onClick={cancelFn}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-primary text-gray-50 px-4 py-2 transition ease-in-out focus:scale-95 hover:-translate-y-1"
          >
            {!isLoading ? "Update" : <Loader />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateForm;
