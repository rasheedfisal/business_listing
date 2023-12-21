"use server";

import { z } from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { LoginSchema } from "../types";
import { cookies } from "next/headers";
import { env } from "../env.server";

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof LoginSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

export async function actionLogoutUser() {
  const supabase = createRouteHandlerClient({ cookies });
  await supabase.auth.signOut();
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof LoginSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (data?.length) return { error: { message: "User already exists", data } };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });
  return response;
}
