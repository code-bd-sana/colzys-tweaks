import IntercomWidget from "@/components/IntercomWidget/IntercomWidget";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// app/layout.tsx

export const metadata = {
  title: "Colzys Tweaks",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Intercom should live at body level */}
        <IntercomWidget />

        <div className='max-w-7xl mx-auto'>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
