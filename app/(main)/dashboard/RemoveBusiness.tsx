"use client";
import Loader from "@/components/global/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { deleteBusiness } from "@/lib/server-actions/business-actions";
import { GetRandomNumber } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, z } from "zod";

const randomNumber = GetRandomNumber();

const deleteBusinessSchema = object({
  name: string().min(1, "Value is Required"),
}).refine((data) => data.name === randomNumber.toString(), {
  message: "Value is Not Correct",
  path: ["name"],
});

type Props = {
  id: string;
};

const RemoveBusiness = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof deleteBusinessSchema>>({
    mode: "onChange",
    resolver: zodResolver(deleteBusinessSchema),
    defaultValues: { name: "" },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<
    z.infer<typeof deleteBusinessSchema>
  > = async () => {
    const { error } = await deleteBusiness(id);
    form.reset();
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    } else {
      setOpen(false);
    }
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <button className="py-2 px-4 text-right hover:rounded-md hover:shadow-inner hover:bg-indigo-100">
          Delete from Business List
        </button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <p>
              are you sure you want to delete this? any data relative to this
              will by <strong> deleted</strong>!<strong> for ever</strong>
            </p>
            <label className="mb-2 block">
              please write this number {randomNumber} to confirm
            </label>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder={randomNumber.toString()}
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
                onClick={() => {
                  form.reset();
                  setOpen((prev) => !prev);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="rounded-md bg-danger text-gray-50 px-4 py-2 transition ease-in-out focus:scale-95 hover:-translate-y-1"
              >
                {!isLoading ? "Confirm to Delete this Record" : <Loader />}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveBusiness;
