import { Outlet } from "react-router-dom";
import Header from "./header";

function LayoutFormat() {
  return (
    <>
      <header className="sticky top-0 z-10">
        <Header />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LayoutFormat;
