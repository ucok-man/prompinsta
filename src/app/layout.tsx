import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "Prompinsta",
  description: "Discover & Share AI Prompts",
  icons: {
    icon: {
      url: "/assets/icons/logo.ico",
      type: "image/ico",
    },
  },
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </body>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;
