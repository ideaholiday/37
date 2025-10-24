import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Idea Holiday - B2B + B2C Travel Booking Platform",
  description: "Complete travel booking platform for flights and hotels with B2B and B2C support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
