import { Radio_Canada } from "next/font/google";
import { Metadata } from "next";

import Footer from "src/components/layout/Footer";
import Header from "src/components/layout/Header";
import { ScrollToTopBtn } from "src/components/elements/ScrollToTopBtn";

import "normalize.css";
import "nprogress/nprogress.css";
import "swiper/css";
import "swiper/css/navigation";
import "src/styles/globals.scss";

const radioCanada = Radio_Canada({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-radio-canada",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blurred = true;
  return (
    <html lang="en" className={radioCanada.variable}>
      <body>
        <div
          className={`wrapper relative min-h-screen w-full bg-grey ${
            blurred ? "blurredBg" : ""
          }`}
        >
          <Header />
          <main
            className={`page-content relative bg-grey bg-opacity-95 ${
              blurred ? "backdrop-blur-lg backdrop-filter" : ""
            }`}
          >
            <div className="bglines fixed left-0 top-0 z-20 flex h-screen w-full justify-around">
              <span className="border-r border-white border-opacity-5"></span>
              <span className="border-r border-white border-opacity-5"></span>
              <span className="border-r border-white border-opacity-5"></span>
              <span className="border-r border-white border-opacity-5"></span>
              <span className="border-r border-white border-opacity-5"></span>
            </div>
            <div className="sitedata relative z-30 min-h-screen">
              {children}
            </div>
          </main>
          <Footer />
          <ScrollToTopBtn />
        </div>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Mat Wilk - Software Engineer",
  description: "description",
  keywords:
    "Software Engineer, React, Next.js, TypeScript, Node.js, JavaScript",
};
