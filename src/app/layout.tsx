import './globals.css'
import { ThemeProvider } from "./ThemeContext";
import Body from "./Body";

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
    <html lang="en" className="">
      <ThemeProvider>
        <Body>{children}</Body>
      </ThemeProvider>
    </html>
  )
}
