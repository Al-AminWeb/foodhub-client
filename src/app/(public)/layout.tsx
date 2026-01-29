import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50/50 to-white">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}