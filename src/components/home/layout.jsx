import { Outlet } from "react-router-dom";
import Header from "./header";

// import { useEffect   } from "react";

function LayoutFormat() {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     once: true,
  //     offset: 100,
  //   });
  // }, []);
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
