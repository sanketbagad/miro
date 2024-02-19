import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/providers/modal-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Convex By Sanket Bagad",
  description: "Convex is a realtime collaborative whiteboard for teams. With Convex, you can create, share and collaborate on boards with your team in real-time. Convex is designed By Sanket Bagad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
