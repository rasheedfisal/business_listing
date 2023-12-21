import { z } from "zod";

export const env = z
  .object({
    NODE_ENV: z.string().optional(),

    NEXT_PUBLIC_SITE_URL: z.string().min(1),

    DATABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  })
  .parse(process.env);
