import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ModalProvider } from "@/components/ConfirmModal";


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

        <ModalProvider>
            <div id="modal-root"></div>
            {children}
        </ModalProvider>

        </body>
        </html>
    );
}
