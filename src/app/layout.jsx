import { Inter, Noto_Kufi_Arabic } from "next/font/google";

import "./style/index.scss";

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Kufi_Arabic({ subsets: ["arabic"] });

export const metadata = {
  title: "Hafiz",
  description: "My hafiz app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={[inter.className, noto.className]}>{children}</body>
    </html>
  );
}
