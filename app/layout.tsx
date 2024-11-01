export const dynamic = 'force-dynamic'


import { Nunito } from "next/font/google"
import Navbar from "./components/navbar/Navbar";

import { Metadata } from "next";
import "./globals.css";

import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";

import { ToasterProvider } from "./providers/ToasterProvider";

import getCurrentUser from "./actions/getCurrentUser";

import ClientOnly from "./components/ClientOnly";
import Script from "next/script";
import SearchModal from "./components/modals/SearchModal";
export const metadata: Metadata = {
  title: "EVENTOS", // TODO: Change to the actual name of the app
  description: "Generated by create next app",
};

const font = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
        <ToasterProvider />
        <RegisterModal />
        <RentModal />
        <LoginModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div> 
        <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
