import type { Metadata } from "next";
import "./globals.css";


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
        {children}
        </body>
        </html>
    );
}
