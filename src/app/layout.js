import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Магазин 2026 🇲🇩",
  description: "Будущее ритейла в Молдове",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${nunito.className} antialiased bg-white flex flex-col min-h-screen`}>
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
