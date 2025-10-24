import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Idea Holiday - Your Travel Partner",
  description: "Book flights and hotels at the best prices. B2B and B2C travel booking platform.",
  keywords: ["travel", "flights", "hotels", "booking", "B2B", "B2C", "idea holiday"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
