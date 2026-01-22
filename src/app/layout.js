import { Nunito } from "next/font/google"; // Импортируем только Nunito
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Настраиваем Nunito
const nunito = Nunito({ 
  subsets: ["latin", "cyrillic"], 
  weight: ["400", "500", "600", "700", "800"], // Выбираем нужные начертания
  display: 'swap',
});

export const metadata = {
  title: "Магазин 2026 🇲🇩",
  description: "Будущее ритейла в Молдове",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      {/* Применяем шрифт ко всему телу документа через nunito.className */}
      <body
        className={`${nunito.className} antialiased bg-gray-50 flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
