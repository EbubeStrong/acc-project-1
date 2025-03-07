import { Outlet } from "react-router-dom";
import Header from "./header";

function LayoutFormat() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LayoutFormat;
