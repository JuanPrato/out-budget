import SessionProvider from "@/firebase/Context";
import { twMerge } from 'tailwind-merge';
import './globals.css'
import { Comfortaa } from 'next/font/google'

const comfortaa = Comfortaa({ subsets: ['latin'], preload: true });

export const metadata = {
  title: 'Nuestro presupuesto',
  description: 'Simple app to track budgets with your partner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={twMerge(comfortaa.className, "h-screen w-screen overflow-hidden flex flex-col")}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
