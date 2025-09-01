// app/layout.js
import "../styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // 필요하면 굵기 선택
  display: "swap",              // 폰트 로딩 최적화
});

export const metadata = {
  title: "MyFans",
  description: "OnlyFans 느낌의 구독형 MyFans 데모 (순수 CSS)",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
