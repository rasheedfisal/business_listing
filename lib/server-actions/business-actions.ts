"use server";
import { z } from "zod";
import db from "../supabase/db";
import { CreateBusinessSchema } from "../types";
import { businesses, users } from "@/migrations/schema";
import { eq, like } from "drizzle-orm";
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

export type Result = {
  id: string;
  title: string;
  createdAt: string;
  userEmail: string | null;
};
export const findBusiness = async (business?: string) => {
  try {
    let result: Result[] = [];
    if (!business) {
      result = await db
        .select({
          id: businesses.id,
          title: businesses.title,
          createdAt: businesses.createdAt,
          userEmail: users.email,
        })
        .from(businesses)
        .innerJoin(users, eq(users.id, businesses.createdBy));
    } else {
      result = await db
        .select({
          id: businesses.id,
          title: businesses.title,
          createdAt: businesses.createdAt,
          userEmail: users.email,
        })
        .from(businesses)
        .where(like(businesses.title, `%${business}%`))
        .innerJoin(users, eq(users.id, businesses.createdBy));
    }

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
