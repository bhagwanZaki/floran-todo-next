import Link from "next/link";
import "../css/globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Todo",
  description: "Manage your todo task seamlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Link href={"/"} className="logo">
          To Do
          </Link>
        {children}
      </body>
    </html>
  );
}
