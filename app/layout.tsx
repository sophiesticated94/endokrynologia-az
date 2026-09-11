import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
export const metadata: Metadata = {title:"Endokrynologia A–Z | Nauka tarczycy",description:"Polskojęzyczny kurs tarczycy: lekcje, przypadki kliniczne, fiszki i egzaminy dla studentów i lekarzy.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pl"><body>{children}</body></html>}
