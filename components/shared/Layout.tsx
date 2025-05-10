// components/shared/Layout.tsx
import Navbar from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";

interface LayoutProps {
  children: React.ReactNode;
  footerClassName?: string;
}

export default function Layout({
  children,
  footerClassName = "",
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer className={footerClassName} />
    </div>
  );
}
