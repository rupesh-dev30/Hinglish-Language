import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-blue-50">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
