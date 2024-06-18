import "~/styles/globals.css";
import { Navbar, Footer } from "~/common";


export const metadata = {
  title: "Piquette Home",
  description: "The Piquette App provides all of the low-code tools needed to quickly develop production-quality applications making it the ideal solution for start-ups, dev shops, and creative firms without in-house development teams.", 

};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;

}) {
  return (
    <>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
