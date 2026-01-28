import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Stronskiy Jewelry | Ювелирные изделия 925 пробы",

  description:
    "Эксклюзивные украшения Stronskiy Jewelry. Авторский дизайн, безупречное качество серебра 925 пробы и быстрая доставка. Найдите свое идеальное украшение в коллекции 2026 года.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${nunito.className} antialiased bg-white flex flex-col min-h-screen`}>
        <Header />
        <main className="grow">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
