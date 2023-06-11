import "../css/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Todo",
  description: "Manage your todo task seamlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <h1 className="logo">To Do</h1>
        {children}
      </body>
    </html>
  );
}
