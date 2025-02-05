import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ConjureProvider } from "conjure-ui";



export const metadata: Metadata = {
    title: "ConjureUI",
    description: "",
    icons: [],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>)
{
    return (
        <html lang="en">
        <body className={`min-h-[calc(100vh-1px)] antialiased`}>

        <Header/>

        <ConjureProvider>
            {children}
        </ConjureProvider>

        </body>
        </html>
    );
}
