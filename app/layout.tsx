import type { Metadata } from "next";
import "./globals.css";
import "./hormone-atlas.css";
import "./workbench.css";
import "katex/dist/katex.min.css";
export const metadata: Metadata = {title:"Endokrynologia A–Z | Mechanizmy i praktyka",description:"Polskojęzyczny kurs endokrynologii i GAHT: lekcje, przypadki kliniczne, fiszki i egzaminy dla studentów i lekarzy.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pl"><body>{children}</body></html>}
