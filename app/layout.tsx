// In: /app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "../app/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transferly - Instant Payments",
  description: "Seamlessly send and receive money in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <AuthProvider>
          <div className="relative min-h-screen">
            <div className="absolute inset-0 -z-10 h-full w-full bg-gray-900 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
