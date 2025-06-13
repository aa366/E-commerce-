
import "./globals.css";
import NavBar from "@/components/nabar/navBar"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <NavBar />
        {children}
      </body>
    </html>
  );
}
