import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Creative Production Platform", description: "Managed creative production operations" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }