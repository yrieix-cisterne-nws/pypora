import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata = {
  title: "Pypora",
  icons: {
    icon: "/logo_projet.jpg",
  }
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
