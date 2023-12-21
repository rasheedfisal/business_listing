"use server";
import { z } from "zod";
import db from "../supabase/db";
import { CreateBusinessSchema } from "../types";
import { businesses } from "@/migrations/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createBusiness = async (
  biz: z.infer<typeof CreateBusinessSchema>,
  authUserID: string
) => {
  try {
    await db.insert(businesses).values({
      title: biz.title,
      createdBy: authUserID,
    });
    revalidatePath("/dashboard");
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error: Failed to Save Business" };
  }
};
export const updateBusiness = async (
  business: Partial<z.infer<typeof CreateBusinessSchema>>,
  businessID: string
) => {
  try {
    await db
      .update(businesses)
      .set(business)
      .where(eq(businesses.id, businessID));
    revalidatePath("/dashboard");
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error: Failed to Update Business" };
  }
};

export const deleteBusiness = async (businessID: string) => {
  if (!businessID) return { data: null, error: "Error: ID is Empty" };
  try {
    await db.delete(businesses).where(eq(businesses.id, businessID));
    revalidatePath("/dashboard");
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error: Failed to Delete Business" };
  }
};
