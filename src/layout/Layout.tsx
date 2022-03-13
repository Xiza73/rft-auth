import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { DarkModeBtn } from "../components/DarkModeBtn";

type LayoutProps = {
  children: JSX.Element;
};

export function Layout({ children }: LayoutProps) {
  return (
    <section className="bg-light dark:bg-dark h-screen text-black flex flex-col">
      <NavBar />
      {children}
      <DarkModeBtn />
      <Footer />
    </section>
  );
}
