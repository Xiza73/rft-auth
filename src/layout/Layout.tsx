import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

type LayoutProps = {
  children: JSX.Element;
};

export function Layout({ children }: LayoutProps) {
  return (
    <section className="bg-slate-300 h-screen text-black flex flex-col">
      <NavBar />
      {children}
      <Footer />
    </section>
  );
}
