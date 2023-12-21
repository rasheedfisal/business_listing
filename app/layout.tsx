import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SupabaseUserProvider } from "@/lib/providers/supabase-user-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Biz",
    template: `%s | Biz`,
  },
  description: "a dashboard for a business listing management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseUserProvider>
          {children}
          <Toaster />
        </SupabaseUserProvider>
      </body>
    </html>
  );
}
