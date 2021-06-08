import Header from "./header";
import Sidebar from "./sidebar";

export default function Main({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) {
  return (
    <main>
      <Sidebar />
      <section className="renderer">
        <Header />
        {children}
      </section>
    </main>
  );
}
